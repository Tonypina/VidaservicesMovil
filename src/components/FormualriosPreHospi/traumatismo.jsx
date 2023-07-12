import {View, Text, TextInput, Button} from 'react-native';
import {styles} from '../styles/styles';
import {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';

const origenProbableClinico = [
  {label: 'Neurológica', value: 'Hogar'},
  {label: 'Cardiovascular', value: 'Cardiovascular'},
  {label: 'Respiratorio', value: 'Respiratorio'},
  {label: 'Metabólico', value: 'Metabólico'},
  {label: 'Digestiva', value: 'Digestiva'},
  {label: 'Urogenital', value: 'Urogenital'},
  {label: 'Ginecobtetrica', value: 'Ginecobtetrica'},
  {label: 'Cognitivo Emocional', value: 'Cognitivo Emocional'},
  {label: 'Músculo Esquelético', value: 'Músculo Esquelético'},
  {label: 'Infecciosa', value: 'Infecciosa'},
  {label: 'Oncológico', value: 'Oncológico'},
];
const Traumatismo = ({
  handleChange,
  handleBlur,
  handleSubmit,
  values,
  errors,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View>
      <Text style={styles.layoutFormulario}>Origen Probable Clínico:</Text>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={origenProbableClinico}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Origen Probable Clínico ' : '...'}
        searchPlaceholder="Busca..."
        value={values.catalogo_origen_probable_clinico_id}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          values.catalogo_origen_probable_clinico_id = item.value;
          setIsFocus(false);
        }}
      />
      {errors.catalogo_origen_probable_clinico_id ? (
        <Text style={{color: 'red'}}>
          {errors.catalogo_origen_probable_clinico_id}
        </Text>
      ) : null}

      <Text style={styles.layoutFormulario}>1a Vez:</Text>
      <TextInput
        placeholder="Ingresa el texto"
        style={styles.input}
        onChangeText={handleChange('primera_vez')}
        onBlur={handleBlur('primera_vez')}
        value={values.primera_vez}
      />
      {errors.primera_vez ? (
        <Text style={{color: 'red'}}>{errors.primera_vez}</Text>
      ) : null}

      <Text style={styles.layoutFormulario}>Subsecuente:</Text>
      <TextInput
        placeholder="Ingresa el texto"
        style={styles.input}
        onChangeText={handleChange('subsecuente')}
        onBlur={handleBlur('subsecuente')}
        value={values.subsecuente}
      />
      {errors.subsecuente ? (
        <Text style={{color: 'red'}}>{errors.subsecuente}</Text>
      ) : null}
    </View>
  );
};
export default Traumatismo;
