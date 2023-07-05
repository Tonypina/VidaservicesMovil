import {useState} from 'react';
import {View, Button, TouchableOpacity, Text, TextInput} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Formik} from 'formik';
import {styles} from '../styles/styles';

const CronometriaCancelacion = ({onFormSubmit, closeSection}) => {
  const [times, setTimes] = useState({
    despacho: new Date(),
    cancelacion: new Date(),
  });
  const [showTimePickers, setShowTimePickers] = useState({
    despacho: false,
    cancelacion: false,
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
        hora_despacho: '',
        hora_cancelacion: '',
      }}
      onSubmit={values => {
        values.hora_despacho = times.despacho;
        values.hora_cancelacion = times.cancelacion;

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
          <Button title="Guardar" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};
export default CronometriaCancelacion;
