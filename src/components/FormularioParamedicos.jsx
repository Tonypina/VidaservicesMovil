import {useState, useEffect} from 'react';
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
  KeyboardAvoidingView,
  Modal,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';
import Cronometria from './FormualriosParamedicos/cronometria';
import DatosPaciente from './FormualriosParamedicos/datosPaciente';
import DatosServicio from './FormualriosParamedicos/datosServicio';
import MotivoAtencion from './FormualriosParamedicos/motivoAtencion';
import EvaluacionInicial from './FormualriosParamedicos/evaluacionInicial';
import EvaluacionSecundaria from './FormualriosParamedicos/evaluacionSecundaria';
import Hospital from './FormualriosParamedicos/hospital';
import Tratamiento from './FormualriosParamedicos/tratamiento';
import ManejoFarmacologico from './FormualriosParamedicos/manejoFarmacologico';

const FormularioPrehospilario = ({token, user, navigation}) => {
  const [isSaved, setIsSaved] = useState(true);
  const [isSent, setIsSent] = useState(false);

  const baseUrl = API_URL + 'api/reportes/paramedicos';
  // Required for accordion.
  const [sectionStates, setSectionStates] = useState({
    cronometria: false,
    datosServicio: false,
    datosPaciente: false,
    motivoAtencion: false,
    evaluacionInicial: false,
    evaluacionSecundaria: false,
    tratamiento: false,
    manejoFarmacologico: false,
    hospital: false,
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
    isSavedFrap,
    setErrorVisible,
    errorMessage,
    setErrorMessage,
    formValues,
    setFormValues,
    handleSubmit,
    modalEnviado,
    setModalEnviado,
  } = useFormSubmit(baseUrl, token, user, sectionStates);

  const handleFormSubmit = data => {
    setFormValues({...formValues, ...data});
  };

  const [selectedMotivo, setSelectedMotivo] = useState('')
  const [isConsciente, setIsConsciente] = useState(true)

  //Secciones de Acordeon
  const SECTIONS = [
    {
      title: 'Cronometria',
      content: (
        <Cronometria
          onFormSubmit={data => {
            handleFormSubmit(data);
            setSectionStates(prevState => ({
              ...prevState,
              cronometria: true, // Actualiza el estado paciente a true
            }));
          }}
          closeSection={() => {
            // Actualiza las secciones activas para cerrar la sección del acordeón
            updateSections([]);
          }}
        />
      ),
      confirm: sectionStates.cronometria,
    },
    {
      title: 'Datos del Servicio',
      content: (
        <DatosServicio
          user={user.tipo}
          onFormSubmit={data => {
            handleFormSubmit(data);
            setSectionStates(prevState => ({
              ...prevState,
              datosServicio: true, // Actualiza el estado paciente a true
            }));
          }}
          closeSection={() => {
            // Actualiza las secciones activas para cerrar la sección del acordeón
            updateSections([]);
          }}
        />
      ),
      confirm: sectionStates.datosServicio,
    },
    {
      title: 'Datos del Paciente',
      content: (
        <DatosPaciente
          onFormSubmit={data => {
            handleFormSubmit(data);
            setSectionStates(prevState => ({
              ...prevState,
              datosPaciente: true, // Actualiza el estado paciente a true
            }));
          }}
          closeSection={() => {
            // Actualiza las secciones activas para cerrar la sección del acordeón
            updateSections([]);
          }}
          setIsConsciente={setIsConsciente}
        />
      ),
      confirm: sectionStates.datosPaciente,
    },
    {
      title: 'Motivo de la atención',
      content: (
        <MotivoAtencion
          onFormSubmit={data => {
            handleFormSubmit(data);
            setSectionStates(prevState => ({
              ...prevState,
              motivoAtencion: true, // Actualiza el estado paciente a true
            }));
          }}
          closeSection={() => {
            // Actualiza las secciones activas para cerrar la sección del acordeón
            updateSections([]);
          }}
          setSelectedMotivo={setSelectedMotivo}
        />
      ),
      confirm: sectionStates.motivoAtencion,
    },
    {
      title: 'Evaluación Inicial',
      content: (
        <EvaluacionInicial
          onFormSubmit={data => {
            handleFormSubmit(data);
            setSectionStates(prevState => ({
              ...prevState,
              evaluacionInicial: true, // Actualiza el estado paciente a true
            }));
          }}
          closeSection={() => {
            // Actualiza las secciones activas para cerrar la sección del acordeón
            updateSections([]);
          }}
          isConsciente={isConsciente}
        />
      ),
      confirm: sectionStates.evaluacionInicial,
    },
    {
      title: 'Evaluación Secundaria',
      content: (
        <EvaluacionSecundaria
          onFormSubmit={data => {
            handleFormSubmit(data);
            setSectionStates(prevState => ({
              ...prevState,
              evaluacionSecundaria: true, // Actualiza el estado paciente a true
            }));
          }}
          closeSection={() => {
            // Actualiza las secciones activas para cerrar la sección del acordeón
            updateSections([]);
          }}
          selectedMotivo={selectedMotivo}
          isConsciente={isConsciente}
        />
      ),
      confirm: sectionStates.evaluacionSecundaria,
    },
    {
      title: 'Tratamiento',
      content: (
        <Tratamiento
          onFormSubmit={data => {
            handleFormSubmit(data);
            setSectionStates(prevState => ({
              ...prevState,
              tratamiento: true, // Actualiza el estado paciente a true
            }));
          }}
          closeSection={() => {
            // Actualiza las secciones activas para cerrar la sección del acordeón
            updateSections([]);
          }}
        />
      ),
      confirm: sectionStates.tratamiento,
    },
    {
      title: 'Manejo Farmacológico',
      content: (
        <ManejoFarmacologico
          onFormSubmit={data => {
            handleFormSubmit(data);
            setSectionStates(prevState => ({
              ...prevState,
              manejoFarmacologico: true, // Actualiza el estado paciente a true
            }));
          }}
          closeSection={() => {
            // Actualiza las secciones activas para cerrar la sección del acordeón
            updateSections([]);
          }}
        />
      ),
      confirm: sectionStates.manejoFarmacologico,
    },
    {
      title: 'Hospital',
      content: (
        <Hospital
          onFormSubmit={data => {
            handleFormSubmit(data);
            setSectionStates(prevState => ({
              ...prevState,
              hospital: true, // Actualiza el estado paciente a true
            }));
          }}
          closeSection={() => {
            // Actualiza las secciones activas para cerrar la sección del acordeón
            updateSections([]);
          }}
        />
      ),
      confirm: sectionStates.hospital,
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
              <Text style={styles.modalExito}>Folio: E - {formValues.folio}</Text>

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

                  if (isSavedFrap) {
                    navigation.navigate('previaFormulario');
                  }
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
              Registro de atención Prehospitalaria
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
        </View>
        {isSaved ? (
          !isSent ? (
            <View style={{alignItems: 'center', marginBottom: 50}}>
              <TouchableOpacity
                style={styles.botonConfirm}
                onPress={() => {
                  // handleFormSubmit();
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
        ) : null}
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
