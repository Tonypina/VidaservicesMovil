import {Formik} from 'formik';
import {View, Text, TextInput, TouchableOpacity, Button} from 'react-native';
import React from 'react';
import {styles} from '../styles/styles';
import {validacionTexto} from '../validaciones';
import {object} from 'yup';

const Objetivo = ({parte, onFormSubmit, closeSection}) => {
  const validationSchema = object().shape({
    objetivo_texto: validacionTexto(),
  });
  return (
    <Formik
      initialValues={{
        objetivo_texto: '',
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View>
          <Text style={styles.layoutFormulario}>Objetivo </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('objetivo_texto')}
            onBlur={handleBlur('objetivo_texto')}
            value={values.objetivo_texto}
          />
          {errors.objetivo_texto ? (
            <Text style={styles.errorMensaje}>{errors.objetivo_texto}</Text>
          ) : null}

          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default Objetivo;
