import {Text} from 'react-native';
import {styles} from '../styles/styles';
import {Dropdown} from 'react-native-element-dropdown';

const CustomDropdown = ({
  label,
  data,
  setFieldValue,
  field,
  isFocus,
  setIsFocus,
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
        setFieldValue(item.value, fieldKey);
        setIsFocus(false);
      }}
    />
  </>
);

export default CustomDropdown;
