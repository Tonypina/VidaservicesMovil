import { Formik } from "formik";
import { View, Text, TextInput, Button } from "react-native";
import React from "react";
import { styles } from "../styles/styles";

const Paciente = ({ parte, onFormSubmit }) => {

  return (
    <Formik
      initialValues={{
        paciente_texto: "",
      }}
      onSubmit={(values) => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <Text style={styles.layoutFormulario}>Paciente </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("paciente_texto")}
            onBlur={handleBlur("paciente_texto")}
            value={values.paciente_texto}
          />

          <Button
            title="Guardar"
            onPress={() => {
              handleSubmit();
              onFormSubmit(values);
            }}
          />
        </View>
      )}
    </Formik>
  );
};
export default Paciente;
