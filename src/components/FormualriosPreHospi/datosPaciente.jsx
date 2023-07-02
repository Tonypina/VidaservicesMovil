import {Formik} from 'formik';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';
import {useState} from 'react';
import RadioGroup from 'react-native-radio-buttons-group';

const DatosPaciente = ({onFormSubmit, closeSection}) => {
  // Sexo del paciente
  const SEXO_PACIENTE = [
    {
      id: 1,
      label: 'Masculino',
      value: 'masculino',
    },
    {
      id: 2,
      label: 'Femenino',
      value: 'femenino',
    },
  ];

  const [selectedSexo, setSelectedSexo] = useState(SEXO_PACIENTE);

  return (
    <Formik
      initialValues={{
        nombre_media_filiacion: '',
        sexo: '',
        edad: '',
        domicilio: '',
        colonia_comunidad_alcaldiaPolitica: '',
        municipio: '',
        telefono: '',
        ocupacion: '',
        derechohabitante: '',
        compañia_seguros_gastos_medicos: '',
      }}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View>
          <Text style={styles.layoutFormulario}>Nombre o media filiación:</Text>
          <TextInput
            placeholder="Ingresa el nombre de media filiación"
            style={styles.input}
            onChangeText={handleChange('nombre_media_filiacion')}
            onBlur={handleBlur('nombre_media_filiacion')}
            value={values.nombre_media_filiacion}
          />

          <View style={{}}>
            <Text style={styles.layoutFormulario}>Sexo: </Text>
            <RadioGroup
              radioButtons={selectedSexo}
              containerStyle={styles.radioGroup}
              onPress={newSelectedSexo => {
                setSelectedSexo(newSelectedSexo);
                const selectedButton = newSelectedSexo.find(rb => rb.selected);
                if (selectedButton) {
                  values.sexo = selectedButton.id === 1 ? 0 : 1;
                }
              }}
            />
          </View>

          <Text style={styles.layoutFormulario}>Edad:</Text>
          <TextInput
            placeholder="Ingresa la edad"
            style={styles.input}
            onChangeText={handleChange('edad')}
            onBlur={handleBlur('edad')}
            value={values.edad}
            keyboardType="numeric"
          />

          <Text style={styles.layoutFormulario}>Domicilio:</Text>
          <TextInput
            placeholder="Ingresa el domicilio"
            style={styles.input}
            onChangeText={handleChange('domicilio')}
            onBlur={handleBlur('domicilio')}
            value={values.domicilio}
          />

          <Text style={styles.layoutFormulario}>
            Colonia/Comunidad/Alcaldía/Política:
          </Text>
          <TextInput
            placeholder="Ingresa la colonia, comunidad, alcaldía o política"
            style={styles.input}
            onChangeText={handleChange('colonia_comunidad_alcaldiaPolitica')}
            onBlur={handleBlur('colonia_comunidad_alcaldiaPolitica')}
            value={values.colonia_comunidad_alcaldiaPolitica}
          />

          <Text style={styles.layoutFormulario}>Municipio:</Text>
          <TextInput
            placeholder="Ingresa el municipio"
            style={styles.input}
            onChangeText={handleChange('municipio')}
            onBlur={handleBlur('municipio')}
            value={values.municipio}
          />

          <Text style={styles.layoutFormulario}>Teléfono:</Text>
          <TextInput
            placeholder="Ingresa el teléfono"
            style={styles.input}
            keyboardType="phone-pad"
            onChangeText={handleChange('telefono')}
            onBlur={handleBlur('telefono')}
            value={values.telefono}
          />

          <Text style={styles.layoutFormulario}>Ocupación:</Text>
          <TextInput
            placeholder="Ingresa la ocupación"
            style={styles.input}
            onChangeText={handleChange('ocupacion')}
            onBlur={handleBlur('ocupacion')}
            value={values.ocupacion}
          />

          <Text style={styles.layoutFormulario}>Derechohabiente:</Text>
          <TextInput
            placeholder="Ingresa el derechohabiente"
            style={styles.input}
            onChangeText={handleChange('derechohabitante')}
            onBlur={handleBlur('derechohabitante')}
            value={values.derechohabitante}
          />

          <Text style={styles.layoutFormulario}>
            Compañía de seguros/gastos médicos:
          </Text>
          <TextInput
            placeholder="Ingresa la compañía de seguros/gastos médicos"
            style={styles.input}
            onChangeText={handleChange('compañia_seguros_gastos_medicos')}
            onBlur={handleBlur('compañia_seguros_gastos_medicos')}
            value={values.compañia_seguros_gastos_medicos}
          />

          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default DatosPaciente;
