import {Formik} from 'formik';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {styles} from '../styles/styles';
import SignatureViewWrapper from './signatureViewWraper';
import {useRef, useState} from 'react';

const Hospital = ({onFormSubmit, closeSection}) => {
  const [signatures, setSignatures] = useState({
    patient: {data: null, isSaved: false, view: useRef(null)},
    doctor: {data: null, isSaved: false, view: useRef(null)},
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
      initialValues={{institucion_traslado: ''}}
      onSubmit={values => {
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View>
          <Text style={styles.layoutFormulario}>
            Institución a la que se traslada:
          </Text>
          <TextInput
            placeholder="Ingresa Institución"
            style={styles.input}
            onChangeText={handleChange('institucion_traslado')}
            onBlur={handleBlur('institucion_traslado')}
            value={values.institucion_traslado}
          />
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
