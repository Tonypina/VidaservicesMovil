import { Formik } from "formik";
import { View, Text, TextInput, Button } from "react-native";
import React from "react";
import { styles } from "../styles/styles";

const motivosDeAtencion = ({ onFormSubmit }) => {
  return (
    <Formik
      initialValues={{
        motivo_atencion: "",
      }}
      onSubmit={(values) => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <Text style={styles.layoutFormulario}>Motivos de atención: </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("motivo_atencion")}
            onBlur={handleBlur("motivo_atencion")}
            value={values.motivo_atencion}
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
export default motivosDeAtencion;
