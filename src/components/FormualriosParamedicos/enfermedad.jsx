import {View, Text, TextInput} from 'react-native';
import {styles} from '../styles/styles';
import {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';

const origenProbableClinico = [
  {label: 'Neurológica', value: 1},
  {label: 'Respiratorio', value: 3},
  {label: 'Metabólico', value: 4},
  {label: 'Cardiovascular', value: 2},
  {label: 'Digestiva', value: 5},
  {label: 'Urogenital', value: 6},
  {label: 'Infecciosa', value: 12},
  {label: 'Ginecobstetrica', value: 7},
  {label: 'Oncológico', value: 10},
  {label: 'Cognitivo Emocional', value: 8},
  {label: 'Músculo Esquelético', value: 9},
  {label: 'Otros', value: 11},
];

const booleanYn = [
  {label: 'Sí', value: 1},
  {label: 'No', value: 0},
];

const Enfermedad = ({handleChange, handleBlur, values, errors}) => {
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
        <Text style={styles.errorMensaje}>
          {errors.catalogo_origen_probable_clinico_id}
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
        <Text style={styles.errorMensaje}>{errors.especifique}</Text>
      ) : null}

      <Text style={styles.layoutFormulario}>1a Vez:</Text>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={booleanYn}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? '1a Vez ' : '...'}
        searchPlaceholder="Busca..."
        value={values.primera_vez}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          values.primera_vez = item.value;
          setIsFocus(false);
        }}
      />
      {errors.primera_vez ? (
        <Text style={styles.errorMensaje}>
          {errors.primera_vez}
        </Text>
      ) : null}

      <Text style={styles.layoutFormulario}>Subsecuente:</Text>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={booleanYn}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Subsecuente ' : '...'}
        searchPlaceholder="Busca..."
        value={values.subsecuente}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          values.subsecuente = item.value;
          setIsFocus(false);
        }}
      />
      {errors.subsecuente ? (
        <Text style={styles.errorMensaje}>
          {errors.subsecuente}
        </Text>
      ) : null}
    </View>
  );
};
export default Enfermedad;
