import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import Logo from "./Logo";
import VidaAssistence from "./VidaAssistence";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles/styles-login";
import { API_URL } from '@env'

const baseUrl = API_URL +  "auth/login";
// const baseUrl = "http://192.168.0.112:8000/auth/login";

const Login = ({ navigation, onTokenChange, onUserChange }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const [isLoading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const olvideMiContrasena = async () => {
    
  };

  const iniciarSesion = async () => {
    setLoading(true);
    const { email, password } = form;
    let token;
    
    await axios({
      method: "post",
      url: baseUrl,
      data: {
        email: email,
        password: password,
      },

    }).then((response) => {  

      if (response.status === 200) {

        token = response.data.token;
        user = response.data.user;
    
        onTokenChange(token); // se llama a la función pasada como prop
        onUserChange(user); // se llama a la función pasada como prop
        navigation.navigate('previaFormulario');
      }
    }).catch(error => setError(error.response.data.message));
    
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Logo style={styles.logo} />
        <VidaAssistence style={styles.marca} />

        <Text style={styles.titulo}>Bienvenid@</Text>

        <Text style={styles.formularioLabel}>Correo electrónico:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Ingresa tu correo electrónico"
          value={form.email}
          onChangeText={(value) => handleChange("email", value)}
        />

        <Text style={styles.formularioLabel}>Contraseña:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Ingresa tu contraseña"
          value={form.password}
          onChangeText={(value) => handleChange("password", value)}
          secureTextEntry={true}
        />

        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <TouchableOpacity style={styles.boton} onPress={iniciarSesion}>
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
              Entrar
            </Text>
          </TouchableOpacity>
        )}

        {error ? (
          <Text style={{ color: "#ff0000", fontSize: 10, fontWeight: "bold" }}>
            {error}
          </Text>
        ) : (null)
        }

        {/* <TouchableOpacity onPress={olvideMiContrasena}>
          <Text style={styles.olvideContrasena}>Olvidé mi contraseña</Text>
        </TouchableOpacity> */}

        <StatusBar style="auto" />
      </KeyboardAvoidingView>
    </View>
  );
};
export default Login;
