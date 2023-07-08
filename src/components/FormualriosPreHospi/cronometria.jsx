import {useState} from 'react';
import {View, Button, TouchableOpacity, Text, TextInput} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Formik} from 'formik';
import {styles} from '../styles/styles';

const Cronometria = ({onFormSubmit, closeSection}) => {
  const [times, setTimes] = useState({
    llamada: new Date(),
    salida: new Date(),
    llegada: new Date(),
    traslado: new Date(),
    hospital: new Date(),
    base: new Date(),
  });
  const [showTimePickers, setShowTimePickers] = useState({
    llamada: false,
    salida: false,
    llegada: false,
    traslado: false,
    hospital: false,
    base: false,
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
        llamada_hora: '',
        salida_hora: '',
        llegada_hora: '',
        traslado_hora: '',
        hospital_hora: '',
        base_hora: '',
      }}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        values.llamada_hora = times.llamada;
        values.salida_hora = times.salida;
        values.traslado_hora = times.traslado;
        values.hospital_hora = times.hospital;
        values.base_hora = times.base;
        values.llegada_hora = times.llegada;

        onFormSubmit(values);
        closeSection();
      }}>
      {({handleSubmit, values}) => (
        <View>
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
