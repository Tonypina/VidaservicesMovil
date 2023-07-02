import {Formik} from 'formik';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';

const EvaluacionSecundaria = ({onFormSubmit, closeSection}) => {
  return (
    <Formik
      initialValues={{
        exploracion_fisica: '',
        zona_lesiones: '',
        pupilas: '',
        signos_virtuales_monitoreo: '',
      }}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View>
          <Text style={styles.layoutFormulario}>Exploración Física:</Text>

          <Text style={styles.layoutFormulario}>Zona de Lesiones:</Text>

          <Text style={styles.layoutFormulario}>Pupilas:</Text>

          <Text style={styles.layoutFormulario}>
            Signos Virtuales y Monitoreo:
          </Text>

          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default EvaluacionSecundaria;
