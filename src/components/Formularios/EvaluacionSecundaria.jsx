import {Formik} from 'formik';
import {View, Text, TextInput, TouchableOpacity, Button} from 'react-native';
import React, {memo} from 'react';
import {styles} from '../styles/styles';

const EvaluacionSecundaria = ({onFormSubmit, closeSection}) => {
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
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View>
          <Text style={styles.layoutFormulario}>Alergias: </Text>
          <TextInput
            placeholder="Ingresa las alergias"
            style={styles.input}
            onChangeText={handleChange('alergias')}
            onBlur={handleBlur('alergias')}
            value={values.alergias}
          />

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

          <Text style={styles.layoutFormulario}>Toxicomanías: </Text>
          <TextInput
            placeholder="Ingresa las toxicomanías"
            style={styles.input}
            onChangeText={handleChange('toxicomania')}
            onBlur={handleBlur('toxicomania')}
            value={values.toxicomania}
          />

          <Text style={styles.layoutFormulario}>Grupo Sanguineo: </Text>
          <TextInput
            placeholder="Ingresa el grupo sanguineo"
            style={styles.input}
            onChangeText={handleChange('grupo_sanguineo')}
            onBlur={handleBlur('grupo_sanguineo')}
            value={values.grupo_sanguineo}
          />

          <Text style={styles.layoutFormulario}>Medicamentos en consumo: </Text>
          <TextInput
            placeholder="Ingresa los medicamentos en consumo"
            style={styles.input}
            onChangeText={handleChange('medicamentos_en_consumo')}
            onBlur={handleBlur('medicamentos_en_consumo')}
            value={values.medicamentos_en_consumo}
          />

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
