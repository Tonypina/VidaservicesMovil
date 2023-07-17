import {Formik} from 'formik';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from '../styles/styles';
import {validacionTexto} from '../validaciones';
import {object} from 'yup';
const validationSchema = object().shape({
  diagnostico: validacionTexto(),
});
const Diagnostico = ({parte, onFormSubmit, closeSection}) => {
  return (
    <Formik
      initialValues={{
        diagnostico: '',
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View>
          <Text style={styles.layoutFormulario}>Diagnostico </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('diagnostico')}
            onBlur={handleBlur('diagnostico')}
            value={values.diagnostico}
          />
          {errors.diagnostico ? (
            <Text style={styles.errorMensaje}>{errors.diagnostico}</Text>
          ) : null}

          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default Diagnostico;
