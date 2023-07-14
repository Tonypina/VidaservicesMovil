import {Formik} from 'formik';
import {View, Text, TextInput, TouchableOpacity, Button} from 'react-native';
import React from 'react';
import {styles} from '../styles/styles';

const Diagnostico = ({parte, onFormSubmit, closeSection}) => {
  return (
    <Formik
      initialValues={{
        diagnostico: '',
      }}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View>
          <Text style={styles.layoutFormulario}>Diagnostico </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('diagnostico')}
            onBlur={handleBlur('diagnostico')}
            value={values.diagnostico}
          />

          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default Diagnostico;
