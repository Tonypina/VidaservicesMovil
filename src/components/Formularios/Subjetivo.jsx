import { Formik } from "formik";
import { View, Text, TextInput, Button } from "react-native";
import React from "react";
import { styles } from "../styles/styles";

const Subjetivo = ({ parte, onFormSubmit }) => {

  return (
    <Formik
      initialValues={{
        subjetivo_texto: "",
      }}
      onSubmit={(values) => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <Text style={styles.layoutFormulario}>Subjetivo </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("subjetivo_texto")}
            onBlur={handleBlur("subjetivo_texto")}
            value={values.subjetivo_texto}
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
export default Subjetivo;
