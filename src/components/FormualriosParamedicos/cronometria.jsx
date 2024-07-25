import {useState} from 'react';
import {View, TouchableOpacity, Text, TextInput} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Formik} from 'formik';
import {styles} from '../styles/styles';

const Cronometria = ({onFormSubmit, closeSection}) => {
  const [times, setTimes] = useState({
    despacho: new Date(),
    llegada: new Date(),
    termino: new Date(),
  });
  const [showTimePickers, setShowTimePickers] = useState({
    despacho: false,
    llegada: false,
    termino: false,
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

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);

    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <Formik
      initialValues={{
        atencion_fecha: '',
        despacho_hora: '',
        llegada_hora: '',
        termino_hora: '',
      }}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        values.atencion_fecha = date;
        values.despacho_hora = times.despacho;
        values.llegada_hora = times.llegada;
        values.termino_hora = times.termino;

        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View>
          <View style={{marginTop: 6}}>
            <Text style={styles.layoutFormulario}>Seleccione la Fecha</Text>
            <TouchableOpacity onPress={toggleDatePicker}>
              <TextInput
                style={styles.input}
                editable={false}
                placeholder="Seleccione una fecha"
                onChangeText={handleChange('atencion_fecha')}
                onBlur={handleBlur('atencion_fecha')}
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
          
          {Object.entries(times).map(([type, time]) => (
            <View key={type}>
              <Text style={styles.layoutFormulario}>
                Hora de {type[0].toUpperCase() + type.slice(1)}:
              </Text>
              <TouchableOpacity onPress={() => toggleTimePicker(type)}>
                <TextInput
                  style={styles.input}
                  editable={false}
                  placeholder="Seleccione una hora"
                  value={time.toLocaleTimeString()}
                />
              </TouchableOpacity>

              {showTimePickers[type] && (
                <DateTimePicker
                  mode="time"
                  display="spinner"
                  value={time}
                  onChange={(event, selectedTime) =>
                    handleTimeChange(type, event, selectedTime)
                  }
                />
              )}
            </View>
          ))}
          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default Cronometria;
