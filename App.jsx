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
import { Modal } from "react-native";
import axios from 'axios';
import { styles } from "./src/components/styles/styles";
import { View, Text} from "react-native";

function MyStack({navigation}) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

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
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={LoginComponent}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="previaFormulario"
        component={PreviaFormularioComponent}
        options={{
          headerTitle: props => <Navbar {...props} />,
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

  useEffect(() => {
    
    const requestData = {
      version: APK_VERSION,
    };

    axios.post(baseUrl, requestData)
      .then(response => {
        console.log(response.data);
        setLatestVersion(response.data.latest);
        if (!response.data.status) {
          setIsUpdated(false);
          setErrorVisible(true);
        } else {
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  
  return (
    <NavigationContainer>
      {(isUpdated) && (
        <MyStack />
      )}
      {(!isUpdated) && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={errorVisible}
          onRequestClose={() => {
            setErrorVisible(!errorVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTextWarning}>
                No se puede ingresar a la aplicación.
              </Text>
              <Text style={styles.modalText}>Su aplicación está desactualizada, porfavor instale una versión válida</Text>
              <Text style={styles.modalText}>Versión actual: {APK_VERSION}</Text>
              <Text style={styles.modalText}>Versión esperada: {latestVersion}</Text>
            </View>
          </View>
        </Modal>
      )}
    </NavigationContainer>
  );
}
