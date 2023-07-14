import {Formik} from 'formik';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from '../styles/styles';
import {validacionTexto} from '../validaciones';
import {object} from 'yup';

const Paciente = ({parte, onFormSubmit, closeSection}) => {
  const validationSchema = object().shape({
    paciente_texto: validacionTexto(),
  });
  return (
    <Formik
      initialValues={{
        paciente_texto: '',
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View>
          <Text style={styles.layoutFormulario}>Paciente </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('paciente_texto')}
            onBlur={handleBlur('paciente_texto')}
            value={values.paciente_texto}
          />
          {errors.paciente_texto ? (
            <Text style={styles.errorMensaje}>{errors.paciente_texto}</Text>
          ) : null}

          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default Paciente;
