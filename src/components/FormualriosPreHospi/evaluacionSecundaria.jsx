import {Formik, FieldArray} from 'formik';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';
import {object, array, number} from 'yup';
import {validacionDecimal, validacionNumero, validacionTexto} from '../validaciones';
import SignosVitalesComponent from './signosVitalesComponent';

import RadioButton from './RadioButton';
import ZonaLesiones from './ZonaLesiones';
const radioButtonOptions = [
  {
    id: 1,
    image: require('../../../assets/images/ojos1.png'),
  },
  {
    id: 2,
    image: require('../../../assets/images/ojos2.png'),
  },
  {
    id: 3,
    image: require('../../../assets/images/ojos3.png'),
  },
  {
    id: 4,
    image: require('../../../assets/images/ojos4.png'),
  },
];

const signosVitalesSchema = object().shape({
  frecuencia_respiratoria: validacionNumero(),
  frecuencia_cardiaca: validacionNumero(),
  tas_tad: validacionNumero(),
  sao2: validacionNumero(),
  temperatura: validacionDecimal(),
  mgdl: validacionNumero(),
  ekg: validacionTexto(),
  examen_neurologico: validacionTexto(),
});
const zonasVitalesSchema = object().shape({
  zona: validacionTexto(),
  descripcion: validacionTexto(),
});

const validationSchema = object().shape({
  signosVitales: array().of(signosVitalesSchema),
  exploracion_fisica: array().of(zonasVitalesSchema),
  pupilas: number(),
});
const EvaluacionSecundaria = ({onFormSubmit, closeSection}) => {
  return (
    <Formik
      initialValues={{
        pupilas: '',
        exploracion_fisica: [],
        signosVitales: [],
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({
        setFieldValue,
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
      }) => (
        <View>
          <Text style={styles.layoutFormulario}>(*) Datos opcionales</Text>

          <Text style={styles.textFormSubtitle}>*Zona de Lesiones:</Text>

          <View>
            <FieldArray name="exploracion_fisica">
              {arrayHelpers => (
                <ZonaLesiones
                  exploracion_fisica={values.exploracion_fisica}
                  arrayHelpers={arrayHelpers}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  setFieldValue={setFieldValue}
                />
              )}
            </FieldArray>
          </View>

          <View>
            <Text style={styles.textFormSubtitle}>*Pupilas: </Text>
            <View style={styles.containerRadio}>
              {radioButtonOptions.map(option => (
                <RadioButton
                  key={option.id}
                  id={option.id}
                  image={option.image}
                  isSelected={values.pupilas === option.id}
                  onSelect={id => setFieldValue('pupilas', id)}
                />
              ))}
            </View>
          </View>
          {errors.pupilas && (
            <Text style={{color: 'red'}}>{errors.pupilas}</Text>
          )}

          <Text style={styles.textFormSubtitle}>
            *Signos Vitales y Monitoreo:
          </Text>

          <View>
            <FieldArray name="signosVitales">
              {arrayHelpers => (
                <SignosVitalesComponent
                  signosVitales={values.signosVitales}
                  arrayHelpers={arrayHelpers}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  setFieldValue={setFieldValue}
                />
              )}
            </FieldArray>
          </View>

          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default EvaluacionSecundaria;
