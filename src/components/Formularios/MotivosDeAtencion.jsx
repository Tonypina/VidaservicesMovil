import {Formik} from 'formik';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from '../styles/styles';
import {
  validacionTexto,
  validacionNumero,
  validacionTelefono,
} from '../validaciones';
import {object} from 'yup';

const motivosDeAtencion = ({onFormSubmit, closeSection}) => {
  const validationSchema = object().shape({
    motivo_atencion: validacionTexto(),
  });
  return (
    <Formik
      initialValues={{
        motivo_atencion: '',
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View>
          <Text style={styles.layoutFormulario}>Motivos de atención: </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('motivo_atencion')}
            onBlur={handleBlur('motivo_atencion')}
            value={values.motivo_atencion}
          />
          {errors.motivo_atencion ? (
            <Text style={styles.errorMensaje}>{errors.motivo_atencion}</Text>
          ) : null}
          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default motivosDeAtencion;
