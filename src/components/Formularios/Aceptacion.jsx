import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import RadioGroup from "react-native-radio-buttons-group";
import { Formik } from "formik";
import Signature from "react-native-signature-canvas";


const TextInputField = ({ value, onChangeText }) => {
  return (
    <TextInput style={styles.input} value={value} onChangeText={onChangeText} />
  );
};

const handleOK = () => {
  
};

const handleEmpty = () => {

};

const Aceptacion = ({ onFormSubmit }) => {
  // const style = 'body { opacity: 0.99; overflow: "hidden" }';
  
  const opciones = [
    {
      id: 1,
      label: "Sí",
      value: true,
    },
    {
      id: 2,
      label: "No",
      value: false,
    },
  ];

  const [ambulancia, setAmbulancia] = useState(false);

  const handleAmbulancia = (selectedButton) => {
    const { value } = selectedButton.find((b) => b.selected);
    setAmbulancia(value);
  };

  return (
    <Formik
      initialValues={{
        eco: "",
        dependencia: "",
        recibe: "",
        nombre_traslado: "",
        firma: "",
      }}
      onSubmit={(values) => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
        <View style={styles.container}>
          <View style={styles.confirmacion}>
            <Text style={styles.confirmacionText}>Confirmación</Text>
          </View>
          <View style={styles.containerForm}>
            <Text style={styles.labelForm}>¿Se usó ambulancia?</Text>

            <RadioGroup
              radioButtons={opciones}
              onPress={handleAmbulancia}
              containerStyle={styles.radioGroup}
            />
            {ambulancia
              ? <View style={styles.containerForm}>
                  <Text style={styles.labelForm}>ECO: </Text>
                  <TextInputField
                    style={styles.input}
                    onChangeText={handleChange("eco")}
                    value={values.eco}
                  />
                  <Text style={styles.labelForm}>Dependencia: </Text>
                  <TextInputField
                    style={styles.input}
                    onChangeText={handleChange("dependencia")}
                    value={values.dependencia}
                  />
                  <Text style={styles.labelForm}>Recibe: </Text>
                  <TextInputField
                    style={styles.input}
                    onChangeText={handleChange("recibe")}
                    value={values.recibe}
                  />
                  <Text style={styles.labelForm}>Nombre personal a cargo: </Text>
                  <TextInputField
                    style={styles.input}
                    value={values.nombre_traslado}
                    onChangeText={handleChange("nombre_traslado")}
                  />
                </View>
              : null}
          </View>

          <View style={styles.containerTextTerminos}>
            <Text style={styles.textoTerminos}>
              ACEPTO LOS TÉRMINOS Y CONDICIONES DE PRIVACIDAD ASÍ COMO LA ATENCION Y
              RECOMENDACIONES DEL PERSONAL VIDASSISTANCE
            </Text>
            <View style={styles.containerInternet}>
              <Text style={styles.textInternet}>
                [LA PUEDE CONSULTAR EN NUESTRA PAGINA DE INTERNET]
              </Text>
              <Text style={styles.textPagina}>http://www.vidassistance.com</Text>
            </View>
            <Text>Nombre y firma:</Text>
            
            <Signature
              onOK={handleOK}
              onEmpty={handleEmpty}
              descriptionText="Sign"
              clearText="Clear"
              confirmText="Save"
              // webStyle={style}
            />

            {/* <TextInput
              style={styles.input}
              value={values.firma}
              onChangeText={handleChange("firma")}
            /> */}
          </View>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={styles.botonConfirm} onPress={() => {
              handleSubmit();
              onFormSubmit(values);
            }}>
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
                Enviar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Aceptacion;

const styles = StyleSheet.create({
  labelForm: { marginTop: 0, marginBottom: 10, fontSize: 16, marginLeft: 10 },
  containerConfirmacion: {
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    paddingTop: 0,

    alignItems: "center",
  },
  containerTextTerminos: {
    borderTopWidth: 1,
    marginTop: 10,
    padding: 20,
  },
  textoTerminos: {
    textAlign: "justify",
    color: "#284D95",
    fontSize: 16,
  },
  confirmacion: {
    // backgroundColor: "#284D95",
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  confirmacionText: {
    // color: "white",
    fontSize: 20,
  },
  texto: {
    fontSize: 20,
  },
  containerForm: {
    alignItems: "flex-start",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
  },
  input: {
    padding: 10,
    paddingStart: 30,
    height: 40,
    width: 350,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "gray",
  },
  botonConfirm: {
    backgroundColor: "#284D95",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: 150,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  textInternet: {
    textAlign: "center",
    fontSize: 14,
  },
  textPagina: {
    textAlign: "center",
    color: "#284D95",
    fontSize: 14,
  },
  containerInternet: {
    marginTop: 10,
    marginBottom: 15,
  },
});
