import React, {useState, useCallback} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';
import {Dropdown} from 'react-native-element-dropdown';

const zonaCuerpo = [
  {label: 'Abdomen', value: 1},
  {label: 'Boca', value: 2},
  {label: 'Brazo Derecho', value: 3},
  {label: 'Brazo Izquierdo', value: 4},
  {label: 'Brazos', value: 5},
  {label: 'Cabeza', value: 6},
  {label: 'Cadera', value: 7},
  {label: 'Cadera Derecha', value: 8},
  {label: 'Cadera Izquierda', value: 9},
  {label: 'Cara', value: 10},
  {label: 'Clavícula Derecha', value: 11},
  {label: 'Clavícula Izquierda', value: 12},
  {label: 'Codo Derecho', value: 13},
  {label: 'Codo Izquierdo', value: 14},
  {label: 'Codos', value: 15},
  {label: 'Cuello', value: 16},
  {label: 'Dedos de la Mano', value: 17},
  {label: 'Dedos de la Mano Derecha', value: 18},
  {label: 'Dedos de la Mano Izquierda', value: 19},
  {label: 'Dedos del Pie', value: 20},
  {label: 'Dedos del Pie Derecho', value: 21},
  {label: 'Dedos del Pie Izquierdo', value: 22},
  {label: 'Espalda', value: 23},
  {label: 'Genitales', value: 24},
  {label: 'Hombro Derecho', value: 25},
  {label: 'Hombro Izquierdo', value: 26},
  {label: 'Hombros', value: 27},
  {label: 'Mano Derecha', value: 28},
  {label: 'Mano Izquierda', value: 29},
  {label: 'Manos', value: 30},
  {label: 'Muñeca Derecha', value: 31},
  {label: 'Muñeca Izquierda', value: 32},
  {label: 'Muñecas', value: 33},
  {label: 'Nariz', value: 34},
  {label: 'Oído Derecho', value: 35},
  {label: 'Oído Izquierdo', value: 36},
  {label: 'Oídos', value: 37},
  {label: 'Ojo Derecho', value: 38},
  {label: 'Ojo Izquierdo', value: 39},
  {label: 'Ojos', value: 40},
  {label: 'Pecho', value: 41},
  {label: 'Pie Derecho', value: 42},
  {label: 'Pie Izquierdo', value: 43},
  {label: 'Pierna Derecha', value: 44},
  {label: 'Pierna Izquierda', value: 45},
  {label: 'Piernas', value: 46},
  {label: 'Pies', value: 47},
  {label: 'Rodilla Derecha', value: 48},
  {label: 'Rodilla Izquierda', value: 49},
  {label: 'Rodillas', value: 50},
  {label: 'Tobillo Derecho', value: 51},
  {label: 'Tobillo Izquierdo', value: 52},
  {label: 'Tobillos', value: 53},
  {label: 'Sin Lesión Aparente', value: 54},
];

const lesiones = [
  {label: 'Deformidad', value: 'Deformidad'},
  {label: 'Contusión', value: 'Contusion'},
  {label: 'Abrasión', value: 'Abrasion'},
  {label: 'Penetración', value: 'Penetracion'},
  {label: 'Quemadura', value: 'Quemadura'},
  {label: 'Laceración', value: 'Laceracion'},
  {label: 'Hipersensibilidad', value: 'Hipersensibilidad'},
  {label: 'Crepitación', value: 'Crepitacion'},
  {label: 'Dolor', value: 'Dolor'},
  {label: 'Edema', value: 'Edema'},
  {label: 'Sin Lesión Aparente', value: 'Sin Lesión Aparente'},
];

const ZonaLesiones = ({
  exploracion_fisica,
  arrayHelpers,
  handleChange,
  handleBlur,
  errors,
  setFieldValue,
  selectedMotivo
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const onChange = useCallback(
    (value, index, campo) => {
      setFieldValue(`exploracion_fisica.${index}.${campo}`, value.value);
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
            autoScroll={false}
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
            onChange={value => onChange(value, index, 'zona')}
          />

          {errors.exploracion_fisica &&
          errors.exploracion_fisica[index] &&
          errors.exploracion_fisica[index].zona ? (
            <Text style={styles.errorMensaje}>
              {errors.exploracion_fisica[index].zona}
            </Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Descripción:</Text>
          <Dropdown
            autoScroll={false}
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={lesiones}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Selecciona' : '...'}
            searchPlaceholder="Busca..."
            value={exploracion_fisica[index].descripcion} // Usar el valor correcto
            onChange={value => onChange(value, index, 'descripcion')}
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

      {selectedMotivo === "T" ? (
        arrayHelpers.form.values.exploracion_fisica.length > 1 ? (
          <TouchableOpacity
            style={styles.removeBoton}
            onPress={() => {
              arrayHelpers.pop();
            }}>
            <Text style={styles.textWhite}>Eliminar Última Zona de Lesión</Text>
          </TouchableOpacity>
        ) : null
      ) : (
        arrayHelpers.form.values.exploracion_fisica.length > 0 ? (
          <TouchableOpacity
            style={styles.removeBoton}
            onPress={() => {
              arrayHelpers.pop();
            }}>
            <Text style={styles.textWhite}>Eliminar Última Zona de Lesión</Text>
          </TouchableOpacity>
        ) : null
      )}

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
