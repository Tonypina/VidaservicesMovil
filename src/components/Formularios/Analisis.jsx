import {Formik} from 'formik';
import {View, Text, TextInput, Button} from 'react-native';
import React from 'react';
import {styles} from '../styles/styles';

const Analisis = ({parte, onFormSubmit, closeSection}) => {
  return (
    <Formik
      initialValues={{
        analisis_texto: '',
      }}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View>
          <Text style={styles.layoutFormulario}>Analisis </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('analisis_texto')}
            onBlur={handleBlur('analisis_texto')}
            value={values.analisis_texto}
          />

          <Button
            title="Guardar"
            onPress={() => {
              handleSubmit();
              onFormSubmit(values);
            }}
          />
        </View>
      )}
    </Formik>
  );
};
export default Analisis;
