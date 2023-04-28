import { Formik } from "formik";
import { View, Text, TextInput, Button } from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
import React, { useState, memo, useCallback } from "react";
import { styles } from "../styles/styles";

const DatosPaciente = ({ onFormSubmit }) => {
  const [sexoPaciente, setSexoPaciente] = useState([
    {
      id: 1,
      label: "Masculino",
      value: "masculino",
    },
    {
      id: 2,
      label: "Femenino",
      value: "femenino",
    },
  ]);

  return (
    <Formik
      initialValues={{
        paciente_nombre: "",
        paciente_edad: "",
        paciente_sexo: "",
        paciente_nacionalidad: "",
        paciente_estado_civil: "",
        paciente_contacto: "",
        paciente_ocupacion: "",
      }}
      onSubmit={(values) => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <Text style={styles.layoutFormulario}>Nombre: </Text>
          <TextInput
            placeholder="Ingresa el nombre del paciente"
            style={styles.input}
            onChangeText={handleChange("paciente_nombre")}
            onBlur={handleBlur("paciente_nombre")}
            value={values.paciente_nombre}
          />
          <Text style={styles.layoutFormulario}>Edad: </Text>
          <TextInput
            placeholder="Ingresa la edad del paciente"
            style={styles.input}
            onChangeText={handleChange("paciente_edad")}
            onBlur={handleBlur("paciente_edad")}
            value={values.paciente_edad}
          />
          <View style={{}}>
            <Text style={styles.layoutFormulario}>Sexo: </Text>
            <RadioGroup
              radioButtons={sexoPaciente}
              containerStyle={styles.radioGroup}
              onPress={(sexoPaciente) => {
                setSexoPaciente(sexoPaciente);
                
                Object.keys(sexoPaciente).forEach( key => {
                  if (sexoPaciente[key].selected) {
                    if (sexoPaciente[key].id === 1) {
                      values.paciente_sexo = 0   
                    } else {
                      values.paciente_sexo = 1   
                    }
                  }
                })
              }}
            />
          </View>
          <Text style={styles.layoutFormulario}>Nacionalidad: </Text>
          <TextInput
            placeholder="Ingresa la nacionalidad del paciente"
            style={styles.input}
            onChangeText={handleChange("paciente_nacionalidad")}
            onBlur={handleBlur("paciente_nacionalidad")}
            value={values.paciente_nacionalidad}
          />
          <Text style={styles.layoutFormulario}>Estado civil: </Text>
          <TextInput
            placeholder="Ingresa el estado civil del paciente"
            style={styles.input}
            onChangeText={handleChange("paciente_estado_civil")}
            onBlur={handleBlur("paciente_estado_civil")}
            value={values.paciente_estado_civil}
          />
          <Text style={styles.layoutFormulario}>Telefono: </Text>
          <TextInput
            placeholder="Ingresa el telefono del paciente"
            style={styles.input}
            onChangeText={handleChange("paciente_contacto")}
            onBlur={handleBlur("paciente_contacto")}
            value={values.paciente_contacto}
          />
          <Text style={styles.layoutFormulario}>Ocupación: </Text>
          <TextInput
            placeholder="Ingresa la ocupación del paciente"
            style={styles.input}
            onChangeText={handleChange("paciente_ocupacion")}
            onBlur={handleBlur("paciente_ocupacion")}
            value={values.paciente_ocupacion}
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

export default memo(DatosPaciente);
