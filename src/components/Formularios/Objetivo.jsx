import {Formik} from 'formik';
import {View, Text, TextInput, TouchableOpacity, Button} from 'react-native';
import React from 'react';
import {styles} from '../styles/styles';

const Objetivo = ({parte, onFormSubmit, closeSection}) => {
  return (
    <Formik
      initialValues={{
        objetivo_texto: '',
      }}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View>
          <Text style={styles.layoutFormulario}>Objetivo </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('objetivo_texto')}
            onBlur={handleBlur('objetivo_texto')}
            value={values.objetivo_texto}
          />

          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default Objetivo;
