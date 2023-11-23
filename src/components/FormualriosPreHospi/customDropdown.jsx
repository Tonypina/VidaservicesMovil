import {Text} from 'react-native';
import {styles} from '../styles/styles';
import {Dropdown} from 'react-native-element-dropdown';

const CustomDropdown = ({
  selectedOption,
  setSelectedOption,
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
    <Dropdown
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
        setFieldValue(fieldKey, item.value);

        if ( 
          fieldKey === "catalogo_tratamiento_asistencia_ventilatoria_id" ||
          fieldKey === "bomba_de_infusion"
        ) {
          setSelectedOption({...selectedOption, [fieldKey]: item.value})
        }

        setIsFocus(false);

      }}
    />
    {errors && errors[fieldKey] && (
      <Text style={styles.errorMensaje}>{errors[fieldKey]}</Text>
    )}
  </>
);
export default CustomDropdown;
