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
  {label: 'Recreación y deportes', value: 5},
  {label: 'Transporte Público', value: 6},
];
const validationSchema = object().shape({
  folio: validacionNumero(),
  folio_alterno: validacionNumero(),
  evento_calle: validacionTexto(),
  evento_entre: validacionTexto(),
  evento_colonia: validacionTexto(),
  evento_alcaldia: validacionTexto(),
  catalogo_lugar_id: validacionTexto(),
  proveedor: validacionTexto(),
  unidad: validacionTexto(),
  operador: validacionTexto(),
  prestador: validacionTexto(),
});

const DatosServicio = ({user, onFormSubmit, closeSection}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Formik
      initialValues={{
        folio: '',
        folio_alterno: '',
        evento_calle: '',
        evento_entre: '',
        evento_colonia: '',
        evento_alcaldia: '',
        catalogo_lugar_id: '',
        proveedor: '',
        unidad: '',
        operador: '',
        prestador: '',
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

          <Text style={styles.layoutFormulario}>Calle:</Text>
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

          <Text style={styles.layoutFormulario}>Entre:</Text>
          <TextInput
            placeholder="Ingresa el nombre de las calles"
            style={styles.input}
            onChangeText={handleChange('evento_entre')}
            onBlur={handleBlur('evento_entre')}
            value={values.evento_entre}
          />
          {touched.evento_entre && errors.evento_entre ? (
            <Text style={styles.errorMensaje}>{errors.evento_entre}</Text>
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
          <Text style={styles.layoutFormulario}>Lugar de Ocurrencia:</Text>
          <Dropdown
            autoScroll={false}
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
            value={values.lugar_ocurrencia}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              values.catalogo_lugar_id = item.value;
              // setFieldValue('lugar_ocurrencia', item.value); // Actualiza el valor usando setFieldValue
              setIsFocus(false);
            }}
          />

          {errors.catalogo_lugar_id ? (
            <Text style={styles.errorMensaje}>{errors.catalogo_lugar_id}</Text>
          ) : null}
          <Text style={styles.layoutFormulario}>Provedor:</Text>
          <TextInput
            placeholder="Ingresa el provedor"
            style={styles.input}
            onChangeText={handleChange('proveedor')}
            onBlur={handleBlur('proveedor')}
            value={values.proveedor}
          />
          {touched.proveedor && errors.proveedor ? (
            <Text style={styles.errorMensaje}>{errors.proveedor}</Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Unidad:</Text>
          <TextInput
            placeholder="Ingresa la Unidad"
            style={styles.input}
            onChangeText={handleChange('unidad')}
            onBlur={handleBlur('unidad')}
            value={values.unidad}
          />
          {touched.unidad && errors.unidad ? (
            <Text style={styles.errorMensaje}>{errors.unidad}</Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Operador:</Text>
          <TextInput
            placeholder="Ingresa el Operador"
            style={styles.input}
            onChangeText={handleChange('operador')}
            onBlur={handleBlur('operador')}
            value={values.operador}
          />
          {touched.operador && errors.operador ? (
            <Text style={styles.errorMensaje}>{errors.operador}</Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Encargado de atención:</Text>
          <TextInput
            placeholder="Ingresa al encargado de atención"
            style={styles.input}
            onChangeText={handleChange('prestador')}
            onBlur={handleBlur('prestador')}
            value={values.prestador}
          />
          {touched.prestador && errors.prestador ? (
            <Text style={styles.errorMensaje}>{errors.prestador}</Text>
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
