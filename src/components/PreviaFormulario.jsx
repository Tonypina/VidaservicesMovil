import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles/styles';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PreviaFormulario = ({token, user, navigation}) => {
  const [titulo, setTitulo] = useState(null);

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

  const onSubmit = () => {
    if (user.tipo === 'M' || user.tipo === 'R') {
      navigation.navigate('formularioMedicos', {token: token, user: user});
    } else if (user.tipo === 'P' || user.tipo === 'A') {
      navigation.navigate('formularioPrehospilario', {
        token: token,
        user: user,
      });
    }
  };

  const onSubmitPrehospitalario = () => {
    navigation.navigate('formularioPrehospitalario', {
      token: token,
      user: user,
    });
  };

  const onCancelMedico = () => {
    navigation.navigate('CancelFormularioMedicos', {
      token: token,
      user: user,
    });
  };
  
  const onCancelPrehospitalario = () => {
    navigation.navigate('CancelFormularioPrehospitalario', {
      token: token,
      user: user,
    });
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

  if (user) {
    return (
      <View style={styles.container}>
        <View style={styles.containerPrevia}>
          <Text style={styles.principalText}>{titulo}</Text>

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
          
          {user.tipo === 'A' || user.tipo === 'P' || user.tipo === 'R' ? (
            <>
              <TouchableOpacity
                style={styles.botonConfirm}
                onPress={onSubmitPrehospitalario}>
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
