import {Formik} from 'formik';
import {View, Text, TextInput, TouchableOpacity, Button} from 'react-native';
import React, {memo} from 'react';
import {styles} from '../styles/styles';
import {validacionTexto} from '../validaciones';
import {object} from 'yup';

const EvaluacionSecundaria = ({onFormSubmit, closeSection}) => {
  const validationSchema = object().shape({
    alergias: validacionTexto(),
    padecimientos: validacionTexto(),
    antecedentes_quirurgicos: validacionTexto(),
    toxicomania: validacionTexto(),
    grupo_sanguineo: validacionTexto(),
    medicamentos_en_consumo: validacionTexto(),
  });
  return (
    <Formik
      initialValues={{
        alergias: '',
        padecimientos: '',
        antecedentes_quirurgicos: '',
        toxicomania: '',
        grupo_sanguineo: '',
        medicamentos_en_consumo: '',
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View>
          <Text style={styles.layoutFormulario}>Alergias: </Text>
          <TextInput
            placeholder="Ingresa las alergias"
            style={styles.input}
            onChangeText={handleChange('alergias')}
            onBlur={handleBlur('alergias')}
            value={values.alergias}
          />
          {errors.alergias ? (
            <Text style={styles.errorMensaje}>{errors.alergias}</Text>
          ) : null}
          <Text style={styles.layoutFormulario}>
            Padecimientos crónicodegenerativos:{' '}
          </Text>
          <TextInput
            placeholder="Ingresa los padecimientos"
            style={styles.input}
            onChangeText={handleChange('padecimientos')}
            onBlur={handleBlur('padecimientos')}
            value={values.padecimientos}
          />
          {errors.padecimientos ? (
            <Text style={styles.errorMensaje}>{errors.padecimientos}</Text>
          ) : null}
          <Text style={styles.layoutFormulario}>
            Antecedentes quirúrgicos:{' '}
          </Text>
          <TextInput
            placeholder="Ingresa los antecedentes"
            style={styles.input}
            onChangeText={handleChange('antecedentes_quirurgicos')}
            onBlur={handleBlur('antecedentes_quirurgicos')}
            value={values.antecedentes_quirurgicos}
          />
          {errors.antecedentes_quirurgicos ? (
            <Text style={styles.errorMensaje}>
              {errors.antecedentes_quirurgicos}
            </Text>
          ) : null}
          <Text style={styles.layoutFormulario}>Toxicomanías: </Text>
          <TextInput
            placeholder="Ingresa las toxicomanías"
            style={styles.input}
            onChangeText={handleChange('toxicomania')}
            onBlur={handleBlur('toxicomania')}
            value={values.toxicomania}
          />
          {errors.toxicomania ? (
            <Text style={styles.errorMensaje}>{errors.toxicomania}</Text>
          ) : null}
          <Text style={styles.layoutFormulario}>Grupo Sanguineo: </Text>
          <TextInput
            placeholder="Ingresa el grupo sanguineo"
            style={styles.input}
            onChangeText={handleChange('grupo_sanguineo')}
            onBlur={handleBlur('grupo_sanguineo')}
            value={values.grupo_sanguineo}
          />
          {errors.grupo_sanguineo ? (
            <Text style={styles.errorMensaje}>{errors.grupo_sanguineo}</Text>
          ) : null}
          <Text style={styles.layoutFormulario}>Medicamentos en consumo: </Text>
          <TextInput
            placeholder="Ingresa los medicamentos en consumo"
            style={styles.input}
            onChangeText={handleChange('medicamentos_en_consumo')}
            onBlur={handleBlur('medicamentos_en_consumo')}
            value={values.medicamentos_en_consumo}
          />
          {errors.medicamentos_en_consumo ? (
            <Text style={styles.errorMensaje}>
              {errors.medicamentos_en_consumo}
            </Text>
          ) : null}
          {/* Al hacer clic en el botón, se ejecutará la función onSubmit de Formik que enviará los datos al componente principal */}
          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default memo(EvaluacionSecundaria);
