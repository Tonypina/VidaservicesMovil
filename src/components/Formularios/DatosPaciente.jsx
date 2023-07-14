import {Formik} from 'formik';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import React, {useState, memo} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {styles} from '../styles/styles';
import {
  validacionTexto,
  validacionNumero,
  validacionTelefono,
} from '../validaciones';
import {object} from 'yup';

const estadosCiviles = [
  {label: 'Soltero', value: 'Soltero'},
  {label: 'Casado', value: 'Casado'},
  {label: 'Divorciado', value: 'Divorciado'},
  {label: 'Viudo', value: 'Viudo'},
  {label: 'Unión libre', value: 'Unión libre'},
  {label: 'N/A', value: 'N/A'},
  // Agrega más estados civiles aquí según sea necesario
];

const nacionalidades = [
  {label: 'Mexicano', value: 'Mexicano'},
  {label: 'Estadounidense', value: 'Estadounidense'},
  {label: 'Español', value: 'Español'},
  {label: 'Frances', value: 'Frances'},
  {label: 'Ingles', value: 'Ingles'},
  {label: 'Italiano', value: 'Italiano'},
  {label: 'Guatemalteco', value: 'Guatemalteco'},
  {label: 'Salvadoreño', value: 'Salvadoreño'},
  {label: 'Hondureño', value: 'Hondureño'},
  {label: 'Colombiano', value: 'Colombiano'},
  {label: 'Venezolano', value: 'Venezolano'},
  {label: 'Argentino', value: 'Argentino'},
  {label: 'Cubano', value: 'Cubano'},
  {label: 'Chileno', value: 'Cubano'},
  {label: 'Peruano', value: 'Cubano'},
  {label: 'N/A', value: 'N/A'},
  // Agrega más nacionalidades aquí según sea necesario
];

const DatosPaciente = ({onFormSubmit, closeSection}) => {
  const [sexoPaciente, setSexoPaciente] = useState([
    {
      id: 1,
      label: 'Masculino',
      value: 'masculino',
    },
    {
      id: 2,
      label: 'Femenino',
      value: 'femenino',
    },
  ]);
  const [isFocus, setIsFocus] = useState(false);
  const [estadoCivil, setEstadoCivil] = useState(null);

  const validationSchema = object().shape({
    paciente_nombre: validacionTexto(),
    paciente_edad: validacionNumero(),
    paciente_sexo: validacionNumero(),
    paciente_nacionalidad: validacionTexto(),
    paciente_estado_civil: validacionTexto(),
    paciente_contacto: validacionTelefono(),
    paciente_ocupacion: validacionTexto(),
  });

  return (
    <Formik
      initialValues={{
        paciente_nombre: '',
        paciente_edad: '',
        paciente_sexo: '',
        paciente_nacionalidad: '',
        paciente_estado_civil: '',
        paciente_contacto: '',
        paciente_ocupacion: '',
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View>
          <Text style={styles.layoutFormulario}>Nombre: </Text>
          <TextInput
            placeholder="Ingresa el nombre del paciente"
            style={styles.input}
            onChangeText={handleChange('paciente_nombre')}
            onBlur={handleBlur('paciente_nombre')}
            value={values.paciente_nombre}
          />
          {errors.paciente_nombre ? (
            <Text style={styles.errorMensaje}>{errors.paciente_nombre}</Text>
          ) : null}
          <Text style={styles.layoutFormulario}>Edad: </Text>
          <TextInput
            placeholder="Ingresa la edad del paciente"
            style={styles.input}
            keyboardType="numeric"
            onChangeText={handleChange('paciente_edad')}
            onBlur={handleBlur('paciente_edad')}
            value={values.paciente_edad}
          />
          {errors.paciente_edad ? (
            <Text style={styles.errorMensaje}>{errors.paciente_edad}</Text>
          ) : null}
          <View style={{}}>
            <Text style={styles.layoutFormulario}>Sexo: </Text>
            <RadioGroup
              radioButtons={sexoPaciente}
              containerStyle={styles.radioGroup}
              onPress={sexoPaciente => {
                setSexoPaciente(sexoPaciente);

                Object.keys(sexoPaciente).forEach(key => {
                  if (sexoPaciente[key].selected) {
                    if (sexoPaciente[key].id === 1) {
                      values.paciente_sexo = 0;
                    } else {
                      values.paciente_sexo = 1;
                    }
                  }
                });
              }}
            />
          </View>
          {errors.paciente_sexo ? (
            <Text style={styles.errorMensaje}>{errors.paciente_sexo}</Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Nacionalidad: </Text>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={nacionalidades}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Nacionalidad' : '...'}
            searchPlaceholder="Busca..."
            value={values.paciente_nacionalidad}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              values.paciente_nacionalidad = item.value;
              setIsFocus(false);
            }}
          />
          {errors.paciente_nacionalidad ? (
            <Text style={styles.errorMensaje}>
              {errors.paciente_nacionalidad}
            </Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Estado civil: </Text>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={estadosCiviles}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Estado Civil' : '...'}
            searchPlaceholder="Busca..."
            value={values.paciente_estado_civil}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              values.paciente_estado_civil = item.value;
              setIsFocus(false);
            }}
          />
          {errors.paciente_estado_civil ? (
            <Text style={styles.errorMensaje}>
              {errors.paciente_estado_civil}
            </Text>
          ) : null}
          <Text style={styles.layoutFormulario}>Telefono: </Text>
          <TextInput
            placeholder="Ingresa el telefono del paciente"
            style={styles.input}
            keyboardType="phone-pad"
            onChangeText={handleChange('paciente_contacto')}
            onBlur={handleBlur('paciente_contacto')}
            value={values.paciente_contacto}
          />
          {errors.paciente_contacto ? (
            <Text style={styles.errorMensaje}>{errors.paciente_contacto}</Text>
          ) : null}
          <Text style={styles.layoutFormulario}>Ocupación: </Text>
          <TextInput
            placeholder="Ingresa la ocupación del paciente"
            style={styles.input}
            onChangeText={handleChange('paciente_ocupacion')}
            onBlur={handleBlur('paciente_ocupacion')}
            value={values.paciente_ocupacion}
          />
          {errors.paciente_ocupacion ? (
            <Text style={styles.errorMensaje}>{errors.paciente_ocupacion}</Text>
          ) : null}
          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default memo(DatosPaciente);
