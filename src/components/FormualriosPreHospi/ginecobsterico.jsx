import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioGroup from 'react-native-radio-buttons-group';
import {styles} from '../styles/styles';
import {useRef, useState} from 'react';
import SignatureViewWrapper from './signatureViewWraper';

const Ginecobsterico = ({
  values,
  handleChange,
  handleBlur,
  setFieldValue,
  errors,
}) => {
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

  const [selectedSexo, setSelectedSexo] = useState(RECIEN_NACIDO);
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
      setFieldValue('fecha_probable_parto', selectedDate.toDateString());
    }
  };

  // const handleDateChange = (event, selectedDate) => {
  //   setShowDatePicker(false);
  //   if (selectedDate) {
  //     setDate(selectedDate);
  //     setFieldValue('fecha_probable_parto', selectedDate);
  //   }
  // };

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
      />
      {errors.gesta ? (
        <Text style={styles.errorMensaje}>{errors.gesta}</Text>
      ) : null}
      <Text style={styles.layoutFormulario}>Cesáreas:</Text>
      <TextInput
        placeholder="Ingresa cesáreas"
        style={styles.input}
        onChangeText={handleChange('cesarias')}
        onBlur={handleBlur('cesarias')}
        value={values.cesarias}
      />
      {errors.cesarias ? (
        <Text style={styles.errorMensaje}>{errors.cesarias}</Text>
      ) : null}
      <Text style={styles.layoutFormulario}>Para:</Text>
      <TextInput
        placeholder="Ingresa para"
        style={styles.input}
        onChangeText={handleChange('para')}
        onBlur={handleBlur('para')}
        value={values.para}
      />
      {errors.para ? (
        <Text style={styles.errorMensaje}>{errors.para}</Text>
      ) : null}
      <Text style={styles.layoutFormulario}>Partos:</Text>
      <TextInput
        placeholder="Ingresa partos"
        style={styles.input}
        onChangeText={handleChange('partos')}
        onBlur={handleBlur('partos')}
        value={values.partos}
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

      <Text style={styles.layoutFormulario}>Membranas:</Text>
      <TextInput
        placeholder="Ingresa membranas"
        style={styles.input}
        onChangeText={handleChange('membranas')}
        onBlur={handleBlur('membranas')}
        value={values.membranas}
      />
      {errors.membranas ? (
        <Text style={styles.errorMensaje}>{errors.membranas}</Text>
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

      <Text style={styles.layoutFormulario}>Frecuencia:</Text>
      <TextInput
        placeholder="Ingresa frecuencia"
        style={styles.input}
        onChangeText={handleChange('gine_frecuencia')}
        onBlur={handleBlur('gine_frecuencia')}
        value={values.gine_frecuencia}
      />
      {errors.gine_frecuencia ? (
        <Text style={styles.errorMensaje}>{errors.gine_frecuencia}</Text>
      ) : null}
      <Text style={styles.layoutFormulario}>Duración:</Text>
      <TextInput
        placeholder="Ingresa duración"
        style={styles.input}
        onChangeText={handleChange('duracion')}
        onBlur={handleBlur('duracion')}
        value={values.duracion}
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
      <Text style={styles.layoutFormulario}>Lugar:</Text>
      <TextInput
        placeholder="Ingresa lugar"
        style={styles.input}
        onChangeText={handleChange('lugar')}
        onBlur={handleBlur('lugar')}
        value={values.lugar}
      />
      {errors.lugar ? (
        <Text style={styles.errorMensaje}>{errors.lugar}</Text>
      ) : null}

      <Text style={styles.layoutFormulario}>Placenta expulsada:</Text>
      <TextInput
        placeholder="Ingresa si la placenta fue expulsada"
        style={styles.input}
        onChangeText={handleChange('placenta_expulsada')}
        onBlur={handleBlur('placenta_expulsada')}
        value={values.placenta_expulsada}
      />
      {errors.placenta_expulsada ? (
        <Text style={styles.errorMensaje}>{errors.placenta_expulsada}</Text>
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
            values.producto = selectedButtonP.id === 1 ? 'vivo' : 'muerto';
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

      <Text style={styles.layoutFormulario}>Apagar 1 Min:</Text>
      <TextInput
        placeholder="Ingresa Apagar"
        style={styles.input}
        onChangeText={handleChange('apgar_1')}
        onBlur={handleBlur('apgar_1')}
        value={values.apgar_1}
      />
      {errors.apgar_1 ? (
        <Text style={styles.errorMensaje}>{errors.apgar_1}</Text>
      ) : null}

      <Text style={styles.layoutFormulario}>Apagar 5 Min:</Text>
      <TextInput
        placeholder="Ingresa Apagar"
        style={styles.input}
        onChangeText={handleChange('apgar_2')}
        onBlur={handleBlur('apgar_2')}
        value={values.apgar_2}
      />
      {errors.apgar_2 ? (
        <Text style={styles.errorMensaje}>{errors.apgar_2}</Text>
      ) : null}

      <Text style={styles.layoutFormulario}>Apagar 10 Min:</Text>
      <TextInput
        placeholder="Ingresa Apagar"
        style={styles.input}
        onChangeText={handleChange('apgar_3')}
        onBlur={handleBlur('apgar_3')}
        value={values.apgar_3}
      />
      {errors.apgar_3 ? (
        <Text style={styles.errorMensaje}>{errors.apgar_3}</Text>
      ) : null}

      <Text style={styles.layoutFormulario}>Silverman 1:</Text>
      <TextInput
        placeholder="Ingresa Silverman"
        style={styles.input}
        onChangeText={handleChange('silvermann_1')}
        onBlur={handleBlur('silvermann_1')}
        value={values.silvermann_1}
      />
      {errors.silvermann_1 ? (
        <Text style={styles.errorMensaje}>{errors.silvermann_1}</Text>
      ) : null}

      <Text style={styles.layoutFormulario}>Silverman 2:</Text>
      <TextInput
        placeholder="Ingresa Silverman"
        style={styles.input}
        onChangeText={handleChange('silvermann_2')}
        onBlur={handleBlur('silvermann_2')}
        value={values.silvermann_2}
      />
      {errors.silvermann_2 ? (
        <Text style={styles.errorMensaje}>{errors.silvermann_2}</Text>
      ) : null}

      <Text style={styles.layoutFormulario}>Observaciones:</Text>
      <TextInput
        placeholder="Ingresa observaciones"
        style={styles.input}
        onChangeText={handleChange('observaciones')}
        onBlur={handleBlur('observaciones')}
        value={values.observaciones}
      />
      {errors.observaciones ? (
        <Text style={styles.errorMensaje}>{errors.observaciones}</Text>
      ) : null}

      <SignatureViewWrapper
        title="Parentesco o Cargo"
        signatureData={signatures.parentesco.data}
        onShow={() => signatures.parentesco.view.current.show(true)}
        onSave={onSave('parentesco')}
        onClear={onClear('parentesco')}
        signatureView={signatures.parentesco.view}
      />
      {signatures.parentesco.isSaved && signatures.parentesco.isSaved && (
        <View style={{alignItems: 'center', marginTop: 30}}></View>
      )}
    </View>
  );
};
export default Ginecobsterico;
