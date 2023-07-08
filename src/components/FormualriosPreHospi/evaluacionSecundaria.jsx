import {Formik, FieldArray} from 'formik';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';
import {object, array} from 'yup';
import {validacionTexto} from './validaciones';
import SignosVitalesComponent from './signosVitalesComponent';

const EvaluacionSecundaria = ({onFormSubmit, closeSection}) => {
  const signosVitalesSchema = object().shape({
    FR: validacionTexto(),
    FC: validacionTexto(),
    TAS: validacionTexto(),
    SA2: validacionTexto(),
    TEMP: validacionTexto(),
    EKG: validacionTexto(),
    GLUC: validacionTexto(),
  });

  const validationSchema = object().shape({
    signosVitales: array().of(signosVitalesSchema),
  });
  return (
    <Formik
      initialValues={{
        exploracion_fisica: '',
        zona_lesiones: '',
        pupilas: '',
        signosVitales: [
          {
            hora: '',
            FR: '',
            FC: '',
            TAS: '',
            SA2: '',
            TEMP: '',
            EKG: '',
            GLUC: '',
          },
        ],
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View>
          <Text style={styles.layoutFormulario}>Exploración Física:</Text>

          <Text style={styles.layoutFormulario}>Zona de Lesiones:</Text>

          <Text style={styles.layoutFormulario}>Pupilas:</Text>

          <Text style={styles.layoutFormulario}>
            Signos Virtuales y Monitoreo:
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
