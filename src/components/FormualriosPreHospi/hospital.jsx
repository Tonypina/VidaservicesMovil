import {Formik} from 'formik';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';
import SignatureViewWrapper from './signatureViewWraper';
import {useRef, useState} from 'react';
import {object} from 'yup';
import {validacionTexto} from '../validaciones';

const validationSchema = object().shape({
  institucion: validacionTexto(),
});
const Hospital = ({onFormSubmit, closeSection}) => {
  const [signatures, setSignatures] = useState({
    entrega: {data: null, isSaved: false, view: useRef(null)},
    recibe: {data: null, isSaved: false, view: useRef(null)},
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
      initialValues={{
        institucion: '',
        entrega_firma: '',
        recibe_firma: '',
      }}
      validationSchema={validationSchema}
      onSubmit={values => {

        values.entrega_firma = signatures.entrega.data
        values.recibe_firma = signatures.recibe.data

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
            <Text style={styles.errorMensaje}>{errors.institucion}</Text>
          ) : null}
          <SignatureViewWrapper
            title="Entrega"
            signatureData={signatures.entrega.data}
            onShow={() => signatures.entrega.view.current.show(true)}
            onSave={onSave('entrega')}
            onClear={onClear('entrega')}
            signatureView={signatures.entrega.view}
          />
          <SignatureViewWrapper
            title="Recibe"
            signatureData={signatures.recibe.data}
            onShow={() => signatures.recibe.view.current.show(true)}
            onSave={onSave('recibe')}
            onClear={onClear('recibe')}
            signatureView={signatures.recibe.view}
          />
          {signatures.entrega.isSaved && signatures.recibe.isSaved && (
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
