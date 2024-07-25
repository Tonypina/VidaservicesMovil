import {Text} from 'react-native';
import {styles} from '../styles/styles';
import {Dropdown} from 'react-native-element-dropdown';

const CustomDropdown = ({
  isDisabled,
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
      autoScroll={false}
      disable={isDisabled}
      excludeItems={excludeItems}
      style={[styles.dropdown, isFocus && {borderColor: 'blue'}, isDisabled && {backgroundColor: '#E8E8E8'}]}
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

        if (fieldKey === "catalogo_ventilacion_auscultacion_id" && item.value === 1) {
          setFieldValue("catalogo_ventilacion_emitorax_id", 3)
          setFieldValue("catalogo_ventilacion_sitio_id", 3)
        }

        if (fieldKey === "catalogo_ventilacion_observaciones_id" && item.value === 4) {
          setFieldValue("catalogo_ventilacion_auscultacion_id", 3)
          setFieldValue("catalogo_ventilacion_emitorax_id", 3)
          setFieldValue("catalogo_ventilacion_sitio_id", 3)
        }

        if (fieldKey === "catalogo_pulsos_id" && item.value === 3) {
          setFieldValue("catalogo_calidad_pulso_id", 5)
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
