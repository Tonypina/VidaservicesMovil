import {useState} from 'react';
import {View, Button, TouchableOpacity, Text, TextInput} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Formik} from 'formik';
import {styles} from '../styles/styles';
import {Dropdown} from 'react-native-element-dropdown';

const CronometriaCancelacion = ({
  onFormSubmit, closeSection,
}) => {
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

  const momentoCancelacion = [
    {label: 'Antes de 15 min.',    value: 'A'},
    {label: 'Después de 15 min.',  value: 'D'},
    {label: 'A arrivo',            value: 'R'},
  ];

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

  const [isFocus, setIsFocus] = useState(false);

  return (
    <Formik
      initialValues={{
        hora_despacho: '',
        hora_cancelacion: '',
        momento_cancelacion: '',
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

          <Text style={styles.layoutFormulario}>Momento De Cancelación:</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={momentoCancelacion}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Momento de cancelación ' : '...'}
            searchPlaceholder="Busca..."
            value={values.momento_cancelacion}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              values.momento_cancelacion = item.value;
              setIsFocus(false);
            }}
          />

          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default CronometriaCancelacion;
