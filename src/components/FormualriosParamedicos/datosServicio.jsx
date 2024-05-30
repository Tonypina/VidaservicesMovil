import {Formik} from 'formik';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';
import {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {object} from 'yup';
import {validacionTexto, validacionNumero} from '../validaciones';

const lugarOcurrencia = [
  {label: 'Hogar', value: 1},
  {label: 'Vía Publica', value: 2},
  {label: 'Trabajo', value: 3},
  {label: 'Escuela', value: 4},
  {label: 'Recreación', value: 5},
  {label: 'Transporte Público', value: 6},
  {label: 'Otra', value: 7},
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

const catalogoAseguradoras = [
  {label: 'Apoyo a Comunidad', value: 1},
  {label: 'AXA Assistance', value: 2},
  {label: 'Banorte', value: 3},
  {label: 'BBVA', value: 4},
  {label: 'Colaborador VA', value: 5},
  {label: 'Más Servicios', value: 6},
  {label: 'Membresía VA', value: 7},
  {label: 'Nacional Monte de Piedad', value: 8},
  {label: 'Público General ($)', value: 9},
  {label: 'Qualitas', value: 10},
  {label: 'Salud Interactiva', value: 11},
  {label: 'Sura', value: 12},
];

const validationSchema = object().shape({
  folio: validacionNumero(),
  folio_alterno: validacionNumero(),
  evento_calle: validacionTexto(),
  evento_colonia: validacionTexto(),
  evento_alcaldia: validacionTexto(),
  evento_estado_id: validacionNumero(),
  catalogo_aseguradora_id: validacionNumero(),
  catalogo_lugar_id: validacionNumero(),
  siniestro: validacionTexto(),
});

const DatosServicio = ({user, onFormSubmit, closeSection}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Formik
      initialValues={{
        folio: '',
        folio_alterno: '',
        evento_calle: '',
        evento_colonia: '',
        evento_alcaldia: '',
        evento_estado_id: '',
        catalogo_aseguradora_id: '',
        catalogo_lugar_id: '',
        siniestro: '',
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <View>
          <Text style={styles.layoutFormulario}>Folio: </Text>
          <View style={styles.inputContainer}>
            {user === 'P' && <Text style={styles.prefix}>E -</Text>}
            {user === 'A' && <Text style={styles.prefix}>VA -</Text>}
            {user === 'R' && <Text style={styles.prefix}>E -</Text>}
            <TextInput
              placeholder="Ingresa el folio"
              inputMode="numeric"
              keyboardType="numeric"
              onChangeText={handleChange('folio')}
              onBlur={handleBlur('folio')}
              value={values.folio}
            />
          </View>
          {touched.folio && errors.folio ? (
            <Text style={{paddingTop: 9, color: 'red'}}>{errors.folio}</Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Folio alterno: </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.prefix}>VA -</Text>
            <TextInput
              placeholder="Ingresa el folio alterno"
              inputMode="numeric"
              keyboardType="numeric"
              onChangeText={handleChange('folio_alterno')}
              onBlur={handleBlur('folio_alterno')}
              value={values.folio_alterno}
            />
          </View>
          {touched.folio_alterno && errors.folio_alterno ? (
            <Text style={{paddingTop: 9, color: 'red'}}>
              {errors.folio_alterno}
            </Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Calle y número:</Text>
          <TextInput
            placeholder="Ingresa el nombre de la calle"
            style={styles.input}
            onChangeText={handleChange('evento_calle')}
            onBlur={handleBlur('evento_calle')}
            value={values.evento_calle}
          />
          {touched.evento_calle && errors.evento_calle ? (
            <Text style={styles.errorMensaje}>{errors.evento_calle}</Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Colonia / Comunidad:</Text>
          <TextInput
            placeholder="Ingresa el nombre de la calle"
            style={styles.input}
            onChangeText={handleChange('evento_colonia')}
            onBlur={handleBlur('evento_colonia')}
            value={values.evento_colonia}
          />
          {touched.evento_colonia && errors.evento_colonia ? (
            <Text style={styles.errorMensaje}>{errors.evento_colonia}</Text>
          ) : null}
          <Text style={styles.layoutFormulario}>
            Alcaldía Política / Municipio:
          </Text>
          <TextInput
            placeholder="Ingresa el nombre de la calle"
            style={styles.input}
            onChangeText={handleChange('evento_alcaldia')}
            onBlur={handleBlur('evento_alcaldia')}
            value={values.evento_alcaldia}
          />
          {touched.evento_alcaldia && errors.evento_alcaldia ? (
            <Text style={styles.errorMensaje}>{errors.evento_alcaldia}</Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Estado:</Text>
          <Dropdown
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
            value={values.evento_estado_id}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              values.evento_estado_id = item.value;
              setIsFocus(false);
            }}
          />

          {errors.evento_estado_id ? (
            <Text style={styles.errorMensaje}>{errors.evento_estado_id}</Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Lugar de Ocurrencia:</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={lugarOcurrencia}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Lugar de ocurrencia' : '...'}
            searchPlaceholder="Busca..."
            value={values.catalogo_lugar_id}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              values.catalogo_lugar_id = item.value;
              setIsFocus(false);
            }}
          />

          {errors.catalogo_lugar_id ? (
            <Text style={styles.errorMensaje}>{errors.catalogo_lugar_id}</Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Aseguradora:</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={catalogoAseguradoras}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Aseguradora' : '...'}
            searchPlaceholder="Busca..."
            value={values.catalogo_aseguradora_id}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              values.catalogo_aseguradora_id = item.value;
              setIsFocus(false);
            }}
          />

          {errors.catalogo_aseguradora_id ? (
            <Text style={styles.errorMensaje}>{errors.catalogo_aseguradora_id}</Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Siniestro:</Text>
          <TextInput
            placeholder="Ingresa el siniestro"
            style={styles.input}
            onChangeText={handleChange('siniestro')}
            onBlur={handleBlur('siniestro')}
            value={values.siniestro}
          />
          {touched.siniestro && errors.siniestro ? (
            <Text style={styles.errorMensaje}>{errors.siniestro}</Text>
          ) : null}

          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default DatosServicio;
