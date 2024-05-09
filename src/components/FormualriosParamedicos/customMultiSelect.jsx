import {Text} from 'react-native';
import {styles} from '../styles/styles';
import {MultiSelect} from 'react-native-element-dropdown';

const CustomMultiSelect = ({
  label,
  data,
  setFieldValue,
  fieldKey,
  field,
  isFocus,
  setIsFocus,
  errors,
}) => (
  <>
    <Text style={styles.layoutFormulario}>{label}:</Text>
    <MultiSelect
      style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? 'Seleccionar ' : '...'}
      searchPlaceholder="Busca..."
      value={field}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={item => {
        setFieldValue(item);
      }}
    />
    {errors && errors[fieldKey] && (
      <Text style={styles.errorMensaje}>{errors[fieldKey]}</Text>
    )}
  </>
);
export default CustomMultiSelect;
