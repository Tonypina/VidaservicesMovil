import {Formik} from 'formik';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';
import {useState} from 'react';
import RadioGroup from 'react-native-radio-buttons-group';
import {object} from 'yup';
import {
  validacionTexto,
  validacionNumero,
  validacionObligatoria,
  validacionTelefono,
} from '../validaciones';

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

  const validationSchema = object().shape({
    paciente_nombre: validacionTexto(),
    paciente_calle: validacionTexto(),
    paciente_edad: validacionNumero(),
    paciente_nombre: validacionTexto(),
    paciente_sexo: validacionObligatoria(),
    paciente_calle: validacionTexto(),
    paciente_colonia: validacionTexto(),
    paciente_alcaldia: validacionTexto(),
    paciente_contacto: validacionTelefono(),
    paciente_ocupacion: validacionTexto(),
    derechohabiente_a: validacionTexto(),
    compania_sgm: validacionTexto(),
  });

  const [selectedSexo, setSelectedSexo] = useState(SEXO_PACIENTE);

  return (
    <Formik
      initialValues={{
        paciente_nombre: '',
        paciente_sexo: '',
        paciente_edad: '',
        paciente_calle: '',
        paciente_colonia: '',
        paciente_alcaldia: '',
        paciente_contacto: '',
        paciente_ocupacion: '',
        derechohabiente_a: '',
        compania_sgm: '',
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View>
          <Text style={styles.layoutFormulario}>Nombre o media filiación:</Text>
          <TextInput
            placeholder="Ingresa el nombre de media filiación"
            style={styles.input}
            onChangeText={handleChange('paciente_nombre')}
            onBlur={handleBlur('paciente_nombre')}
            value={values.paciente_nombre}
          />
          {touched.paciente_nombre && errors.paciente_nombre ? (
            <Text style={styles.errorMensaje}>{errors.paciente_nombre}</Text>
          ) : null}

          <View style={{}}>
            <Text style={styles.layoutFormulario}>Sexo: </Text>
            <RadioGroup
              radioButtons={selectedSexo}
              containerStyle={styles.radioGroup}
              onPress={newSelectedSexo => {
                setSelectedSexo(newSelectedSexo);
                const selectedButton = newSelectedSexo.find(rb => rb.selected);
                if (selectedButton) {
                  values.paciente_sexo = selectedButton.id === 1 ? 0 : 1;
                }
              }}
            />
          </View>
          {touched.paciente_sexo && errors.paciente_sexo ? (
            <Text style={styles.errorMensaje}>{errors.paciente_sexo}</Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Edad:</Text>
          <TextInput
            placeholder="Ingresa la edad"
            style={styles.input}
            onChangeText={handleChange('paciente_edad')}
            onBlur={handleBlur('paciente_edad')}
            value={values.paciente_edad}
            keyboardType="numeric"
          />
          {touched.paciente_edad && errors.paciente_edad ? (
            <Text style={styles.errorMensaje}>{errors.paciente_edad}</Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Domicilio:</Text>
          <TextInput
            placeholder="Ingresa el domicilio"
            style={styles.input}
            onChangeText={handleChange('paciente_calle')}
            onBlur={handleBlur('paciente_calle')}
            value={values.paciente_calle}
          />
          {touched.paciente_calle && errors.paciente_calle ? (
            <Text style={styles.errorMensaje}>{errors.paciente_calle}</Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Colonia/Comunidad:</Text>
          <TextInput
            placeholder="Ingresa la colonia o comunidad"
            style={styles.input}
            onChangeText={handleChange('paciente_colonia')}
            onBlur={handleBlur('paciente_colonia')}
            value={values.paciente_colonia}
          />
          {touched.paciente_colonia && errors.paciente_colonia ? (
            <Text style={styles.errorMensaje}>{errors.paciente_colonia}</Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Municipio:</Text>
          <TextInput
            placeholder="Ingresa el municipio"
            style={styles.input}
            onChangeText={handleChange('paciente_alcaldia')}
            onBlur={handleBlur('paciente_alcaldia')}
            value={values.paciente_alcaldia}
          />
          {touched.paciente_alcaldia && errors.paciente_alcaldia ? (
            <Text style={styles.errorMensaje}>{errors.paciente_alcaldia}</Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Teléfono:</Text>
          <TextInput
            placeholder="Ingresa el teléfono"
            style={styles.input}
            keyboardType="phone-pad"
            onChangeText={handleChange('paciente_contacto')}
            onBlur={handleBlur('paciente_contacto')}
            value={values.paciente_contacto}
          />
          {touched.paciente_contacto && errors.paciente_contacto ? (
            <Text style={styles.errorMensaje}>{errors.paciente_contacto}</Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Ocupación:</Text>
          <TextInput
            placeholder="Ingresa la ocupación"
            style={styles.input}
            onChangeText={handleChange('paciente_ocupacion')}
            onBlur={handleBlur('paciente_ocupacion')}
            value={values.paciente_ocupacion}
          />
          {touched.paciente_ocupacion && errors.paciente_ocupacion ? (
            <Text style={styles.errorMensaje}>{errors.paciente_ocupacion}</Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Derechohabiente:</Text>
          <TextInput
            placeholder="Ingresa el derechohabiente"
            style={styles.input}
            onChangeText={handleChange('derechohabiente_a')}
            onBlur={handleBlur('derechohabiente_a')}
            value={values.derechohabiente_a}
          />

          {touched.derechohabiente_a && errors.derechohabiente_a ? (
            <Text style={styles.errorMensaje}>{errors.derechohabiente_a}</Text>
          ) : null}

          <Text style={styles.layoutFormulario}>
            Compañía de seguros/gastos médicos:
          </Text>
          <TextInput
            placeholder="Ingresa la compañía de seguros/gastos médicos"
            style={styles.input}
            onChangeText={handleChange('compania_sgm')}
            onBlur={handleBlur('compania_sgm')}
            value={values.compania_sgm}
          />
          {touched.compania_sgm && errors.compania_sgm ? (
            <Text style={styles.errorMensaje}>{errors.compania_sgm}</Text>
          ) : null}

          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default DatosPaciente;
