import {Formik} from 'formik';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';
import {useState} from 'react';
import RadioGroup from 'react-native-radio-buttons-group';
import {Dropdown} from 'react-native-element-dropdown';
import {object} from 'yup';
import {
  validacionTexto,
  validacionNumero,
  validacionObligatoria,
  validacionTelefono,
  validacionTextoNR,
  validacionNumeroNR,
  validacionTelefonoNR,
} from '../validaciones';

const SEXO_PACIENTE = [
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
];

const catalogoEstados = [
  {label: 'Aguascalientes', value: 1},
  {label: 'Baja California', value: 2},
  {label: 'Baja California Sur', value: 3},
  {label: 'Campeche', value: 4},
  {label: 'Coahuila', value: 5},
  {label: 'Colima', value: 6},
  {label: 'Chiapas', value: 7},
  {label: 'Chihuahua', value: 8},
  {label: 'Ciudad de México', value: 9},
  {label: 'Durango', value: 10},
  {label: 'Estado de México', value: 11},
  {label: 'Guanajuato', value: 12},
  {label: 'Guerrero', value: 13},
  {label: 'Hidalgo', value: 14},
  {label: 'Jalisco', value: 15},
  {label: 'Michoacán', value: 16},
  {label: 'Morelos', value: 17},
  {label: 'Nayarit', value: 18},
  {label: 'Nuevo León', value: 19},
  {label: 'Oaxaca', value: 20},
  {label: 'Puebla', value: 21},
  {label: 'Querétaro', value: 22},
  {label: 'Quintana Roo', value: 23},
  {label: 'San Luis', value: 24},
  {label: 'Sinaloa', value: 25},
  {label: 'Sonora', value: 26},
  {label: 'Tabasco', value: 27},
  {label: 'Tamaulipas', value: 28},
  {label: 'Tlaxcala', value: 29},
  {label: 'Veracruz', value: 30},
  {label: 'Yucatán', value: 31},
  {label: 'Zacatecas', value: 32},
];

const validationSchema = selectedOption => {
  let schema

  if (selectedOption) {
    schema = object().shape({
      paciente_nombre: validacionTexto(),
      paciente_sexo: validacionObligatoria(),
      paciente_edad: validacionNumero(),
      paciente_calle: validacionTexto(),
      paciente_interior: validacionTexto(),
      paciente_colonia: validacionTexto(),
      paciente_alcaldia: validacionTexto (),
      paciente_estado_id: validacionNumero(),
      paciente_contacto: validacionTelefono(),
      compania_sgm: validacionTexto(),
    });
    
    return schema
  }
  
  schema = object().shape({
    paciente_nombre: validacionTexto(),
    paciente_sexo: validacionObligatoria(),
    paciente_edad: validacionNumero(),
  });

  return schema
} 

const DatosPaciente = ({onFormSubmit, closeSection, setIsConsciente}) => {
  const [selectedSexo, setSelectedSexo] = useState(SEXO_PACIENTE);
  const [isFocus, setIsFocus] = useState(false);
  const [esquemaValidacion, setEsquemaValidacion] = useState(null);
  
  const [selectedOption, setSelectedOption] = useState(false)

  return (
    <Formik
      initialValues={{
        paciente_nombre: '',
        paciente_sexo: '',
        paciente_edad: '',
        paciente_calle: '',
        paciente_interior: '',
        paciente_colonia: '',
        paciente_alcaldia: '',
        paciente_estado_id: '',
        paciente_contacto: '',
        compania_sgm: '',
      }}
      validationSchema={esquemaValidacion}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View>
          <Text style={styles.layoutFormulario}>Nombre o media filiación:</Text>
          <TextInput
            placeholder="Ingresa el nombre/media filiación"
            style={styles.input}
            onChangeText={handleChange('paciente_nombre')}
            onBlur={handleBlur('paciente_nombre')}
            value={values.paciente_nombre}
          />
          {touched.paciente_nombre && errors.paciente_nombre ? (
            <Text style={styles.errorMensaje}>{errors.paciente_nombre}</Text>
          ) : null}

          <View style={{}}>
            <Text style={styles.layoutFormulario}>Sexo: </Text>
            <RadioGroup
              radioButtons={selectedSexo}
              containerStyle={styles.radioGroup}
              onPress={newSelectedSexo => {
                setSelectedSexo(newSelectedSexo);
                const selectedButton = newSelectedSexo.find(rb => rb.selected);
                if (selectedButton) {
                  values.paciente_sexo = selectedButton.id === 1 ? 0 : 1;
                }
              }}
            />
          </View>
          {touched.paciente_sexo && errors.paciente_sexo ? (
            <Text style={styles.errorMensaje}>{errors.paciente_sexo}</Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Edad:</Text>
          <TextInput
            placeholder="Ingresa la edad"
            style={styles.input}
            onChangeText={handleChange('paciente_edad')}
            onBlur={handleBlur('paciente_edad')}
            value={values.paciente_edad}
            keyboardType="numeric"
          />
          {touched.paciente_edad && errors.paciente_edad ? (
            <Text style={styles.errorMensaje}>{errors.paciente_edad}</Text>
          ) : null}

          <Text style={styles.layoutFormulario}>¿Está consciente el paciente?</Text>
          <Dropdown
            autoScroll={false}
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={[{label: 'Sí', value: true}, {label: 'No', value: false}]}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Selecciona' : '...'}
            searchPlaceholder="Busca..."
            value={selectedOption}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setIsFocus(false);
              setSelectedOption(item.value);
              setIsConsciente(item.value);
              setEsquemaValidacion(validationSchema(item.value));
            }}
          />

          {selectedOption && (
            <>
              <Text style={styles.layoutFormulario}>Domicilio:</Text>
              <TextInput
                placeholder="Ingresa el domicilio"
                style={styles.input}
                onChangeText={handleChange('paciente_calle')}
                onBlur={handleBlur('paciente_calle')}
                value={values.paciente_calle}
              />
              {touched.paciente_calle && errors.paciente_calle ? (
                <Text style={styles.errorMensaje}>{errors.paciente_calle}</Text>
              ) : null}
    
              <Text style={styles.layoutFormulario}>Interior:</Text>
              <TextInput
                placeholder="Ingresa el interior"
                style={styles.input}
                onChangeText={handleChange('paciente_interior')}
                onBlur={handleBlur('paciente_interior')}
                value={values.paciente_interior}
              />
              {touched.paciente_interior && errors.paciente_interior ? (
                <Text style={styles.errorMensaje}>{errors.paciente_interior}</Text>
              ) : null}
    
              <Text style={styles.layoutFormulario}>Colonia/Comunidad:</Text>
              <TextInput
                placeholder="Ingresa la colonia o comunidad"
                style={styles.input}
                onChangeText={handleChange('paciente_colonia')}
                onBlur={handleBlur('paciente_colonia')}
                value={values.paciente_colonia}
              />
              {touched.paciente_colonia && errors.paciente_colonia ? (
                <Text style={styles.errorMensaje}>{errors.paciente_colonia}</Text>
              ) : null}
    
              <Text style={styles.layoutFormulario}>Alcaldía:</Text>
              <TextInput
                placeholder="Ingresa la alcaldía"
                style={styles.input}
                onChangeText={handleChange('paciente_alcaldia')}
                onBlur={handleBlur('paciente_alcaldia')}
                value={values.paciente_alcaldia}
              />
              {touched.paciente_alcaldia && errors.paciente_alcaldia ? (
                <Text style={styles.errorMensaje}>{errors.paciente_alcaldia}</Text>
              ) : null}
    
              <Text style={styles.layoutFormulario}>Estado:</Text>
              <Dropdown
                autoScroll={false}
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={catalogoEstados}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Estado' : '...'}
                searchPlaceholder="Busca..."
                value={values.paciente_estado_id}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  values.paciente_estado_id = item.value;
                  setIsFocus(false);
                }}
              />
    
              {errors.paciente_estado_id ? (
                <Text style={styles.errorMensaje}>{errors.paciente_estado_id}</Text>
              ) : null}
    
              <Text style={styles.layoutFormulario}>Contacto:</Text>
              <TextInput
                placeholder="Ingresa el teléfono"
                style={styles.input}
                keyboardType="phone-pad"
                onChangeText={handleChange('paciente_contacto')}
                onBlur={handleBlur('paciente_contacto')}
                value={values.paciente_contacto}
              />
              {touched.paciente_contacto && errors.paciente_contacto ? (
                <Text style={styles.errorMensaje}>{errors.paciente_contacto}</Text>
              ) : null}
    
              <Text style={styles.layoutFormulario}>
                Compañia de seguros / Derechohabiente:
              </Text>
              <TextInput
                placeholder="Ingresa la compañía de seguros/derechohabiente"
                style={styles.input}
                onChangeText={handleChange('compania_sgm')}
                onBlur={handleBlur('compania_sgm')}
                value={values.compania_sgm}
              />
              {touched.compania_sgm && errors.compania_sgm ? (
                <Text style={styles.errorMensaje}>{errors.compania_sgm}</Text>
              ) : null}
            </>
          )}


          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default DatosPaciente;
