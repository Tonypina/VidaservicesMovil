import CustomDropdown from './customDropdown';
import {Formik, FieldArray} from 'formik';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {useState} from 'react';
import {styles} from '../styles/styles';
import {object, array, number} from 'yup';
import {validacionDecimal, validacionNumero, validacionTexto, validacionTextoNR} from '../validaciones';
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
  {
    id: 5,
    image: require('../../../assets/images/ojos5.png'),
  },
];

const catalogo_condicion_paciente_id = ['Critico', 'No Critico', 'Inestable', 'Estable'];
const catalogo_clasificacion_id = ['Roja', 'Amarilla', 'Verde', 'Negra'];

const dropdownConfigurations = [
  {
    label: 'Condiciones del Paciente',
    data: catalogo_condicion_paciente_id.map((condition, index) => ({
      label: condition,
      value: index + 1,
    })),
    fieldKey: 'catalogo_condicion_paciente_id',
  },
  {
    label: 'Prioridad',
    data: catalogo_clasificacion_id.map((priority, index) => ({
      label: priority,
      value: index + 1,
    })),
    fieldKey: 'catalogo_clasificacion_id',
  },
];

const signosVitalesSchema = object().shape({
  hora_basal: validacionTexto(),
  frecuencia_respiratoria: validacionNumero(),
  frecuencia_cardiaca: validacionNumero(),
  TAS: validacionNumero(),
  TAD: validacionNumero(),
  sao2: validacionNumero(),
  temperatura: validacionDecimal(),
  mgdl: validacionNumero(),
});
const zonasVitalesSchema = object().shape({
  zona: validacionTexto(),
  descripcion: validacionTexto(),
});

const validationSchema = object().shape({
  signosVitales: array().of(signosVitalesSchema),
  exploracion_fisica: array().of(zonasVitalesSchema),
  pupilas: validacionNumero(),
  trauma_score: validacionTexto(),
  glasgow: validacionTexto(),
  alergias: validacionTextoNR(),
  medicamentos_en_consumo: validacionTextoNR(),
  antecedentes_quirurgicos: validacionTextoNR(),
  ultima_ingesta: validacionTextoNR(),
  catalogo_clasificacion_id: validacionNumero(),
  catalogo_condicion_paciente_id: validacionNumero(),
});
const EvaluacionSecundaria = ({onFormSubmit, closeSection, selectedMotivo, isConsciente}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Formik
      initialValues={{
        pupilas: '',
        exploracion_fisica: [],
        signosVitales: [],
        trauma_score: '',
        glasgow: '',
        alergias: '',
        medicamentos_en_consumo: '',
        antecedentes_quirurgicos: '',
        ultima_ingesta: '',
        catalogo_condicion_paciente_id: '',
        catalogo_clasificacion_id: '',
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

          {selectedMotivo === "T" && (
            <>
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
            </>
          )}


          <View>
            <Text style={styles.textFormSubtitle}>Pupilas: </Text>
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

          <Text style={styles.layoutFormulario}>Trauma Score:</Text>
          <TextInput
            placeholder="Ingresa Trauma Score"
            keyboardType="numeric"
            style={styles.input}
            onChangeText={handleChange('trauma_score')}
            onBlur={handleBlur('trauma_score')}
            value={values.trauma_score}
          />
          {errors.trauma_score ? (
            <Text style={styles.errorMensaje}>{errors.trauma_score}</Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Glasgow:</Text>
          <TextInput
            placeholder="Ingresa Glasgow"
            keyboardType="numeric"
            style={styles.input}
            onChangeText={handleChange('glasgow')}
            onBlur={handleBlur('glasgow')}
            value={values.glasgow}
          />
          {errors.glasgow ? (
            <Text style={styles.errorMensaje}>{errors.glasgow}</Text>
          ) : null}

          {values.catalogo_nivel_de_conciencia_id === 1 || values.catalogo_pulsos_id !== 3 && (
            <>
              <Text style={styles.textFormSubtitle}>Interrogatorio</Text>

              {isConsciente && (
                <>
                  <Text style={styles.layoutFormulario}>Alergias:</Text>
                  <TextInput
                    placeholder="Ingresa alergias"
                    style={styles.input}
                    onChangeText={handleChange('alergias')}
                    onBlur={handleBlur('alergias')}
                    value={values.alergias}
                  />
                  {errors.alergias ? (
                    <Text style={styles.errorMensaje}>{errors.alergias}</Text>
                  ) : null}
        
                  <Text style={styles.layoutFormulario}>Medicamentos:</Text>
                  <TextInput
                    placeholder="Ingresa Medicamentos"
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
        
                  <Text style={styles.layoutFormulario}>Antecedentes Personales:</Text>
                  <TextInput
                    placeholder="Ingresa Antecedentes Personales"
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
        
                  <Text style={styles.layoutFormulario}>Ultima Ingesta:</Text>
                  <TextInput
                    placeholder="Ingresa Ultima Ingesta"
                    style={styles.input}
                    onChangeText={handleChange('ultima_ingesta')}
                    onBlur={handleBlur('ultima_ingesta')}
                    value={values.ultima_ingesta}
                  />
                  {errors.ultima_ingesta ? (
                    <Text style={styles.errorMensaje}>{errors.ultima_ingesta}</Text>
                  ) : null}
                </>
              )}
            </>
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

          {dropdownConfigurations.map(config => (
            <CustomDropdown
              key={config.fieldKey}
              label={config.label}
              data={config.data}
              setFieldValue={setFieldValue}
              fieldKey={config.fieldKey}
              field={values[config.fieldKey]}
              isFocus={isFocus}
              setIsFocus={setIsFocus}
              errors={errors}
            />
          ))}

          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default EvaluacionSecundaria;
