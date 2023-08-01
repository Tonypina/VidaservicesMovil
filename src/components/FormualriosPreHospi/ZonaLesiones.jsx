import React, {useState, useCallback} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';
import {Dropdown} from 'react-native-element-dropdown';

const zonaCuerpo = [
  {label: 'Cabeza', value: 'Cabeza'},
  {label: 'Ojos', value: 'Ojos'},
  {label: 'Ojo Izquierdo', value: 'OjoIzquierdo'},
  {label: 'Ojo Derecho', value: 'OjoDerecho'},
  {label: 'Oídos', value: 'Oídos'},
  {label: 'Oído Izquierdo', value: 'OidoIzquierdo'},
  {label: 'Oído Derecho', value: 'OidoDerecho'},
  {label: 'Nariz', value: 'Nariz'},
  {label: 'Boca', value: 'Boca'},
  {label: 'Cuello', value: 'Cuello'},
  {label: 'Pecho', value: 'Pecho'},
  {label: 'Abdomen', value: 'Abdomen'},
  {label: 'Espalda', value: 'Espalda'},
  {label: 'Hombros', value: 'Hombros'},
  {label: 'Hombro Izquierdo', value: 'HombroIzquierdo'},
  {label: 'Hombro Derecho', value: 'HombroDerecho'},
  {label: 'Brazos', value: 'Brazos'},
  {label: 'Brazo Izquierdo', value: 'BrazoIzquierdo'},
  {label: 'Brazo Derecho', value: 'BrazoDerecho'},
  {label: 'Codos', value: 'Codos'},
  {label: 'Codo Izquierdo', value: 'CodoIzquierdo'},
  {label: 'Codo Derecho', value: 'CodoDerecho'},
  {label: 'Manos', value: 'Manos'},
  {label: 'Mano Izquierda', value: 'ManoIzquierda'},
  {label: 'Mano Derecha', value: 'ManoDerecha'},
  {label: 'Dedos de la mano', value: 'DedosMano'},
  {label: 'Dedos de la mano Izquierda', value: 'DedosManoIzquierda'},
  {label: 'Dedos de la mano Derecha', value: 'DedosManoDerecha'},
  {label: 'Muñecas', value: 'Muñecas'},
  {label: 'Muñeca Izquierda', value: 'MuñecaIzquierda'},
  {label: 'Muñeca Derecha', value: 'MuñecaDerecha'},
  {label: 'Caderas', value: 'Caderas'},
  {label: 'Cadera Izquierda', value: 'CaderaIzquierda'},
  {label: 'Cadera Derecha', value: 'CaderaDerecha'},
  {label: 'Piernas', value: 'Piernas'},
  {label: 'Pierna Izquierda', value: 'PiernaIzquierda'},
  {label: 'Pierna Derecha', value: 'PiernaDerecha'},
  {label: 'Rodillas', value: 'Rodillas'},
  {label: 'Rodilla Izquierda', value: 'RodillaIzquierda'},
  {label: 'Rodilla Derecha', value: 'RodillaDerecha'},
  {label: 'Tobillos', value: 'Tobillos'},
  {label: 'Tobillo Izquierdo', value: 'TobilloIzquierdo'},
  {label: 'Tobillo Derecho', value: 'TobilloDerecho'},
  {label: 'Pies', value: 'Pies'},
  {label: 'Pie Izquierdo', value: 'PieIzquierdo'},
  {label: 'Pie Derecho', value: 'PieDerecho'},
  {label: 'Dedos del pie', value: 'DedosPie'},
  {label: 'Dedos del pie Izquierdo', value: 'DedosPieIzquierdo'},
  {label: 'Dedos del pie Derecho', value: 'DedosPieDerecho'},
];

const ZonaLesiones = ({
  zona_lesiones,
  arrayHelpers,
  handleChange,
  handleBlur,
  errors,
  setFieldValue,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const onChange = useCallback(
    (value, index) => {
      setFieldValue(`zona_lesiones.${index}.zona`, value.value);
    },
    [setFieldValue],
  );

  return (
    <View>
      {zona_lesiones.map((zonaK, index) => (
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
            value={zona_lesiones[index].zona} // Usar el valor correcto
            onChange={value => onChange(value, index)}
          />

          {errors.zona_lesiones &&
          errors.zona_lesiones[index] &&
          errors.zona_lesiones[index].zona ? (
            <Text style={styles.errorMensaje}>
              {errors.zona_lesiones[index].zona}
            </Text>
          ) : null}

          <TextInput
            style={styles.input}
            onChangeText={handleChange(`zona_lesiones.${index}.descripcion`)}
            onBlur={handleBlur(`zona_lesiones.${index}.descripcion`)}
            value={zonaK.descripcion}
            placeholder="Descripción"
          />
          {errors.zona_lesiones &&
          errors.zona_lesiones[index] &&
          errors.zona_lesiones[index].descripcion ? (
            <Text style={styles.errorMensaje}>
              {errors.zona_lesiones[index].descripcion}
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
