import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioGroup from 'react-native-radio-buttons-group';
import {styles} from '../styles/styles';
import {useRef, useState} from 'react';
import SignatureViewWrapper from './signatureViewWraper';
import {Dropdown} from 'react-native-element-dropdown';
import { boolean } from 'yup';

//   pRODUCTO
const PRODUCTO = [
  {
    id: 1,
    label: 'Vivo',
    value: 'vivo',
  },
  {
    id: 2,
    label: 'Muerto',
    value: 'muerto',
  },
];
// Sexo del RECIEN_NACIDO
const RECIEN_NACIDO = [
  {
    id: 1,
    label: 'Masculino',
    value: 'masculino',
  },
  {
    id: 2,
    label: 'Femenino',
    value: 'femenino',
  },
];

const booleanYn = [
  {label: 'Sí', value: 1},
  {label: 'No', value: 0},
];

const optionsMembranas = [
  {label: 'Integras', value: 1},
  {label: 'Ruptura', value: 2}
];
const optionsLugar = [];

const Ginecobsterico = ({
  values,
  handleChange,
  handleBlur,
  setFieldValue,
  errors,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const [signatures, setSignatures] = useState({
    parentesco: {data: null, isSaved: false, view: useRef(null)},
  });
  const onSave = type => result => {
    setSignatures(prevState => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        data: `data:image/png;base64,${result.encoded}`,
        isSaved: true,
      },
    }));
    signatures[type].view.current.show(false);
  };

  const onClear = type => () => {
    setSignatures(prevState => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        data: null,
        isSaved: false,
      },
    }));
  };

  const [selectedSexo, setSelectedSexo] = useState(RECIEN_NACIDO);

  const [selectProducto, setSelectProducto] = useState(PRODUCTO);

  //Date
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      setFieldValue('fecha_probable', selectedDate);
    }
  };
  //Hour
  const [times, setTimes] = useState({
    contracciones: new Date(),
    nacimiento: new Date(),
  });
  const [showTimePickers, setShowTimePickers] = useState({
    contracciones: false,
    nacimiento: false,
  });
  const toggleTimePicker = type => {
    setShowTimePickers(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleTimeChange = (type, event, selectedTime) => {
    setShowTimePickers(prev => ({
      ...prev,
      [type]: false,
    }));
    if (selectedTime) {
      setTimes(prev => ({
        ...prev,
        [type]: selectedTime,
      }));
      if (type === 'contracciones') {
        setFieldValue(
          'hora_inicio_contracciones',
          selectedTime.toLocaleTimeString(),
        );
      } else if (type === 'nacimiento') {
        setFieldValue('hora_nacimiento', selectedTime.toLocaleTimeString());
      }
    }
  };
  return (
    <View>
      <Text style={styles.textFormSubtitle}>Datos PX Ginecobstetrico:</Text>
      <Text style={styles.layoutFormulario}>Gesta:</Text>
      <TextInput
        placeholder="Ingresa gesta"
        style={styles.input}
        onChangeText={handleChange('gesta')}
        onBlur={handleBlur('gesta')}
        value={values.gesta}
        keyboardType='numeric'

      />
      {errors.gesta ? (
        <Text style={styles.errorMensaje}>{errors.gesta}</Text>
      ) : null}
      <Text style={styles.layoutFormulario}>Cesáreas:</Text>
      <TextInput
        placeholder="Ingresa cesáreas"
        style={styles.input}
        onChangeText={handleChange('cesareas')}
        onBlur={handleBlur('cesareas')}
        value={values.cesareas}
        keyboardType="numeric"
      />
      {errors.cesareas ? (
        <Text style={styles.errorMensaje}>{errors.cesareas}</Text>
      ) : null}
      <Text style={styles.layoutFormulario}>Partos:</Text>
      <TextInput
        placeholder="Ingresa partos"
        style={styles.input}
        onChangeText={handleChange('partos')}
        onBlur={handleBlur('partos')}
        value={values.partos}
        keyboardType='numeric'

      />
      {errors.partos ? (
        <Text style={styles.errorMensaje}>{errors.partos}</Text>
      ) : null}
      <Text style={styles.layoutFormulario}>Abortos:</Text>
      <TextInput
        placeholder="Ingresa abortos"
        style={styles.input}
        onChangeText={handleChange('abortos')}
        onBlur={handleBlur('abortos')}
        value={values.abortos}
        keyboardType="numeric"

      />
      {errors.abortos ? (
        <Text style={styles.errorMensaje}>{errors.abortos}</Text>
      ) : null}
      <Text style={styles.layoutFormulario}>Semanas de gestación:</Text>
      <TextInput
        placeholder="Ingresa semanas de gestación"
        style={styles.input}
        onChangeText={handleChange('semanas_de_gestacion')}
        onBlur={handleBlur('semanas_de_gestacion')}
        value={values.semanas_de_gestacion}
        keyboardType="numeric"
      />
      {errors.semanas_de_gestacion ? (
        <Text style={styles.errorMensaje}>{errors.semanas_de_gestacion}</Text>
      ) : null}
      <View style={{marginTop: 6}}>
        <Text style={styles.layoutFormulario}>Fecha probable de parto:</Text>
        <TouchableOpacity onPress={toggleDatePicker}>
          <TextInput
            style={styles.input}
            editable={false}
            placeholder="Seleccione una fecha"
            onChangeText={handleChange('fecha_probable')}
            onBlur={handleBlur('fecha_probable')}
            value={date.toDateString()}
          />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            mode="date"
            display="calendar"
            value={date}
            onChange={handleDateChange}
          />
        )}
      </View>
      {errors.fecha_probable ? (
        <Text style={styles.errorMensaje}>{errors.fecha_probable}</Text>
      ) : null}
      <Text style={styles.layoutFormulario}>
        Membranas:
      </Text>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={optionsMembranas}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Membranas' : '...'}
        searchPlaceholder="Busca..."
        value={values.membranas}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          values.membranas = item.value;
          setIsFocus(false);
        }}
      />
      {errors.membranas ? (
        <Text style={styles.errorMensaje}>
          {errors.membranas}
        </Text>
      ) : null}

      <Text style={styles.layoutFormulario}>
        Hora de inicio de contracciones:
      </Text>
      <TouchableOpacity onPress={() => toggleTimePicker('contracciones')}>
        <TextInput
          style={styles.input}
          editable={false}
          placeholder="Seleccione una hora"
          value={times.contracciones.toLocaleTimeString()}
        />
      </TouchableOpacity>
      {showTimePickers.contracciones && (
        <DateTimePicker
          mode="time"
          display="spinner"
          value={times.contracciones}
          onChange={(event, selectedTime) =>
            handleTimeChange('contracciones', event, selectedTime)
          }
        />
      )}
      {errors.hora_inicio_contracciones ? (
        <Text style={styles.errorMensaje}>{errors.hora_inicio_contracciones}</Text>
      ) : null}

      <Text style={styles.layoutFormulario}>Frecuencia:</Text>
      <TextInput
        placeholder="Ingresa frecuencia"
        style={styles.input}
        onChangeText={handleChange('frecuencia')}
        onBlur={handleBlur('frecuencia')}
        value={values.frecuencia}
        keyboardType="numeric"
      />
      {errors.frecuencia ? (
        <Text style={styles.errorMensaje}>{errors.frecuencia}</Text>
      ) : null}
      <Text style={styles.layoutFormulario}>Duración:</Text>
      <TextInput
        placeholder="Ingresa duración"
        style={styles.input}
        onChangeText={handleChange('duracion')}
        onBlur={handleBlur('duracion')}
        value={values.duracion}
        keyboardType="numeric"
      />
      {errors.duracion ? (
        <Text style={styles.errorMensaje}>{errors.duracion}</Text>
      ) : null}

      <Text style={styles.textFormSubtitle}>Datos PX Post-Parto:</Text>
      <Text style={styles.layoutFormulario}>Hora de nacimiento:</Text>
      <TouchableOpacity onPress={() => toggleTimePicker('nacimiento')}>
        <TextInput
          style={styles.input}
          editable={false}
          placeholder="Seleccione una hora"
          value={times.nacimiento.toLocaleTimeString()}
        />
      </TouchableOpacity>
      {showTimePickers.nacimiento && (
        <DateTimePicker
          mode="time"
          display="spinner"
          value={times.nacimiento}
          onChange={(event, selectedTime) =>
            handleTimeChange('nacimiento', event, selectedTime)
          }
        />
      )}
      {errors.hora_nacimiento ? (
        <Text style={styles.errorMensaje}>{errors.hora_nacimiento}</Text>
      ) : null}
      
      <Text style={styles.layoutFormulario}>Lugar:</Text>
      <TextInput
        placeholder="Ingresa lugar"
        style={styles.input}
        onChangeText={handleChange('lugar')}
        onBlur={handleBlur('lugar')}
        value={values.lugar}
      />
      {errors.lugar ? (
        <Text style={styles.errorMensaje}>
          {errors.lugar}
        </Text>
      ) : null}

      <Text style={styles.layoutFormulario}>
        Placenta expulsada:
      </Text>
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
        placeholder={!isFocus ? 'Placenta expulsada' : '...'}
        searchPlaceholder="Busca..."
        value={values.placenta_expulsada}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          values.placenta_expulsada = item.value;
          setIsFocus(false);
        }}
      />
      {errors.placenta_expulsada ? (
        <Text style={styles.errorMensaje}>
          {errors.placenta_expulsada}
        </Text>
      ) : null}

      <Text style={styles.textFormSubtitle}>Datos del recién nacido:</Text>
      <Text style={styles.layoutFormulario}>Producto:</Text>
      <RadioGroup
        radioButtons={selectProducto}
        containerStyle={styles.radioGroup}
        onPress={newProducto => {
          setSelectProducto(newProducto);
          const selectedButtonP = newProducto.find(rb => rb.selected);
          if (selectedButtonP) {
            values.producto = selectedButtonP.id === 1 ? 0 : 1;
          }
        }}
      />
      {errors.producto ? (
        <Text style={styles.errorMensaje}>{errors.producto}</Text>
      ) : null}

      <Text style={styles.layoutFormulario}>Sexo:</Text>
      <RadioGroup
        radioButtons={selectedSexo}
        containerStyle={styles.radioGroup}
        onPress={newSelectedSexo => {
          setSelectedSexo(newSelectedSexo);
          const selectedButton = newSelectedSexo.find(rb => rb.selected);
          if (selectedButton) {
            values.sexo = selectedButton.id === 1 ? 0 : 1;
          }
        }}
      />
      {errors.sexo ? (
        <Text style={styles.errorMensaje}>{errors.sexo}</Text>
      ) : null}

      <Text style={styles.layoutFormulario}>Apgar 1 Min:</Text>
      <TextInput
        placeholder="Ingresa Apgar"
        style={styles.input}
        onChangeText={handleChange('apgar_1')}
        onBlur={handleBlur('apgar_1')}
        value={values.apgar_1}
        keyboardType='numeric'
      />
      {errors.apgar_1 ? (
        <Text style={styles.errorMensaje}>{errors.apgar_1}</Text>
      ) : null}

      <Text style={styles.layoutFormulario}>Apgar 5 Min:</Text>
      <TextInput
        placeholder="Ingresa Apgar"
        style={styles.input}
        onChangeText={handleChange('apgar_2')}
        onBlur={handleBlur('apgar_2')}
        value={values.apgar_2}
        keyboardType='numeric'

      />
      {errors.apgar_2 ? (
        <Text style={styles.errorMensaje}>{errors.apgar_2}</Text>
      ) : null}

      <Text style={styles.layoutFormulario}>Apgar 10 Min:</Text>
      <TextInput
        placeholder="Ingresa Apgar"
        style={styles.input}
        onChangeText={handleChange('apgar_3')}
        onBlur={handleBlur('apgar_3')}
        value={values.apgar_3}
        keyboardType='numeric'
      />
      {errors.apgar_3 ? (
        <Text style={styles.errorMensaje}>{errors.apgar_3}</Text>
      ) : null}

      <Text style={styles.layoutFormulario}>Silvermann 1:</Text>
      <TextInput
        placeholder="Ingresa Silvermann"
        style={styles.input}
        onChangeText={handleChange('silvermann_1')}
        onBlur={handleBlur('silvermann_1')}
        value={values.silvermann_1}
        keyboardType='numeric'
      />
      {errors.silvermann_1 ? (
        <Text style={styles.errorMensaje}>{errors.silvermann_1}</Text>
      ) : null}

      <Text style={styles.layoutFormulario}>Silvermann 2:</Text>
      <TextInput
        placeholder="Ingresa Silvermann"
        style={styles.input}
        onChangeText={handleChange('silvermann_2')}
        onBlur={handleBlur('silvermann_2')}
        value={values.silvermann_2}
        keyboardType='numeric'
      />
      {errors.silvermann_2 ? (
        <Text style={styles.errorMensaje}>{errors.silvermann_2}</Text>
      ) : null}
    </View>
  );
};
export default Ginecobsterico;
