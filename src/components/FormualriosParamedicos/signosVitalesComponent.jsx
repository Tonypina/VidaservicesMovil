import React, {useState, useCallback} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';

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
          {errors.signosVitales &&
          errors.signosVitales[index] &&
          errors.signosVitales[index].hora_basal ? (
            <Text style={styles.errorMensaje}>
              {errors.signosVitales[index].hora_basal}
            </Text>
          ) : null}

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
            keyboardType='numeric'
            onChangeText={handleChange(`signosVitales.${index}.TAS`)}
            onBlur={handleBlur(`signosVitales.${index}.TAS`)}
            value={signoVital.TAS}
            placeholder="TAS"
          />
          {errors.signosVitales &&
          errors.signosVitales[index] &&
          errors.signosVitales[index].TAS ? (
            <Text style={styles.errorMensaje}>
              {errors.signosVitales[index].TAS}
            </Text>
          ) : null}

          <TextInput
            style={styles.input}
            keyboardType='numeric'
            onChangeText={handleChange(`signosVitales.${index}.TAD`)}
            onBlur={handleBlur(`signosVitales.${index}.TAD`)}
            value={signoVital.TAD}
            placeholder="TAD"
          />
          {errors.signosVitales &&
          errors.signosVitales[index] &&
          errors.signosVitales[index].TAD ? (
            <Text style={styles.errorMensaje}>
              {errors.signosVitales[index].TAD}
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
        </View>
      ))}
      {arrayHelpers.form.values.signosVitales.length > 1 ? (
        <TouchableOpacity
          style={styles.removeBoton}
          onPress={() => {
            arrayHelpers.pop();
          }}>
          <Text style={styles.textWhite}>Eliminar Último Signo Vital</Text>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity
        style={styles.addBoton}
        onPress={() => {
          arrayHelpers.push({
            hora_basal: '',
            frecuencia_cardiaca: '',
            frecuencia_respiratoria: '',
            TAS: '',
            TAD: '',
            sao2: '',
            temperatura: '',
            mgdl: '',
          });
        }}>
        <Text style={styles.textWhite}>Agregar Signo Vital</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(SignosVitalesComponent);
