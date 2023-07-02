import {Formik} from 'formik';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';
import {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import Ginecobsterico from './ginecobsterico';
import Traumatismo from './traumatismo';

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

const MotivoAtencion = ({onFormSubmit, closeSection}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const [isFocus, setIsFocus] = useState(false);

  return (
    <Formik
      initialValues={{
        gesta: '',
        cesarias: '',
        partos: '',
        abortos: '',
        semanas_gestacion: '',
        fecha_probable_parto: '',
        membranas: '',
        hora_inicio_contracciones: '',
        frecuencia: '',
        duracion: '',
        hora_nacimiento: '',
        lugar: '',
        placenta_expulsada: '',
        producto: '',
        sexo: '',
        apagar: '',
        hora_nacimiento: '',
        silvermann: '',
        observaciones: '',
        motivo_atencion: '',
        origen_probable_clinico: '',
        primera_vez: '',
        subsecuente: '',
        agente_casual_traumatico: '',
      }}
      onSubmit={values => {
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
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
            value={values.motivo_atencion}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              values.motivo_atencion = item.value;
              setIsFocus(false);
              setSelectedOption(item.value);
              console.log('->', values.motivo_atencion);
            }}
          />

          {selectedOption === 'Enfermedad' && (
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
            </View>
          )}
          {selectedOption === 'Traumatismo' && (
            <Traumatismo
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
            />
          )}
          {selectedOption === 'Ginecobstetrico' && (
            <Ginecobsterico
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
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
