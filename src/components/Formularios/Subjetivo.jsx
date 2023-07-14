import {Formik} from 'formik';
import {View, Text, TextInput, TouchableOpacity, Button} from 'react-native';
import React from 'react';
import {styles} from '../styles/styles';

const Subjetivo = ({parte, onFormSubmit, closeSection}) => {
  return (
    <Formik
      initialValues={{
        subjetivo_texto: '',
      }}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View>
          <Text style={styles.layoutFormulario}>Subjetivo </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('subjetivo_texto')}
            onBlur={handleBlur('subjetivo_texto')}
            value={values.subjetivo_texto}
          />

          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default Subjetivo;
