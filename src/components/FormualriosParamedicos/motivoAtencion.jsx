import {Formik} from 'formik';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {styles} from '../styles/styles';
import {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import Ginecobsterico from './ginecobsterico';
import Enfermedad from './enfermedad';
import {object} from 'yup';
import {validacionTexto, validacionNumero} from '../validaciones';

const motivoAtencion = [
  {label: 'Enfermedad', value: 'E'},
  {label: 'Traumatismo', value: 'T'},
  {label: 'Ginecobstétrico', value: 'G'},
];
const agenteCasualTraumatico = [
  {label: 'Arma', value: 1},
  {label: 'Juguete', value: 2},
  {label: 'Automotor', value: 3},
  {label: 'Bicicleta', value: 4},
  {label: 'Producto biológico', value: 5},
  {label: 'Maquinaria', value: 6},
  {label: 'Herramienta', value: 7},
  {label: 'Fuego', value: 8},
  {label: 'Sustancia Caliente', value: 9},
  {label: 'Sustancia Tóxica', value: 10},
  {label: 'Electricidad', value: 11},
  {label: 'Explosión', value: 12},
  {label: 'Ser Humano', value: 13},
  {label: 'Animal', value: 14},
  {label: 'Otro', value: 15},
];
const getInitialValues = selectedOption => {
  if (selectedOption === 'Ginecobstetrico') {
    return {
      motivo: 'G',
      gesta: '',
      cesareas: '',
      partos: '',
      abortos: '',
      semanas_de_gestacion: '',
      fecha_probable: '',
      membranas: '',
      hora_inicio_contracciones: '',
      frecuencia: '',
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
    };
  } else if (selectedOption === 'Traumatismo') {
    return {
      motivo: 'T',
      catalogo_agente_casual_traumatico_id: '',
      especifique: '',
    };
  } else if (selectedOption === 'Enfermedad') {
    return {
      motivo: 'E',
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

  if (selectedOption === 'G') {
    schema = object().shape({
      gesta: validacionNumero(),
      cesareas: validacionNumero(),
      partos: validacionNumero(),
      abortos: validacionNumero(),
      semanas_de_gestacion: validacionNumero(),
      fecha_probable: validacionTexto(),
      membranas: validacionNumero(),
      hora_inicio_contracciones: validacionTexto(),
      frecuencia: validacionNumero(),
      duracion: validacionNumero(),
      hora_nacimiento: validacionTexto(),
      lugar: validacionTexto(),
      placenta_expulsada: validacionNumero(),
      producto: validacionNumero(),
      sexo: validacionNumero(),
      apgar_1: validacionNumero(),
      apgar_2: validacionNumero(),
      apgar_3: validacionNumero(),
      silvermann_1: validacionNumero(),
      silvermann_2: validacionNumero(),
    });
  } else if (selectedOption === 'E') {
    schema = object().shape({
      catalogo_origen_probable_clinico_id: validacionNumero(),
      especifique: validacionTexto(),
      primera_vez: validacionNumero(),
      subsecuente: validacionNumero(),
    });
  } else if (selectedOption === 'T') {
    schema = object().shape({
      catalogo_agente_casual_traumatico_id: validacionNumero(),
      especifique: validacionTexto(),
    });
  } else {
    schema = object().shape({});
  }

  return schema;
};

const MotivoAtencion = ({onFormSubmit, closeSection, setSelectedMotivo}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [valoresIniciales, setValoresIniciales] = useState({motivo: ''});
  const [esquemaValidacion, setEsquemaValidacion] = useState(null);

  const [isFocus, setIsFocus] = useState(false);

  return (
    <Formik
      initialValues={valoresIniciales}
      validationSchema={esquemaValidacion}
      onSubmit={values => {
        setSelectedMotivo(selectedOption)
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

          {selectedOption === 'T' && (
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
                value={values.catalogo_agente_casual_traumatico_id}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  values.catalogo_agente_casual_traumatico_id = item.value;
                  setIsFocus(false);
                }}
              />
              {errors.catalogo_agente_casual_traumatico_id ? (
                <Text style={styles.errorMensaje}>
                  {errors.catalogo_agente_casual_traumatico_id}
                </Text>
              ) : null}

              <Text style={styles.layoutFormulario}>Especifique:</Text>
              <TextInput
                placeholder="Ingresa la especificación"
                style={styles.input}
                onChangeText={handleChange('especifique')}
                onBlur={handleBlur('especifique')}
                value={values.especifique}
              />
              {errors.especifique ? (
                <Text style={styles.errorMensaje}>{errors.especifique}</Text>
              ) : null}
            </View>
          )}
          {selectedOption === 'E' && (
            <Enfermedad
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
              errors={errors}
            />
          )}
          {selectedOption === 'G' && (
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
