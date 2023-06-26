import {Formik} from 'formik';
import {View, Text, Button} from 'react-native';
import {styles} from '../styles/styles';

const Hospital = ({onFormSubmit, closeSection}) => {
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
          <Text style={styles.layoutFormulario}>
            Institución a la que se traslada:
          </Text>

          <Button title="Guardar" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};
export default Hospital;
