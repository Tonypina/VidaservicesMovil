import {Text} from 'react-native';
import {styles} from '../styles/styles';
import {Dropdown} from 'react-native-element-dropdown';

const CustomDropdown = ({
  excludeItems,
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
}) =>  {

  return (
  <>
    <Text style={styles.layoutFormulario}>{label}:</Text>
    <Dropdown
      excludeItems={excludeItems}
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
          fieldKey === "catalogo_pulsos_id" ||
          fieldKey === "catalogo_ventilacion_auscultacion_id" ||
          fieldKey === "catalogo_ventilacion_observaciones_id" ||
          fieldKey === "catalogo_via_aerea_id"
        ) {
          setSelectedOption({...selectedOption, [fieldKey]: item.value})
        }

        if ( 
          fieldKey === "catalogo_tratamiento_oxigenoterapia_id" ||
          fieldKey === "via_venosa_catalogo"
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
)};
export default CustomDropdown;
