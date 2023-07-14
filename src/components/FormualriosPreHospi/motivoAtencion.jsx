import {Formik} from 'formik';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {styles} from '../styles/styles';
import {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import Ginecobsterico from './ginecobsterico';
import Enfermedad from './enfermedad';
import {object} from 'yup';
import {
  validacionTexto,
  validacionNumero,
  validacionObligatoria,
  validacionTelefono,
} from './validaciones';

const motivoAtencion = [
  {label: 'Enfermedad', value: 'Enfermedad'},
  {label: 'Traumatismo', value: 'Traumatismo'},
  {label: 'Ginecobstétrico', value: 'Ginecobstetrico'},
];
const agenteCasualTraumatico = [
  {label: 'Arma', value: 'Arma'},
  {label: 'Juguete', value: 'Juguete'},
  {label: 'Automotor', value: 'Automotor'},
  {label: 'Bicicleta', value: 'Bicicleta'},
  {label: 'Producto biológico', value: 'Producto biológico'},
  {label: 'Maquinaria', value: 'Maquinaria'},
  {label: 'Herramienta', value: 'Herramienta'},
  {label: 'Fuego', value: 'Fuego'},
  {label: 'Sustancia Caliente', value: 'Sustancia Caliente'},
  {label: 'Sustancia Tóxica', value: 'Sustancia Tóxica'},
  {label: 'Electricidad', value: 'Electricidad'},
  {label: 'Explosión', value: 'Explosión'},
  {label: 'Ser Humano', value: 'Ser Humano'},
  {label: 'Animal', value: 'Animal'},
];
const getInitialValues = selectedOption => {
  if (selectedOption === 'Ginecobstetrico') {
    return {
      gesta: '',
      cesarias: '',
      para: '',
      partos: '',
      abortos: '',
      semanas_de_gestacion: '',
      fecha_probable: '',
      membranas: '',
      hora_inicio_contracciones: '',
      gine_frecuencia: '',
      duracion: '',
      hora_nacimiento: '',
      lugar: '',
      placenta_expulsada: '',
      producto: '',
      sexo: '',
      apgar_1: '',
      apgar_2: '',
      apgar_3: '',
      silvermann_1: '',
      silvermann_2: '',
      observaciones: '',
    };
  } else if (selectedOption === 'Traumatismo') {
    return {
      agente_casual_traumatico: '',
      especifique: '',
    };
  } else if (selectedOption === 'Enfermedad') {
    return {
      catalogo_origen_probable_clinico_id: '',
      especifique: '',
      primera_vez: '',
      subsecuente: '',
    };
  }
  return {};
};

const validationSchema = selectedOption => {
  let schema;

  if (selectedOption === 'Ginecobstetrico') {
    schema = object().shape({
      gesta: validacionTexto(),
      cesarias: validacionTexto(),
      para: validacionTexto(),
      partos: validacionTexto(),
      abortos: validacionTexto(),
      semanas_de_gestacion: validacionTexto(),
      membranas: validacionTexto(),
      gine_frecuencia: validacionTexto(),
      duracion: validacionTexto(),
      lugar: validacionTexto(),
      placenta_expulsada: validacionTexto(),
      producto: validacionTexto(),
      sexo: validacionNumero(),
      apgar_1: validacionTexto(),
      apgar_2: validacionTexto(),
      apgar_3: validacionTexto(),
      silvermann_1: validacionTexto(),
      silvermann_2: validacionTexto(),
      observaciones: validacionTexto(),
    });
  } else if (selectedOption === 'Enfermedad') {
    schema = object().shape({
      agente_casual_traumatico: validacionTexto(),
    });
  } else if (selectedOption === 'Traumatismo') {
    schema = object().shape({
      catalogo_origen_probable_clinico_id: validacionTexto(),
      primera_vez: validacionTexto(),
      subsecuente: validacionTexto(),
    });
  } else {
    schema = object().shape({});
  }

  return schema;
};

const MotivoAtencion = ({onFormSubmit, closeSection}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [valoresIniciales, setValoresIniciales] = useState({motivo: ''});
  const [esquemaValidacion, setEsquemaValidacion] = useState(null);

  console.log(valoresIniciales);

  const [isFocus, setIsFocus] = useState(false);

  return (
    <Formik
      initialValues={valoresIniciales}
      validationSchema={esquemaValidacion}
      onSubmit={values => {
        onFormSubmit(values);
        closeSection();
      }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        setFieldValue,
        errors,
        touched,
      }) => (
        <View>
          <Text style={styles.layoutFormulario}>Motivo de atención:</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={motivoAtencion}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Selecciona' : '...'}
            searchPlaceholder="Busca..."
            value={values.motivo}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              values.motivo = item.value;
              setIsFocus(false);
              setSelectedOption(item.value);
              setValoresIniciales(getInitialValues(item.value));
              setEsquemaValidacion(validationSchema(item.value));
            }}
          />

          {selectedOption === 'Traumatismo' && (
            <View>
              <Text style={styles.layoutFormulario}>
                Agente Casual Traumático
              </Text>
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={agenteCasualTraumatico}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Agente Casual Traumático' : '...'}
                searchPlaceholder="Busca..."
                value={values.agente_casual_traumatico}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  values.agente_casual_traumatico = item.value;
                  setIsFocus(false);
                }}
              />
              {errors.agente_casual_traumatico ? (
                <Text style={{color: 'red'}}>
                  {errors.agente_casual_traumatico}
                </Text>
              ) : null}
              
              <Text style={styles.layoutFormulario}>Especifique:</Text>
              <TextInput
                placeholder="Ingresa el texto"
                style={styles.input}
                onChangeText={handleChange('especifique')}
                onBlur={handleBlur('especifique')}
                value={values.especifique}
              />
              {errors.especifique ? (
                <Text style={{color: 'red'}}>{errors.especifique}</Text>
              ) : null}
            </View>
          )}
          {selectedOption === 'Enfermedad' && (
            <Enfermedad
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
              errors={errors}
            />
          )}
          {selectedOption === 'Ginecobstetrico' && (
            <Ginecobsterico
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
              errors={errors}
            />
          )}
          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default MotivoAtencion;
