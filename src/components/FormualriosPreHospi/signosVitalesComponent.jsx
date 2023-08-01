import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';

// Componente para los campos de "Signos Vitales"
const SignosVitalesComponent = ({
  signosVitales,
  arrayHelpers,
  handleChange,
  handleBlur,
  errors,
}) => {
  return (
    <View>
      {signosVitales.map((signoVital, index) => (
        <View key={index}>
          <Text style={styles.layoutFormularioUnderline}>
            Signo Vital #{index + 1}
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange(`signosVitales.${index}.hora_basal`)}
            onBlur={handleBlur(`signosVitales.${index}.hora_basal`)}
            value={signoVital.hora_basal}
            placeholder="Hora"
          />

          <TextInput
            style={styles.input}
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
          });
        }}>
        <Text style={styles.textWhite}>Agregar Signo Vital</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(SignosVitalesComponent);
