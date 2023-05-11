import {Formik} from 'formik';
import {View, Text, TextInput, Button} from 'react-native';
import React from 'react';
import {styles} from '../styles/styles';

const Diagnostico = ({parte, onFormSubmit, closeSection}) => {
  return (
    <Formik
      initialValues={{
        diagnostico: '',
      }}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View>
          <Text style={styles.layoutFormulario}>Diagnostico </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('diagnostico')}
            onBlur={handleBlur('diagnostico')}
            value={values.diagnostico}
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
export default Diagnostico;
