import Login from './src/components/Login';
import React, {useState, useEffect} from 'react';
import PreviaFormulario from './src/components/PreviaFormulario';
import FormularioMedicos from './src/components/FormularioMedicos';
import CancelFormularioMedicos from './src/components/CancelFormularioMedicos';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Aceptacion from './src/components/Formularios/Aceptacion';
const Stack = createStackNavigator();
import {API_URL, APK_VERSION} from '@env';
import Navbar from './src/components/Navbar';
import NavbarPrevia from './src/components/NavbarPrevia';
import {Modal} from 'react-native';
import axios from 'axios';
import {styles} from './src/components/styles/styles';
import {AppState, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Logo from './src/components/Logo';
import VidaAssistance from './src/components/VidaAssistence';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";

function MyStack({initialRouteName, token, setToken, user, setUser}) {
  const handleTokenChange = newToken => {
    setToken(newToken);
  };

  const handleUserChange = newUser => {
    setUser(newUser);
  };

  const LoginComponent = props => (
    <Login
      {...props}
      onTokenChange={handleTokenChange}
      onUserChange={handleUserChange}
    />
  );

  const PreviaFormularioComponent = props => (
    <PreviaFormulario {...props} token={token} user={user} />
  );

  const FormularioMedicosComponent = props => (
    <FormularioMedicos {...props} token={token} user={user} />
  );

  const CancelFormularioMedicosComponent = props => (
    <CancelFormularioMedicos {...props} token={token} user={user} />
  );

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name="login"
        component={LoginComponent}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="previaFormulario"
        component={PreviaFormularioComponent}
        options={{
          headerTitle: props => <NavbarPrevia {...props} />,
        }}
      />

      <Stack.Screen
        name="formularioMedicos"
        component={FormularioMedicosComponent}
        options={{
          headerTitle: props => <Navbar {...props} />,
        }}
      />

      <Stack.Screen
        name="CancelFormularioMedicos"
        component={CancelFormularioMedicosComponent}
        options={{
          headerTitle: props => <Navbar {...props} />,
        }}
      />

      <Stack.Screen
        name="aceptacion"
        component={Aceptacion}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

const baseUrl = API_URL + 'api/validate-apk-version';

export default function App() {
  const [isUpdated, setIsUpdated] = useState(true);
  const [latestVersion, setLatestVersion] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [initialRouteName, setInitialRouteName] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  let firstTimeOpen = true;

  const getUserInfo = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = JSON.parse(await AsyncStorage.getItem('user'));
      if (storedToken !== null && storedUser !== null) {
        // verifyToken(storedToken);

        setToken(storedToken);
        setUser(storedUser);
        firstTimeOpen = false;
        setInitialRouteName('previaFormulario');
      }
    } catch (error) {
      console.log(error);
    }
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

                // Enviamos la petición
                axios({
                  method: 'post',
                  url: baseUrl,
                  headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                  },
                  data: data,
                })
                  .then(response => {
                    if (response.status === 201) {
                      // Enviamos notificación de éxito
                      PushNotification.localNotification({
                        title: "Reporte enviado",
                        message: "El reporte ha sido enviado correctamente"
                      });
                      // Borramos los datos guardados
                      AsyncStorage.removeItem('asyncForm');
                    }
                  })
                  .catch(error => {
                    console.log(error);
                    console.log(data);
                  });
              }
            } catch (e) {
              console.log(e);
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

                // Enviamos la petición
                axios({
                  method: 'post',
                  url: baseUrl,
                  headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                  },
                  data: data,
                })
                  .then(response => {
                    if (response.status === 201) {
                      // Enviamos notificación de éxito
                      PushNotification.localNotification({
                        title: "Reporte enviado",
                        message: "El reporte ha sido enviado correctamente"
                      });
                      // Borramos los datos guardados
                      AsyncStorage.removeItem('asyncForm');
                    }
                  })
                  .catch(error => {
                    console.log(error);
                    console.log(data);
                  });
              }
            } catch (e) {
              console.log(e);
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

  useEffect(() => {

    const verifyVersion = AppState.addEventListener('change', nextAppState => {

      const requestData = {
        version: APK_VERSION,
      };

      if (nextAppState === 'active') {

        axios
          .post(baseUrl, requestData, {headers: {Accept: 'application/json'}})
          .then(response => {
    
            setLatestVersion(response.data.latest);
            if (!response.data.status) {
              setErrorMessage('Su aplicación está desactualizada, porfavor instale una versión válida');
              setIsUpdated(false);
              setErrorVisible(true);
            } else {

              if (firstTimeOpen) {
                getUserInfo().then(() => {
                  setInitialRouteName('previaFormulario');
                });
              }
            }
          })
          .catch(error => {
    
            // if (error.code === 'ERR_NETWORK') {
            //   setErrorMessage([
            //     ['Error de conexión'],
            //   ]);
        
            // } else {
            //   setErrorMessage(error.response.data.errors); 
            // }
            // setIsUpdated(false);
            // setErrorVisible(true);
            if (firstTimeOpen) {
              getUserInfo().then(() => {
                setInitialRouteName('previaFormulario');
              });
            }
          });
      }
    });

    return () => {
      verifyVersion.remove();
    }

  }, []);

  return (
    <NavigationContainer>
      {isUpdated && initialRouteName && (
        <MyStack
          initialRouteName={initialRouteName}
          token={token}
          setToken={setToken}
          user={user}
          setUser={setUser}
        />
      )}
      {!isUpdated && (
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
                No se puede ingresar a la aplicación.
              </Text>
              <Text style={styles.modalText}>
                {errorMessage}
              </Text>
              <Text style={styles.modalText}>
                Versión actual: {APK_VERSION}
              </Text>
              <Text style={styles.modalText}>
                Versión esperada: {latestVersion}
              </Text>
              {/* <TouchableOpacity style={logo_styles.boton} onPress={() => {
                handleNewVersionDownload();
              }}>
                <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
                  Descargar
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </Modal>
      )}
    </NavigationContainer>
  );
}

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
