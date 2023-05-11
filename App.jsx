import Login from './src/components/Login';
import React, {useState} from 'react';
import PreviaFormulario from './src/components/PreviaFormulario';
import FormularioMedicos from './src/components/FormularioMedicos';
import CancelFormularioMedicos from './src/components/CancelFormularioMedicos';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Aceptacion from './src/components/Formularios/Aceptacion';
const Stack = createStackNavigator();
import Navbar from './src/components/Navbar';

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
          headerTitle: props => <Navbar {...props} navigation={navigation} />,
        }}
      />

      <Stack.Screen
        name="formularioMedicos"
        component={FormularioMedicosComponent}
        options={{
          headerTitle: props => <Navbar {...props} navigation={navigation} />,
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

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
