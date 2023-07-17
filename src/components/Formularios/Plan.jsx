import {Formik} from 'formik';
import {View, Text, TextInput, TouchableOpacity, Button} from 'react-native';
import React from 'react';
import {styles} from '../styles/styles';
import {validacionTexto} from '../validaciones';
import {object} from 'yup';
const validationSchema = object().shape({
  plan_texto: validacionTexto(),
});
const Plan = ({parte, onFormSubmit, closeSection}) => {
  return (
    <Formik
      initialValues={{
        plan_texto: '',
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View>
          <Text style={styles.layoutFormulario}>Plan </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('plan_texto')}
            onBlur={handleBlur('plan_texto')}
            value={values.plan_texto}
          />
          {errors.plan_texto ? (
            <Text style={styles.errorMensaje}>{errors.plan_texto}</Text>
          ) : null}
          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default Plan;
