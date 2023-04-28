import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles/styles";
import axios from "axios";

const PreviaFormulario = ({ token, user, navigation }) => {

  const [titulo, setTitulo] = useState(null);

  useEffect(() => {
    if (token) {

      if (user.tipo === "M") {
        setTitulo("Formulario Médicos");
      
      } else if (user.tipo === "P") {
        setTitulo("Formulario Paramédicos");

      } else if (user.tipo === "A") {
        setTitulo("Formulario Ambulancia");
      }
    }
  });

  const onSubmit = () => {

    if (user.tipo === "M") {
      navigation.navigate("formularioMedicos", { token: token, user: user });

    } else if (user.tipo === "P" || user.tipo === "A") {
      navigation.navigate("formularioPrehospilario", { token: token, user: user });
      
    }
  };

  if (token) {
    return (
      <View style={styles.container}>
        <View style={styles.containerPrevia}>
          <Text style={styles.principalText}>{titulo}</Text>

          <TouchableOpacity style={styles.botonConfirm} onPress={onSubmit}>
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
              Crear nuevo formulario
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );

  } else {

    axios({
      method: 'post',
      url: 'http://10.0.2.2:8000/auth/logout'
    }).then(() => {
      navigation.navigate("login");
    });
  }
};

export default PreviaFormulario;
