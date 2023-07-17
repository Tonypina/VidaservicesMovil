import {Formik, FieldArray} from 'formik';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles} from '../styles/styles';
import {object, array} from 'yup';
import {validacionTexto} from '../validaciones';
import SignosVitalesComponent from './signosVitalesComponent';
import {useState} from 'react';
import * as Yup from 'yup';

const RadioButton = ({id, image, isSelected, onSelect}) => {
  return (
    <View style={styles.radioButtonContainer}>
      <TouchableOpacity
        style={[styles.circle, isSelected ? styles.circleSelected : {}]}
        onPress={() => onSelect(id)}>
        {isSelected && <View style={styles.innerCircle} />}
      </TouchableOpacity>
      <Image source={image} style={styles.image} resizeMode="contain" />
    </View>
  );
};

const EvaluacionSecundaria = ({onFormSubmit, closeSection}) => {
  const [selectedId, setSelectedId] = useState(null);

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
    pupilas: Yup.number().required('Por favor, selecciona una opción.'),
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
      {({
        setFieldValue,
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
      }) => (
        <View>
          <Text style={styles.layoutFormulario}>Exploración Física:</Text>

          <Text style={styles.layoutFormulario}>Zona de Lesiones:</Text>

          <View>
            <Text style={styles.layoutFormulario}>Pupilas: </Text>
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
