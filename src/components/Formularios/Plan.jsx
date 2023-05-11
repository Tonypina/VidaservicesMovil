import {Formik} from 'formik';
import {View, Text, TextInput, Button} from 'react-native';
import React from 'react';
import {styles} from '../styles/styles';

const Plan = ({parte, onFormSubmit, closeSection}) => {
  return (
    <Formik
      initialValues={{
        plan_texto: '',
      }}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View>
          <Text style={styles.layoutFormulario}>Plan </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('plan_texto')}
            onBlur={handleBlur('plan_texto')}
            value={values.plan_texto}
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
export default Plan;
