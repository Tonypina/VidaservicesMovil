import {Formik} from 'formik';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';
import {useState} from 'react';
import RadioGroup from 'react-native-radio-buttons-group';
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';

// const motivoAtencion = [
//   {label: 'Enfermedad', value: 'Enfermedad'},
//   {label: 'Traumatismo', value: 'Traumatismo'},
//   {label: 'Ginecobstétrico', value: 'Ginecobstetrico'},
// ];

const MotivoAtencion = ({onFormSubmit, closeSection}) => {
  const [isFocus, setIsFocus] = useState(false);
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
    console.log(selectedDate);
    if (selectedDate) {
      setDate(selectedDate);
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
    }
  };

  return (
    <Formik
      initialValues={{
        gesta: '',
        cesarias: '',
        partos: '',
        abortos: '',
        semanas_gestacion: '',
        fecha_probable_parto: '',
        membranas: '',
        hora_inicio_contracciones: '',
        frecuencia: '',
        duracion: '',
        hora_nacimiento: '',
        lugar: '',
        placenta_expulsada: '',
        producto: '',
        sexo: '',
        apagar: '',
        hora_nacimiento: '',
        silvermann: '',
        observaciones: '',
      }}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        values.fecha_probable_parto = date;
        values.hora_inicio_contracciones = times.contracciones;
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
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

          <Text style={styles.layoutFormulario}>Cesáreas:</Text>
          <TextInput
            placeholder="Ingresa cesáreas"
            style={styles.input}
            onChangeText={handleChange('cesarias')}
            onBlur={handleBlur('cesarias')}
            value={values.cesarias}
          />

          <Text style={styles.layoutFormulario}>Partos:</Text>
          <TextInput
            placeholder="Ingresa partos"
            style={styles.input}
            onChangeText={handleChange('partos')}
            onBlur={handleBlur('partos')}
            value={values.partos}
          />

          <Text style={styles.layoutFormulario}>Abortos:</Text>
          <TextInput
            placeholder="Ingresa abortos"
            style={styles.input}
            onChangeText={handleChange('abortos')}
            onBlur={handleBlur('abortos')}
            value={values.abortos}
          />

          <Text style={styles.layoutFormulario}>Semanas de gestación:</Text>
          <TextInput
            placeholder="Ingresa semanas de gestación"
            style={styles.input}
            onChangeText={handleChange('semanas_gestacion')}
            onBlur={handleBlur('semanas_gestacion')}
            value={values.semanas_gestacion}
          />

          <View style={{marginTop: 6}}>
            <Text style={styles.layoutFormulario}>
              Fecha probable de parto:
            </Text>
            <TouchableOpacity onPress={toggleDatePicker}>
              <TextInput
                style={styles.input}
                editable={false}
                placeholder="Seleccione una fecha"
                onChangeText={handleChange('fecha_probable_parto')}
                onBlur={handleBlur('fecha_probable_parto')}
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
            onChangeText={handleChange('frecuencia')}
            onBlur={handleBlur('frecuencia')}
            value={values.frecuencia}
          />

          <Text style={styles.layoutFormulario}>Duración:</Text>
          <TextInput
            placeholder="Ingresa duración"
            style={styles.input}
            onChangeText={handleChange('duracion')}
            onBlur={handleBlur('duracion')}
            value={values.duracion}
          />
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

          <Text style={styles.layoutFormulario}>Placenta expulsada:</Text>
          <TextInput
            placeholder="Ingresa si la placenta fue expulsada"
            style={styles.input}
            onChangeText={handleChange('placenta_expulsada')}
            onBlur={handleBlur('placenta_expulsada')}
            value={values.placenta_expulsada}
          />
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

          <Text style={styles.layoutFormulario}>Apagar:</Text>
          <TextInput
            placeholder="Ingresa Apagar"
            style={styles.input}
            onChangeText={handleChange('apagar')}
            onBlur={handleBlur('apagar')}
            value={values.apagar}
          />

          <Text style={styles.layoutFormulario}>Silverman:</Text>
          <TextInput
            placeholder="Ingresa Silverman"
            style={styles.input}
            onChangeText={handleChange('silvermann')}
            onBlur={handleBlur('silvermann')}
            value={values.silvermann}
          />

          <Text style={styles.layoutFormulario}>Observaciones:</Text>
          <TextInput
            placeholder="Ingresa observaciones"
            style={styles.input}
            onChangeText={handleChange('observaciones')}
            onBlur={handleBlur('observaciones')}
            value={values.observaciones}
          />
          <Button title="Guardar" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};
export default MotivoAtencion;
