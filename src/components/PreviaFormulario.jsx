import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet, Pressable} from 'react-native';
import {styles} from './styles/styles';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
import Logo from './Logo';
import VidaAssistance from './VidaAssistence';
import PushNotification from 'react-native-push-notification';
import NetInfo from "@react-native-community/netinfo";
import useFormSubmit from './hooks/useFormSubmit';


const PreviaFormulario = ({token, user, navigation}) => {
  const [titulo, setTitulo] = useState(null);
  const [errorVisible, setErrorVisible] = useState(false);
  const {manualSubmit} = useFormSubmit("", token, user, []);

  useEffect(() => {
    if (token) {
      if (user.tipo === 'M') {
        setTitulo('Formulario Médicos');
      } else if (user.tipo === 'R') {
        setTitulo('Formulario Administradores');
      } else if (user.tipo === 'P') {
        setTitulo('Formulario Paramédicos');
      } else if (user.tipo === 'A') {
        setTitulo('Formulario Ambulancia');
      }
    }
  });

  const onSubmit = async () => {
    try {
      const data = await AsyncStorage.getAllKeys();
      if (data.length >= 5) {
        setErrorVisible(!errorVisible)
      } else {
        navigation.navigate('formularioMedicos', {token: token, user: user});
      }
    } catch (e) {
      console.log(e);      
    }
  };
  
  const onSubmitPre = async () => {
    try {
      const data = await AsyncStorage.getAllKeys();
      if (data.length >= 5) {
        setErrorVisible(!errorVisible)
      } else {
        navigation.navigate('formularioPrehospitalario', {
          token: token,
          user: user,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onCancelMedico = async () => {
    try {
      const data = await AsyncStorage.getAllKeys();
      if (data.length >= 5) {
        setErrorVisible(!errorVisible)
      } else {
        navigation.navigate('CancelFormularioMedicos', {
          token: token,
          user: user,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onCancelPrehospitalario = async () => {
    try {
      const data = await AsyncStorage.getAllKeys();
      if (data.length >= 5) {
        setErrorVisible(!errorVisible)
      } else {
        navigation.navigate('CancelFormularioPrehospitalario', {
          token: token,
          user: user,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    } catch (e) {
      console.log(e);
    }

    axios({
      method: 'post',
      url: API_URL + 'auth/logout',
      headers: {
        Accept: 'application/json',
      },
    }).then(() => {
      navigation.navigate('login');
    });
  };

  useEffect(() => {

    const checkInternetAndResendData = () => {
      NetInfo.fetch().then(state => {
        if (state.isConnected && state.isInternetReachable) {
          // Intenta reenviar los datos guardados localmente aquí
          const retrieveData = async () => {
            try {
              const asyncFormArray = await AsyncStorage.getAllKeys();
              const keysToIgnore = ['token', 'user']

              if (asyncFormArray.length) {

                asyncFormArray.forEach(async (key, index) => {
                  
                  if ( !keysToIgnore.includes(key) ) {

                    let asyncForm = await AsyncStorage.getItem(key);
  
                    const data = JSON.parse(asyncForm);
                    let baseUrlAsync = API_URL + 'api/reportes/'
  
                    if (key.includes('paramedicos')) {
                      baseUrlAsync += 'paramedicos/'
                    } else {
                      baseUrlAsync += 'medicos/'
                    }
  
                    if (key.includes('canceled')) {
                      baseUrlAsync += 'canceled'
                    }
  
                    // Enviamos la petición
                    await axios({
                      method: 'post',
                      url: baseUrlAsync,
                      headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json',
                      },
                      data: data,
                    })
                      .then(response => {
                          // Enviamos notificación de éxito
                          PushNotification.localNotification({
                            channelId: "async-update",
                            title: "Reporte rezagado enviado con exito",
                            message: "El reporte rezagado ha sido enviado correctamente"
                          });
                          // Borramos los datos guardados
                          AsyncStorage.removeItem(key);
                      })
                      .catch(error => {
                          crashlytics().recordError(error)
                          // console.log(error.response);
                      });
                  }

                })
              };

            } catch (e) {
              PushNotification.localNotification({
                channelId: 'error-update',
                title: "Reporte NO enviado",
                message: "No hay reporte rezagado"
              });
            }
          };
          
          retrieveData();
        }
      });
    };

    const unsubscribe = NetInfo.addEventListener(checkInternetAndResendData);
    checkInternetAndResendData();

    return () => {
      unsubscribe();
    };
  }, []);

  

  if (user) {
    return (
      <View style={styles.container}>
        <View style={styles.containerPrevia}>
          <Text style={styles.principalText}>{titulo}</Text>

          <Modal
            animationType="slide"
            transparent={true}
            visible={errorVisible}
            onRequestClose={() => {
              setErrorVisible(!errorVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Logo style={logo_styles.logo}></Logo>
                <View style={logo_styles.container}>
                  <VidaAssistance style={logo_styles.text}></VidaAssistance>
                </View>
                <Text style={styles.modalTextWarning}>
                  No se puede realizar el FRAP.
                </Text>
                <Text style={styles.modalText}>
                  No puedes generar otro FRAP si tienes rezagados, por favor mejora tu conexión para que se envíen.
                </Text>
                <Pressable
                  style={[styles.botonConfirm]}
                  onPress={() => {
                    setErrorVisible(!errorVisible);
                  }}>
                  <Text style={styles.textStyle}>Cerrar</Text>
              </Pressable>
              </View>
            </View>
          </Modal>

          {user.tipo === 'M' || user.tipo === 'R' ? (
            <>
              <TouchableOpacity
                style={styles.botonConfirm}
                onPress={onSubmit}>
                <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                  Nuevo Reporte Médico
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botonCancelado} onPress={onCancelMedico}>
                <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                  Nuevo Reporte Médico Cancelado
                </Text>
              </TouchableOpacity>
            </>
          ) : null}
          
          
          {user.tipo === 'P' || user.tipo === 'A' || user.tipo === 'R' ? (
            <>
              <TouchableOpacity
                style={styles.botonConfirm}
                onPress={onSubmitPre}>
                <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                  Nuevo Reporte Prehospitalario
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botonCancelado} onPress={onCancelPrehospitalario}>
                <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                  Nuevo Reporte Prehospitalario Cancelado
                </Text>
              </TouchableOpacity>
            </>
          ) : null}
          
          <TouchableOpacity style={styles.botonSalir} onPress={logout}>
            <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
              Cerrar sesión
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botonRezagados} onPress={manualSubmit}>
            <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
              Mandar FRAPS rezagados
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    
    axios({
      method: 'post',
      url: API_URL + 'auth/logout',
      headers: {
        Accept: 'application/json',
      },
    }).then(() => {
      navigation.navigate('login');
    });
  }
};

export default PreviaFormulario;

const logo_styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 50,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    overflow: 'hidden',
  },
  text: {
    height: 150,
    width: 150,
  },
  boton: {
    backgroundColor: '#284D95',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: 200,
    alignItems: 'center',
    marginTop: 30,
  },
});