import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import RadioGroup from 'react-native-radio-buttons-group';
import {Formik} from 'formik';
import SignatureView from '../SignatureView';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const opciones = [
  {
    id: 1,
    label: 'Sí',
    value: true,
  },
  {
    id: 2,
    label: 'No',
    value: false,
  },
];

const TextInputField = ({value, onChangeText}) => {
  return (
    <TextInput style={styles.input} value={value} onChangeText={onChangeText} />
  );
};

const Aceptacion = ({onFormSubmit}) => {
  const [data, setData] = useState(null);
  const [isSignatureSaved, setIsSignatureSaved] = useState(false);
  const [isGuardarVisible, setIsGuardarVisible] = useState(true);

  const signatureView = useRef(null);

  const onSave = function (result) {
    setData(`data:image/png;base64,` + result.encoded);
    setIsSignatureSaved(true);

    signatureView.current.show(false);
  };

  const [ambulancia, setAmbulancia] = useState(false);

  const handleAmbulancia = selectedButton => {
    const {value} = selectedButton.find(b => b.selected);
    setAmbulancia(value);
  };

  return (
    <Formik
      initialValues={{
        eco: '',
        dependencia: '',
        recibe: '',
        nombre_traslado: '',
        isAccepted: false,
        firma: '',
      }}
      onSubmit={(values, {setValues}) => {
        if (isSignatureSaved) {
          setValues({...values, firma: data});
        }

        if (values.firma) {
          onFormSubmit(values);
        }
      }}>
      {({handleChange, handleSubmit, values}) => (
        <View style={styles.container}>
          <View style={styles.confirmacion}>
            <Text style={styles.confirmacionText}>Confirmación</Text>
          </View>
          <View style={styles.containerForm}>
            <Text style={styles.labelForm}>¿Se usó ambulancia?</Text>

            <RadioGroup
              radioButtons={opciones}
              onPress={handleAmbulancia}
              containerStyle={styles.radioGroup}
            />
            {ambulancia ? (
              <View style={styles.containerForm}>
                <Text style={styles.labelForm}>ECO: </Text>
                <TextInputField
                  style={styles.input}
                  onChangeText={handleChange('eco')}
                  value={values.eco}
                />
                <Text style={styles.labelForm}>Dependencia: </Text>
                <TextInputField
                  style={styles.input}
                  onChangeText={handleChange('dependencia')}
                  value={values.dependencia}
                />
                <Text style={styles.labelForm}>Recibe: </Text>
                <TextInputField
                  style={styles.input}
                  onChangeText={handleChange('recibe')}
                  value={values.recibe}
                />
                <Text style={styles.labelForm}>Nombre personal a cargo: </Text>
                <TextInputField
                  style={styles.input}
                  value={values.nombre_traslado}
                  onChangeText={handleChange('nombre_traslado')}
                />
              </View>
            ) : null}
          </View>

          <View style={styles.containerTextTerminos}>
            <Text style={styles.textoTerminos}>
              ACEPTO LOS TÉRMINOS Y CONDICIONES DE PRIVACIDAD ASÍ COMO LA
              ATENCION Y RECOMENDACIONES DEL PERSONAL VIDASSISTANCE
            </Text>
            <BouncyCheckbox
              style={styles.acceptance}
              size={25}
              fillColor="#f09f48"
              unfillColor="#FFFFFF"
              text="Acepto"
              iconStyle={{borderColor: ''}}
              innerIconStyle={{borderWidth: 2}}
              textStyle={{fontFamily: 'JosefinSans-Regular'}}
              onPress={isChecked => {
                values.isAccepted = isChecked;
              }}
            />
            <View style={styles.containerInternet}>
              <Text style={styles.textInternet}>
                [LA PUEDE CONSULTAR EN NUESTRA PAGINA DE INTERNET]
              </Text>
              <Text style={styles.textPagina}>
                http://www.vidassistance.com
              </Text>
            </View>
          </View>

          <View style={styles.containerFirma}>
            <TouchableOpacity
              onPress={() => {
                signatureView.current.show(true);
              }}>
              <View>
                <Text style={styles.titleText}>
                  {data ? 'Tu firma:' : 'Presiona para firmar'}
                </Text>
                {data && (
                  <View style={styles.imageContainer}>
                    <Image style={styles.previewImage} source={{uri: data}} />
                    <Button
                      title="Limpiar"
                      onPress={() => {
                        setData(null);
                        setIsSignatureSaved(false);
                      }}
                    />
                  </View>
                )}
              </View>
            </TouchableOpacity>
            <SignatureView
              ref={signatureView}
              rotateClockwise={true}
              onSave={onSave}
            />
          </View>

          {isSignatureSaved && isGuardarVisible ? (
            <View style={{alignItems: 'center', marginTop: 30}}>
              <TouchableOpacity
                style={styles.botonConfirm}
                onPress={() => {
                  handleSubmit();
                  handleSubmit();
                  setIsGuardarVisible(false);
                }}>
                <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                  Guardar
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      )}
    </Formik>
  );
};

export default Aceptacion;

const styles = StyleSheet.create({
  labelForm: {marginTop: 0, marginBottom: 10, fontSize: 16, marginLeft: 10},
  containerConfirmacion: {
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    paddingTop: 0,

    alignItems: 'center',
  },
  acceptance: {
    marginTop: 20,
    marginBottom: 20,
  },
  containerFirma: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 40,

    alignItems: 'center',
  },
  containerTextTerminos: {
    borderTopWidth: 1,
    marginTop: 10,
    padding: 20,
  },
  textoTerminos: {
    textAlign: 'justify',
    color: '#284D95',
    fontSize: 16,
  },
  confirmacion: {
    // backgroundColor: "#284D95",
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  confirmacionText: {
    // color: "white",
    fontSize: 20,
  },
  texto: {
    fontSize: 20,
  },
  containerForm: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
  },
  input: {
    padding: 10,
    paddingStart: 30,
    height: 40,
    width: 350,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'gray',
  },
  botonConfirm: {
    backgroundColor: '#284D95',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: 150,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  textInternet: {
    textAlign: 'center',
    fontSize: 14,
  },
  textPagina: {
    textAlign: 'center',
    color: '#284D95',
    fontSize: 14,
  },
  containerInternet: {
    marginTop: 10,
    marginBottom: 15,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginTop: 10,
    backgroundColor: 'white',
  },
  previewImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
