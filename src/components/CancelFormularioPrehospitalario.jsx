import {useRef, useState, useEffect} from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import {styles} from './styles/styles';
import {API_URL} from '@env';
import useFormSubmit from './hooks/useFormSubmit';
import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  ScrollView,
  Alert,
  Pressable,
  Modal,
} from 'react-native';
import CronometriaCancelacion from './FormualriosPreHospi/cronometriaCancelacion';
import SignatureViewWrapper from './FormualriosPreHospi/signatureViewWraper';

const FormularioPrehospilario = ({token, user, navigation}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const baseUrl = API_URL + 'api/reportes/paramedicos/canceled';
  // Required for accordion.
  const [sectionStates, setSectionStates] = useState({
    cronometriaCancelacion: false,
  });
  const [activeSections, setActiveSections] = useState([]);
  const updateSections = activeSections => {
    setActiveSections(activeSections);
  };

  //Confirmation modal on exit
  const [envioCorrecto, setEnvioCorrecto] = useState(false);
  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (!envioCorrecto) {
          e.preventDefault();

          Alert.alert(
            'Seguro que deseas salir?',
            'Tus cambios no serán guardados. Estás seguro de salir?',
            [
              {text: 'No salir', style: 'cancel', onPress: () => {}},
              {
                text: 'Salir',
                style: 'destructive',
                onPress: () => navigation.dispatch(e.data.action),
              },
            ],
          );
        } else {
          return;
        }
      }),
    [envioCorrecto, navigation],
  );

  //Send information
  const {
    errorVisible,
    setErrorVisible,
    errorMessage,
    setErrorMessage,
    formValues,
    setFormValues,
    handleSubmit,
    modalEnviado,
    setModalEnviado,
  } = useFormSubmit(baseUrl, token, sectionStates);

  const handleFormSubmit = data => {
    setFormValues({...formValues, ...data});
  };
  //Accordion sections
  const SECTIONS = [
    {
      title: 'Cronometria',
      content: (
        <CronometriaCancelacion
          onFormSubmit={data => {
            handleFormSubmit(data);
            setSectionStates(prevState => ({
              ...prevState,
              cronometriaCancelacion: true, // Actualiza el estado paciente a true
            }));
          }}
          closeSection={() => {
            // Actualiza las secciones activas para cerrar la sección del acordeón
            updateSections([]);
          }}
        />
      ),
      confirm: sectionStates.cronometriaCancelacion,
    },
  ];

  const renderHeader = section => {
    let headerConfirm;
    if (section.confirm) {
      headerConfirm = styles.savedHeader;
    }
    return (
      <View style={[styles.header, headerConfirm]}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  const renderContent = section => {
    return <View style={styles.content}>{section.content}</View>;
  };

  const [signatures, setSignatures] = useState({
    rechazo_firma: {data: null, isSaved: false, view: useRef(null)},
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

  if (token) {
    return (
      <ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalEnviado}
          onRequestClose={() => {}}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalExito}>Reporte enviado con éxito!</Text>
              <Text style={styles.modalExito}>Folio: C - {formValues.folio}</Text>

              <Pressable
                style={[styles.botonConfirm]}
                onPress={() => {
                  setEnvioCorrecto(true);
                  setModalEnviado(!modalEnviado);
                  navigation.navigate('previaFormulario');
                }}>
                <Text style={styles.textStyle}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={errorVisible}
          onRequestClose={() => {
            setErrorVisible(!errorVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTextWarning}>
                No se pudo generar el reporte.
              </Text>

              <Text style={styles.modalText}>Errores:</Text>
              <ScrollView>
                {errorVisible
                  ? Object.entries(errorMessage).map(error => {
                      const [key, value] = error;
                      return <Text style={styles.modalText}>{value[0]}</Text>;
                    })
                  : null}
              </ScrollView>
              <Pressable
                style={[styles.botonConfirm]}
                onPress={() => {
                  setIsSent(!isSent);
                  setErrorVisible(!errorVisible);
                }}>
                <Text style={styles.textStyle}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <View style={styles.container}>
          <View styles={styles.containerFormularioTipo}>
            <Text
              style={{
                color: '#284D95',
                fontSize: 20,
                textAlign: 'center',
                fontWeight: 700,
                marginTop: 10,
              }}>
              Registro de atencíon Prehospitalaria
            </Text>
          </View>
          <View style={styles.lineForm} />
          <View style={{marginTop: 10, paddingHorizontal: 10}}>
            <Accordion
              sections={SECTIONS}
              activeSections={activeSections}
              renderHeader={renderHeader}
              renderContent={renderContent}
              onChange={updateSections}
              touchableComponent={TouchableNativeFeedback}
            />
          </View>
          <View>
            <SignatureViewWrapper
              title="Paciente"
              signatureData={signatures.rechazo_firma.data}
              onShow={() => signatures.rechazo_firma.view.current.show(true)}
              onSave={onSave('rechazo_firma')}
              onClear={onClear('rechazo_firma')}
              signatureView={signatures.rechazo_firma.view}
            />
          </View>
        </View>
        {isSaved ? (
          !isSent ? (
            <View style={{alignItems: 'center', marginBottom: 50}}>
              <TouchableOpacity
                style={styles.botonConfirm}
                onPress={() => {
                  setIsSent(!isSent);
                  handleSubmit();
                  setEnvioCorrecto(true);
                }}>
                <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                  Enviar
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{alignItems: 'center', marginBottom: 50}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                Enviando...
              </Text>
            </View>
          )
        ) : <View style={{alignItems: 'center', marginBottom: 50}}>
              <TouchableOpacity
                style={styles.botonConfirm}
                onPress={() => {
                  setIsSaved(!isSaved);
                  setFormValues({...formValues, rechazo_firma: signatures.rechazo_firma.data})
                }}>
                <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                  Guardar
                </Text>
              </TouchableOpacity>
            </View>
        }
      </ScrollView>
    );
  } else {
    axios({
      method: 'post',
      url: API_URL + 'auth/logout',
    }).then(() => {
      navigation.navigate('login');
    });
  }
};
export default FormularioPrehospilario;
