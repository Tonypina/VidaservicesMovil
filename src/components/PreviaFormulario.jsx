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

const PreviaFormulario = ({token, user, navigation}) => {
  const [titulo, setTitulo] = useState(null);
  const [errorVisible, setErrorVisible] = useState(false);

  useEffect(() => {
    if (token) {
      if (user.tipo === 'M' || user.tipo === 'R') {
        setTitulo('Formulario Médicos');
      } else if (user.tipo === 'P') {
        setTitulo('Formulario Paramédicos');
      } else if (user.tipo === 'A') {
        setTitulo('Formulario Ambulancia');
      }
    }
  });

  const onSubmit = async () => {
    try {
      const data = await AsyncStorage.getItem('asyncForm');
      if (data !== null) {
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
      const data = await AsyncStorage.getItem('asyncForm');
      if (data !== null) {
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
      const data = await AsyncStorage.getItem('asyncForm');
      if (data !== null) {
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
      const data = await AsyncStorage.getItem('asyncForm');
      if (data !== null) {
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
              const value = await AsyncStorage.getItem('asyncForm');
              if (value !== null) {
                // Convertimos de nuevo a objeto
                const data = JSON.parse(value);
                let baseUrlAsync = API_URL
        
                // Generalizar para paramédicos
                if (data.isCanceled) {
                  baseUrlAsync += 'api/reportes/medicos/canceled'
                } else {
                  baseUrlAsync += "api/reportes/medicos/"
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
                      AsyncStorage.removeItem('asyncForm');
                  })
                  .catch(error => {
                    if (error.response.data !== null) {
        
                      PushNotification.localNotification({
                        channelId: 'error-update',
                        title: "Reporte NO enviado",
                        message: "No hay ningun reporte por enviar"
                      });
                    } 
                    else 
                      console.log(error);
                  });
              }
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