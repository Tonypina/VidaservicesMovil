import {useState} from 'react';
import {View, TouchableOpacity, Text, TextInput} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Formik} from 'formik';
import {styles} from '../styles/styles';
import {Dropdown} from 'react-native-element-dropdown';
import {validacionTexto, validacionNumero} from '../validaciones';
import {object} from 'yup';

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

  const momentoCancelacion = [
    {label: 'Antes de 15 min.', value: 'A'},
    {label: 'Después de 15 min.', value: 'D'},
    {label: 'A arrivo', value: 'R'},
  ];

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

  const validationSchema = object().shape({
    folio: validacionNumero(),
    momento_cancelacion: validacionTexto(),
  });

  return (
    <Formik
      initialValues={{
        folio: '',
        atencion_fecha: '',
        despacho_hora: '',
        cancelacion_hora: '',
        momento_cancelacion: '',
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        values.atencion_fecha = date;
        values.despacho_hora = times.despacho;
        values.cancelacion_hora = times.cancelacion;

        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View>
          <Text style={styles.layoutFormulario}>Folio: </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.prefix}>E -</Text>
            <TextInput
              placeholder="Ingresa el folio"
              inputMode="numeric"
              keyboardType="numeric"
              onChangeText={handleChange('folio')}
              onBlur={handleBlur('folio')}
            />
          </View>
          {errors.folio ? (
            <Text style={styles.errorMensaje}>{errors.folio}</Text>
          ) : null}
          
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
          {errors.momento_cancelacion ? (
            <Text style={styles.errorMensaje}>
              {errors.momento_cancelacion}
            </Text>
          ) : null}

          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default CronometriaCancelacion;