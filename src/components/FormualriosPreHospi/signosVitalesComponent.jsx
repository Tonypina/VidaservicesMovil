import React, {useState, useCallback} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';

const ExamenNeuro = [
  {label: 'A', value: 'A'},
  {label: 'V', value: 'V'},
  {label: 'D', value: 'D'},
  {label: 'I', value: 'I'}
]

// Componente para los campos de "Signos Vitales"
const SignosVitalesComponent = ({
  signosVitales,
  arrayHelpers,
  handleChange,
  handleBlur,
  errors,
  setFieldValue,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const onChange = useCallback(
    (value, index) => {
      setFieldValue(`signosVitales.${index}.examen_neurologico`, value.value);
    },
    [setFieldValue],
  );

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
    <View>
      {signosVitales.map((signoVital, index) => (
        <View key={index}>
          <Text style={styles.layoutFormularioUnderline}>
            Signo Vital #{index + 1}
          </Text>
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
                  onChange={(event, selectedTime) => {
                    handleTimeChange(type, event, selectedTime)
                    signoVital.hora_basal = times.basal;
                  }}
                />
              )}
            </View>
          ))}

          <TextInput
            style={styles.input}
            keyboardType='numeric'
            onChangeText={handleChange(`signosVitales.${index}.frecuencia_respiratoria`)}
            onBlur={handleBlur(`signosVitales.${index}.frecuencia_respiratoria`)}
            value={signoVital.frecuencia_respiratoria}
            placeholder="FR"
          />
          {errors.signosVitales &&
          errors.signosVitales[index] &&
          errors.signosVitales[index].frecuencia_respiratoria ? (
            <Text style={styles.errorMensaje}>
              {errors.signosVitales[index].frecuencia_respiratoria}
            </Text>
          ) : null}
          <TextInput
            style={styles.input}
            keyboardType='numeric'
            onChangeText={handleChange(`signosVitales.${index}.frecuencia_cardiaca`)}
            onBlur={handleBlur(`signosVitales.${index}.frecuencia_cardiaca`)}
            value={signoVital.frecuencia_cardiaca}
            placeholder="FC"
          />
          {errors.signosVitales &&
          errors.signosVitales[index] &&
          errors.signosVitales[index].frecuencia_cardiaca ? (
            <Text style={styles.errorMensaje}>
              {errors.signosVitales[index].frecuencia_cardiaca}
            </Text>
          ) : null}
          <TextInput
            style={styles.input}
            // keyboardType='numeric'
            onChangeText={handleChange(`signosVitales.${index}.tas_tad`)}
            onBlur={handleBlur(`signosVitales.${index}.tas_tad`)}
            value={signoVital.tas_tad}
            placeholder="TAS / TAD"
          />
          {errors.signosVitales &&
          errors.signosVitales[index] &&
          errors.signosVitales[index].tas_tad ? (
            <Text style={styles.errorMensaje}>
              {errors.signosVitales[index].tas_tad}
            </Text>
          ) : null}
          <TextInput
            style={styles.input}
            keyboardType='numeric'
            onChangeText={handleChange(`signosVitales.${index}.sao2`)}
            onBlur={handleBlur(`signosVitales.${index}.sao2`)}
            value={signoVital.sao2}
            placeholder="SaO2"
          />
          {errors.signosVitales &&
          errors.signosVitales[index] &&
          errors.signosVitales[index].sao2 ? (
            <Text style={styles.errorMensaje}>
              {errors.signosVitales[index].sao2}
            </Text>
          ) : null}
          <TextInput
            style={styles.input}
            keyboardType='numeric'
            onChangeText={handleChange(`signosVitales.${index}.temperatura`)}
            onBlur={handleBlur(`signosVitales.${index}.temperatura`)}
            value={signoVital.temperatura}
            placeholder="Temperatura"
          />
          {errors.signosVitales &&
          errors.signosVitales[index] &&
          errors.signosVitales[index].temperatura ? (
            <Text style={styles.errorMensaje}>
              {errors.signosVitales[index].temperatura}
            </Text>
          ) : null}
          <TextInput
            style={styles.input}
            keyboardType='numeric'
            onChangeText={handleChange(`signosVitales.${index}.mgdl`)}
            onBlur={handleBlur(`signosVitales.${index}.mgdl`)}
            value={signoVital.mgdl}
            placeholder="mgdl"
          />
          {errors.signosVitales &&
          errors.signosVitales[index] &&
          errors.signosVitales[index].mgdl ? (
            <Text style={styles.errorMensaje}>
              {errors.signosVitales[index].mgdl}
            </Text>
          ) : null}
          <TextInput
            style={styles.input}
            keyboardType='numeric'
            onChangeText={handleChange(`signosVitales.${index}.ekg`)}
            onBlur={handleBlur(`signosVitales.${index}.ekg`)}
            value={signoVital.ekg}
            placeholder="EKG"
          />
          {errors.signosVitales &&
          errors.signosVitales[index] &&
          errors.signosVitales[index].ekg ? (
            <Text style={styles.errorMensaje}>
              {errors.signosVitales[index].ekg}
            </Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Mini Examen Neurológico:</Text>
          <Dropdown
            autoScroll={false}
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={ExamenNeuro}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Selecciona' : '...'}
            searchPlaceholder="Busca..."
            value={signosVitales[index].examen_neurologico} // Usar el valor correcto
            onChange={value => onChange(value, index)}
          />

          {errors.signosVitales &&
          errors.signosVitales[index] &&
          errors.signosVitales[index].examen_neurologico ? (
            <Text style={styles.errorMensaje}>
              {errors.signosVitales[index].examen_neurologico}
            </Text>
          ) : null}
        </View>
      ))}
      <TouchableOpacity
        style={styles.addBoton}
        onPress={() => {
          arrayHelpers.push({
            hora_basal: '',
            frecuencia_cardiaca: '',
            frecuencia_respiratoria: '',
            tas_tad: '',
            sao2: '',
            temperatura: '',
            mgdl: '',
            ekg: '',
            examen_neurologico: '',
          });
        }}>
        <Text style={styles.textWhite}>Agregar Signo Vital</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(SignosVitalesComponent);
