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
import Cronometria from './FormualriosPreHospi/cronometria';
import DatosPaciente from './FormualriosPreHospi/datosPaciente';
import DatosServicio from './FormualriosPreHospi/datosServicio';
import MotivoAtencion from './FormualriosPreHospi/motivoAtencion';
import EvaluacionInicial from './FormualriosPreHospi/evaluacionInicial';
import EvaluacionSecundaria from './FormualriosPreHospi/evaluacionSecundaria';
import Hospital from './FormualriosPreHospi/hospital';
import Tratamiento from './FormualriosPreHospi/tratamiento';

const FormularioPrehospilario = ({token, user, navigation}) => {
  const [isSaved, setIsSaved] = useState(true);
  const [isSent, setIsSent] = useState(false);

  const baseUrl = API_URL + 'api/reportes/medicos';
  // Required for accordion.
  const [sectionStates, setSectionStates] = useState({
    cronometria: false,
    datosPaciente: false,
    datosServicio: false,
    control: false,
    motivoAtencion: false,
    evaluacionInicial: false,
    evaluacionSecundaria: false,
    tratamiento: false,
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
    setErrorVisible,
    errorMessage,
    setErrorMessage,
    formValues,
    setFormValues,
    handleSubmit,
    modalEnviado,
    setModalEnviado,
  } = useFormSubmit(baseUrl, token, navigation);

  const handleFormSubmit = data => {
    setFormValues({...formValues, ...data});
  };
  //Accordion sections
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
        />
      ),
      confirm: sectionStates.datosPaciente,
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
