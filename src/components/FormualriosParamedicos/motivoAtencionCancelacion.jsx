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
  {label: 'Servicio Cancelado', value: 'C'},
  {label: 'Negativa de Atención', value: 'N'},
];

const validationSchema = object().shape({
  motivo: validacionTexto()
}) 

const MotivoAtencion = ({onFormSubmit, closeSection, setSelectedOption}) => {

  const [isFocus, setIsFocus] = useState(false);

  return (
    <Formik
      initialValues={{motivo: ''}}
      validationSchema={validationSchema}
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
            autoScroll={false}
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
            }}
          />
          {errors.motivo ? (
            <Text style={styles.errorMensaje}>
              {errors.motivo}
            </Text>
          ) : null}

          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default MotivoAtencion;
