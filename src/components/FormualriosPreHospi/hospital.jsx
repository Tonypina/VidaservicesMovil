import {Formik} from 'formik';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {styles} from '../styles/styles';
import SignatureViewWrapper from './signatureViewWraper';
import {useRef, useState} from 'react';
import {object, array} from 'yup';
import {validacionTexto} from './validaciones';

const Hospital = ({onFormSubmit, closeSection}) => {
  const [signatures, setSignatures] = useState({
    patient: {data: null, isSaved: false, view: useRef(null)},
    doctor: {data: null, isSaved: false, view: useRef(null)},
  });

  const validationSchema = object().shape({
    institucion: validacionTexto(),
  });

  const onSave = type => result => {
    setSignatures(prevState => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        data: `data:image/png;base64,${result.encoded}`,
        isSaved: true,
      },
    }));
    signatures[type].view.current.show(false);
  };

  const onClear = type => () => {
    setSignatures(prevState => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        data: null,
        isSaved: false,
      },
    }));
  };

  return (
    <Formik
      initialValues={{institucion: ''}}
      validationSchema={validationSchema}
      onSubmit={values => {
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View>
          <Text style={styles.layoutFormulario}>
            Institución a la que se traslada:
          </Text>
          <TextInput
            placeholder="Ingresa Institución"
            style={styles.input}
            onChangeText={handleChange('institucion')}
            onBlur={handleBlur('institucion')}
            value={values.institucion}
          />
          {errors.institucion ? (
            <Text style={{color: 'red'}}>{errors.institucion}</Text>
          ) : null}
          <SignatureViewWrapper
            title="Paciente"
            signatureData={signatures.patient.data}
            onShow={() => signatures.patient.view.current.show(true)}
            onSave={onSave('patient')}
            onClear={onClear('patient')}
            signatureView={signatures.patient.view}
          />
          <SignatureViewWrapper
            title="Médico"
            signatureData={signatures.doctor.data}
            onShow={() => signatures.doctor.view.current.show(true)}
            onSave={onSave('doctor')}
            onClear={onClear('doctor')}
            signatureView={signatures.doctor.view}
          />
          {signatures.patient.isSaved && signatures.doctor.isSaved && (
            <View style={{alignItems: 'center', marginTop: 30}}></View>
          )}
          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default Hospital;
