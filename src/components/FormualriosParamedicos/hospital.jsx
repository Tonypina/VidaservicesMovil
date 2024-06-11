import {Formik} from 'formik';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';
import SignatureViewWrapper from './signatureViewWraper';
import {useRef, useState} from 'react';
import {object} from 'yup';
import {validacionNumero, validacionNumeroNR, validacionTexto, validacionTextoNR} from '../validaciones';
import {Dropdown} from 'react-native-element-dropdown';
import { err } from 'react-native-svg/lib/typescript/xml';

const validationSchema = object().shape({
  isTrasladado: validacionNumero(),
  comentarios: validacionTextoNR(),
  proveedor_traslado: validacionTexto().when(
    'isTrasladado',
    {
      is: isTrasladado =>
      isTrasladado === 1,
      then: () => validacionTexto(),
      otherwise: () => validacionTextoNR(),
    }
  ),
  institucion: validacionTexto().when(
    'isTrasladado',
    {
      is: isTrasladado =>
      isTrasladado === 1,
      then: () => validacionTexto(),
      otherwise: () => validacionTextoNR(),
    },
  ),
  pase_medico_a: validacionNumero().when(
    'isTrasladado',
    {
      is: isTrasladado =>
      isTrasladado === 0,
      then: () => validacionNumero(),
      otherwise: () => validacionNumeroNR()
    },
  ),
});
const Hospital = ({onFormSubmit, closeSection}) => {
  const [signatures, setSignatures] = useState({
    ajustador: {data: null, isSaved: false, view: useRef(null)},
    paciente: {data: null, isSaved: false, view: useRef(null)},
    traslado: {data: null, isSaved: false, view: useRef(null)},
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

  const booleanYn = [
    {label: 'No', value: 0},
    {label: 'Sí', value: 1}
  ];

  const paseMedicoOptions = [
    {label: 'Ajustador', value: 1},
    {label: 'Paramédico', value: 2},
    {label: 'Paciente', value: 3},
    {label: 'No lo requiere', value: 4},
  ];

  const [isFocus, setIsFocus] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);

  return (
    <Formik
      initialValues={{
        isTrasladado: '',
        proveedor_traslado: '',
        institucion: '',
        pase_medico_a: '',
        comentarios: '',
        ajustador_firma: '',
        paciente_firma: '',
        traslado_firma: '',
      }}
      validationSchema={validationSchema}
      onSubmit={values => {

        values.ajustador_firma = signatures.ajustador.data;
        values.paciente_firma = signatures.paciente.data;
        values.traslado_firma = signatures.traslado.data;

        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View>
          <Text style={styles.layoutFormulario}>(*) Datos Opcionales</Text>
          <Text style={styles.layoutFormulario}>¿Se realiza traslado en ambulancia?</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={booleanYn}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Selecciona' : '...'}
            searchPlaceholder="Busca..."
            value={values.isTrasladado}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              values.isTrasladado = item.value;
              setIsFocus(false);
              setSelectedOption(item.value);
            }}
          />
          {errors.isTrasladado ? (
            <Text style={styles.errorMensaje}>{errors.isTrasladado}</Text>
          ) : null}
          
          {selectedOption ? (
            <>
              <Text style={styles.layoutFormulario}>
                Proveedor que realiza el traslado:
              </Text>
              <TextInput
                placeholder="Ingresa Proveedor"
                style={styles.input}
                onChangeText={handleChange('proveedor_traslado')}
                onBlur={handleBlur('proveedor_traslado')}
                value={values.proveedor_traslado}
              />
              {errors.proveedor_traslado ? (
                <Text style={styles.errorMensaje}>{errors.proveedor_traslado}</Text>
              ) : null}

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
            </>
          ) : null}

          {!selectedOption ? 
            <>
              <Text style={styles.layoutFormulario}>Se otorga pase médico:</Text>
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={paseMedicoOptions}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Selecciona' : '...'}
                searchPlaceholder="Busca..."
                value={values.pase_medico_a}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  values.pase_medico_a = item.value;
                  setIsFocus(false);
                }}
              />
              {errors.pase_medico_a ? (
                <Text style={styles.errorMensaje}>{errors.pase_medico_a}</Text>
              ) : null}
            </>
          : null}

          <SignatureViewWrapper
            title="Ajustador"
            signatureData={signatures.ajustador.data}
            onShow={() => signatures.ajustador.view.current.show(true)}
            onSave={onSave('ajustador')}
            onClear={onClear('ajustador')}
            signatureView={signatures.ajustador.view}
          />

          <Text style={{color: '#284D95'}}>
            BRINDO MI CONSENTIMIENTO PARA MI EVALUACIÓN FÍSICA PREHOSPITALARIA O DE MI FAMILIAR Y ACEPTO EL AVISO DE PRIVACIDAD DE VIDASSISTANCE S.A. DE C.V. QUE PUEDO CONSULTAR EN www.vidassistance.com
          </Text>
          <SignatureViewWrapper
            title="Paciente"
            signatureData={signatures.paciente.data}
            onShow={() => signatures.paciente.view.current.show(true)}
            onSave={onSave('paciente')}
            onClear={onClear('paciente')}
            signatureView={signatures.paciente.view}
          />

          {selectedOption ? (
            <>
              <SignatureViewWrapper
                title="Traslado"
                signatureData={signatures.traslado.data}
                onShow={() => signatures.traslado.view.current.show(true)}
                onSave={onSave('traslado')}
                onClear={onClear('traslado')}
                signatureView={signatures.traslado.view}
              />
            </>
          ) : null}
          {signatures.ajustador.isSaved && signatures.paciente.isSaved && (
            <View style={{alignItems: 'center', marginTop: 30}}></View>
          )}

          <Text style={styles.layoutFormulario}>
            *Comentarios Adicionales:
          </Text>
          <TextInput
            placeholder="Ingresa los comentarios"
            style={styles.input}
            onChangeText={handleChange('comentarios')}
            onBlur={handleBlur('comentarios')}
            value={values.comentarios}
          />
          {touched.comentarios && errors.comentarios ? (
            <Text style={styles.errorMensaje}>{errors.comentarios}</Text>
          ) : null}

          <TouchableOpacity style={styles.botonSave} onPress={ () => {
            handleSubmit()
          }}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default Hospital;
