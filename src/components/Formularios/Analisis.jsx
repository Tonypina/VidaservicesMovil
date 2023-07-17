import {Formik} from 'formik';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from '../styles/styles';
import {validacionTexto} from '../validaciones';
import {object} from 'yup';
const validationSchema = object().shape({
  analisis_texto: validacionTexto(),
});
const Analisis = ({parte, onFormSubmit, closeSection}) => {
  return (
    <Formik
      initialValues={{
        analisis_texto: '',
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View>
          <Text style={styles.layoutFormulario}>Analisis </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('analisis_texto')}
            onBlur={handleBlur('analisis_texto')}
            value={values.analisis_texto}
          />
          {errors.analisis_texto ? (
            <Text style={styles.errorMensaje}>{errors.analisis_texto}</Text>
          ) : null}

          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default Analisis;
