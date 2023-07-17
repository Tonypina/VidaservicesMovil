import {Formik} from 'formik';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from '../styles/styles';
import {validacionTexto} from '../validaciones';
import {object} from 'yup';
const validationSchema = object().shape({
  subjetivo_texto: validacionTexto(),
});
const Subjetivo = ({parte, onFormSubmit, closeSection}) => {
  return (
    <Formik
      initialValues={{
        subjetivo_texto: '',
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View>
          <Text style={styles.layoutFormulario}>Subjetivo </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('subjetivo_texto')}
            onBlur={handleBlur('subjetivo_texto')}
            value={values.subjetivo_texto}
          />
          {errors.subjetivo_texto ? (
            <Text style={styles.errorMensaje}>{errors.subjetivo_texto}</Text>
          ) : null}

          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default Subjetivo;
