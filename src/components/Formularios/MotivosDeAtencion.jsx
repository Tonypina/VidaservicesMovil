import {Formik} from 'formik';
import {View, Text, TextInput, TouchableOpacity, Button} from 'react-native';
import React from 'react';
import {styles} from '../styles/styles';

const motivosDeAtencion = ({onFormSubmit, closeSection}) => {
  return (
    <Formik
      initialValues={{
        motivo_atencion: '',
      }}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View>
          <Text style={styles.layoutFormulario}>Motivos de atención: </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('motivo_atencion')}
            onBlur={handleBlur('motivo_atencion')}
            value={values.motivo_atencion}
          />

          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default motivosDeAtencion;
