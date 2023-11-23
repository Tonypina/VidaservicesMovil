import React, {useState, useCallback} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';
import {Dropdown} from 'react-native-element-dropdown';

const zonaCuerpo = [
  {label: 'Cabeza', value: 1},
  {label: 'Ojos', value: 2},
  {label: 'Ojo Izquierdo', value: 3},
  {label: 'Ojo Derecho', value: 4},
  {label: 'Oídos', value: 5},
  {label: 'Oído Izquierdo', value: 6},
  {label: 'Oído Derecho', value: 7},
  {label: 'Nariz', value: 8},
  {label: 'Boca', value: 9},
  {label: 'Cuello', value: 10},
  {label: 'Pecho', value: 11},
  {label: 'Abdomen', value: 12},
  {label: 'Espalda', value: 13},
  {label: 'Hombros', value: 14},
  {label: 'Hombro Izquierdo', value: 15},
  {label: 'Hombro Derecho', value: 16},
  {label: 'Brazos', value: 17},
  {label: 'Brazo Izquierdo', value: 18},
  {label: 'Brazo Derecho', value: 19},
  {label: 'Codos', value: 20},
  {label: 'Codo Izquierdo', value: 21},
  {label: 'Codo Derecho', value: 22},
  {label: 'Manos', value: 23},
  {label: 'Mano Izquierda', value: 24},
  {label: 'Mano Derecha', value: 25},
  {label: 'Dedos de la mano', value: 26},
  {label: 'Dedos de la mano Izquierda', value: 27},
  {label: 'Dedos de la mano Derecha', value: 28},
  {label: 'Muñecas', value: 29},
  {label: 'Muñeca Izquierda', value: 30},
  {label: 'Muñeca Derecha', value: 31},
  {label: 'Caderas', value: 32},
  {label: 'Cadera Izquierda', value: 33},
  {label: 'Cadera Derecha', value: 34},
  {label: 'Piernas', value: 35},
  {label: 'Pierna Izquierda', value: 36},
  {label: 'Pierna Derecha', value: 37},
  {label: 'Rodillas', value: 38},
  {label: 'Rodilla Izquierda', value: 39},
  {label: 'Rodilla Derecha', value: 40},
  {label: 'Tobillos', value: 41},
  {label: 'Tobillo Izquierdo', value: 42},
  {label: 'Tobillo Derecho', value: 43},
  {label: 'Pies', value: 44},
  {label: 'Pie Izquierdo', value: 45},
  {label: 'Pie Derecho', value: 46},
  {label: 'Dedos del pie', value: 47},
  {label: 'Dedos del pie Izquierdo', value: 48},
  {label: 'Dedos del pie Derecho', value: 49},
];

const ZonaLesiones = ({
  exploracion_fisica,
  arrayHelpers,
  handleChange,
  handleBlur,
  errors,
  setFieldValue,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const onChange = useCallback(
    (value, index) => {
      setFieldValue(`exploracion_fisica.${index}.zona`, value.value);
    },
    [setFieldValue],
  );

  return (
    <View>
      {exploracion_fisica.map((zonaK, index) => (
        <View key={index}>
          <Text style={styles.layoutFormularioUnderline}>
            Zona #{index + 1}
          </Text>
          <Text style={styles.layoutFormulario}>Zona:</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={zonaCuerpo}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Selecciona' : '...'}
            searchPlaceholder="Busca..."
            value={exploracion_fisica[index].zona} // Usar el valor correcto
            onChange={value => onChange(value, index)}
          />

          {errors.exploracion_fisica &&
          errors.exploracion_fisica[index] &&
          errors.exploracion_fisica[index].zona ? (
            <Text style={styles.errorMensaje}>
              {errors.exploracion_fisica[index].zona}
            </Text>
          ) : null}

          <TextInput
            style={styles.input}
            onChangeText={handleChange(`exploracion_fisica.${index}.descripcion`)}
            onBlur={handleBlur(`exploracion_fisica.${index}.descripcion`)}
            value={zonaK.descripcion}
            placeholder="Descripción"
          />
          {errors.exploracion_fisica &&
          errors.exploracion_fisica[index] &&
          errors.exploracion_fisica[index].descripcion ? (
            <Text style={styles.errorMensaje}>
              {errors.exploracion_fisica[index].descripcion}
            </Text>
          ) : null}
        </View>
      ))}
      <TouchableOpacity
        style={styles.addBoton}
        onPress={() => {
          arrayHelpers.push({
            zona: '',
            descripcion: '',
          });
        }}>
        <Text style={styles.textWhite}>Agregar Zona de Lesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(ZonaLesiones);
