import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';

// Componente para los campos de "Signos Vitales"
const SignosVitalesComponent = ({
  signosVitales,
  arrayHelpers,
  handleChange,
  handleBlur,
}) => {
  return (
    <View>
      {signosVitales.map((signoVital, index) => (
        <View key={index}>
          <Text style={styles.layoutFormulario}>Signo Vital #{index + 1}</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange(`signosVitales.${index}.hora`)}
            onBlur={handleBlur(`signosVitales.${index}.hora`)}
            value={signoVital.hora}
            placeholder="Hora"
          />
          <TextInput
            style={styles.input}
            onChangeText={handleChange(`signosVitales.${index}.fr`)}
            onBlur={handleBlur(`signosVitales.${index}.FR`)}
            value={signoVital.FR}
            placeholder="FR"
          />
          <TextInput
            style={styles.input}
            onChangeText={handleChange(`signosVitales.${index}.FC`)}
            onBlur={handleBlur(`signosVitales.${index}.FC`)}
            value={signoVital.FC}
            placeholder="FC"
          />
          <TextInput
            style={styles.input}
            onChangeText={handleChange(`signosVitales.${index}.TAS`)}
            onBlur={handleBlur(`signosVitales.${index}.TAS`)}
            value={signoVital.TAS}
            placeholder="TAS"
          />
          <TextInput
            style={styles.input}
            onChangeText={handleChange(`signosVitales.${index}.TAD`)}
            onBlur={handleBlur(`signosVitales.${index}.TAD`)}
            value={signoVital.TAD}
            placeholder="TAD"
          />
          <TextInput
            style={styles.input}
            onChangeText={handleChange(`signosVitales.${index}.SA2`)}
            onBlur={handleBlur(`signosVitales.${index}.SA2`)}
            value={signoVital.SA2}
            placeholder="SA2"
          />
          <TextInput
            style={styles.input}
            onChangeText={handleChange(`signosVitales.${index}.TEMP`)}
            onBlur={handleBlur(`signosVitales.${index}.TEMP`)}
            value={signoVital.TEMP}
            placeholder="TEMP"
          />
          <TextInput
            style={styles.input}
            onChangeText={handleChange(`signosVitales.${index}.GLUC`)}
            onBlur={handleBlur(`signosVitales.${index}.GLUC`)}
            value={signoVital.GLUC}
            placeholder="GLUC"
          />
          <TextInput
            style={styles.input}
            onChangeText={handleChange(`signosVitales.${index}.EKG`)}
            onBlur={handleBlur(`signosVitales.${index}.EKG`)}
            value={signoVital.EKG}
            placeholder="EKG"
          />
        </View>
      ))}
      <TouchableOpacity
        style={styles.addBoton}
        onPress={() => {
          arrayHelpers.push({
            hora: '',
            FR: '',
            FC: '',
            TAS: '',
            SA2: '',
            TEMP: '',
            EKG: '',
          });
        }}>
        <Text style={styles.textWhite}>Agregar Signo Vital</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(SignosVitalesComponent);
