import {Formik} from 'formik';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';
import {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';

const lugarOcurrencia = [
  {label: 'Hogar', value: 'Hogar'},
  {label: 'Vía Publica', value: 'Via Publica'},
  {label: 'Trabajo', value: 'Trabajo'},
  {label: 'Escuela', value: 'Escuela'},
  {label: 'Recreación y deportes', value: 'Recreación y deportes'},
  {label: 'Transporte Público', value: 'Transporte Público'},
];

const DatosServicio = ({onFormSubmit, closeSection}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Formik
      initialValues={{
        lugar_ocurrencia: '',
        provedor: '',
        unidad: '',
        operador: '',
        prestador_servicio: '',
      }}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View>
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
            value={values.lugar_ocurrencia}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              values.lugar_ocurrencia = item.value;
              setIsFocus(false);
            }}
          />
          <Text style={styles.layoutFormulario}>Provedor:</Text>
          <TextInput
            placeholder="Ingresa el provedor"
            style={styles.input}
            onChangeText={handleChange('provedor')}
            onBlur={handleBlur('provedor')}
            value={values.provedor}
          />

          <Text style={styles.layoutFormulario}>Unidad:</Text>
          <TextInput
            placeholder="Ingresa la Unidad"
            style={styles.input}
            onChangeText={handleChange('unidad')}
            onBlur={handleBlur('unidad')}
            value={values.unidad}
          />

          <Text style={styles.layoutFormulario}>Operador:</Text>
          <TextInput
            placeholder="Ingresa el Operador"
            style={styles.input}
            onChangeText={handleChange('operador')}
            onBlur={handleBlur('operador')}
            value={values.operador}
          />

          <Text style={styles.layoutFormulario}>Prestador del servicio:</Text>
          <TextInput
            placeholder="Ingresa el prestador de servicio"
            style={styles.input}
            onChangeText={handleChange('prestador_servicio')}
            onBlur={handleBlur('prestador_servicio')}
            value={values.prestador_servicio}
          />

          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default DatosServicio;
