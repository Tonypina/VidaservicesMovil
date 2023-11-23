import {Formik} from 'formik';
import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {styles} from '../styles/styles';

const PersonalQueAtiende = props => {
  let me = props.user.user;

  const TextInputForm = ({label, value, editable}) => {
    return (
      <>
        <Text>{label}</Text>
        <TextInput style={styles.input} value={value} editable={false} />
      </>
    );
  };

  return (
    <Formik
      initialValues={{
        base: me.base,
        unidad: me.unidad,
        name: me.name,
        cedula_profesional: me.cedula_profesional,
      }}
      onSubmit={values => {}}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View>
          {[
            {
              label: 'Base asignada:',
              name: 'base',
            },
            {
              label: 'Unidad económico:',
              name: 'unidad',
            },
            {
              label: 'Código V/ Nombre:',
              name: 'name',
            },
            {
              label: 'Cédula Profesional:',
              name: 'cedula_profesional',
            },
          ].map(input => (
            <TextInputForm
              key={input.name}
              label={input.label}
              name={input.name}
              value={values[input.name]}
              onChangeText={handleChange(input.name)}
              onBlur={handleBlur(input.name)}
              editable={false}
            />
          ))}
        </View>
      )}
    </Formik>
  );
};

export default PersonalQueAtiende;
