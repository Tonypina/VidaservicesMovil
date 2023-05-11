import {Formik} from 'formik';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import React, {useState, memo} from 'react';
import {styles} from '../styles/styles';
import DateTimePicker from '@react-native-community/datetimepicker';

const SignosVitales = ({onFormSubmit, closeSection}) => {
  const [times, setTimes] = useState({
    basal: new Date(),
  });

  const [showTimePickers, setShowTimePickers] = useState({
    basal: false,
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
        hora_basal: '',
        frecuencia_cardiaca: '',
        frecuencia_respiratoria: '',
        mgdl: '',
        sao2: '',
        tas_tad: '',
        temperatura: '',
        glasgow: '',
        pupilas: '',
      }}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal

        values.hora_basal = times.basal;

        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View>
          {Object.entries(times).map(([type, time]) => (
            <View key={type}>
              <Text style={styles.layoutFormulario}>
                Hora Basal ({type[0].toUpperCase() + type.slice(1)}):
              </Text>
              <TouchableOpacity onPress={() => toggleTimePicker(type)}>
                <TextInput
                  style={styles.input}
                  editable={false}
                  placeholder="Ingrese Seleccione una hora"
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

          <Text style={styles.layoutFormulario}>Frecuencia Cardiaca: </Text>
          <TextInput
            placeholder="Ingrese Frecuencia Cardiaca"
            style={styles.input}
            onChangeText={handleChange('frecuencia_cardiaca')}
            onBlur={handleBlur('frecuencia_cardiaca')}
            value={values.frecuencia_cardiaca}
          />

          <Text style={styles.layoutFormulario}>Frecuencia Respiratoria: </Text>
          <TextInput
            placeholder="Ingrese Frecuencia Respiratoria"
            style={styles.input}
            onChangeText={handleChange('frecuencia_respiratoria')}
            onBlur={handleBlur('frecuencia_respiratoria')}
            value={values.frecuencia_respiratoria}
          />

          <Text style={styles.layoutFormulario}>mg/dL: </Text>
          <TextInput
            placeholder="Ingrese mg/dL"
            style={styles.input}
            onChangeText={handleChange('mgdl')}
            onBlur={handleBlur('mgdl')}
            value={values.mgdl}
          />
          <Text style={styles.layoutFormulario}>SaO2: </Text>
          <TextInput
            placeholder="Ingrese SaO2"
            style={styles.input}
            onChangeText={handleChange('sao2')}
            onBlur={handleBlur('sao2')}
            value={values.sao2}
          />

          <Text style={styles.layoutFormulario}>TAS/TAD: </Text>
          <TextInput
            placeholder="Ingrese TAS/TAD"
            style={styles.input}
            onChangeText={handleChange('tas_tad')}
            onBlur={handleBlur('tas_tad')}
            value={values.tas_tad}
          />

          <Text style={styles.layoutFormulario}>Temperatura: </Text>
          <TextInput
            placeholder="Ingrese Temperatura"
            style={styles.input}
            onChangeText={handleChange('temperatura')}
            onBlur={handleBlur('temperatura')}
            value={values.temperatura}
          />

          <Text style={styles.layoutFormulario}>Glasgow: </Text>
          <TextInput
            placeholder="Ingrese Glasgow"
            style={styles.input}
            onChangeText={handleChange('glasgow')}
            onBlur={handleBlur('glasgow')}
            value={values.glasgow}
          />

          <Text style={styles.layoutFormulario}>Pupilas: </Text>
          <TextInput
            placeholder="Ingrese Pupilas"
            style={styles.input}
            onChangeText={handleChange('pupilas')}
            onBlur={handleBlur('pupilas')}
            value={values.pupilas}
          />

          <Button
            title="Guardar"
            onPress={() => {
              handleSubmit();
              onFormSubmit(values);
            }}
          />
        </View>
      )}
    </Formik>
  );
};
export default SignosVitales;
