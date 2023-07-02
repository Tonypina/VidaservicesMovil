import React, {useState} from 'react';
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
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import {styles} from './styles/styles';
import PersonalQueAtiende from './Formularios/PersonalQueAtiende';
import MotivosDeAtencion from './Formularios/MotivosDeAtencion';
import EvaluacionIncial from './Formularios/EvaluacionInicial';
import DatosPaciente from './Formularios/DatosPaciente';
import DatosEvento from './Formularios/DatosEvento';
import EvaluacionSecundaria from './Formularios/EvaluacionSecundaria';
import Paciente from './Formularios/Paciente';
import Subjetivo from './Formularios/Subjetivo';
import Objetivo from './Formularios/Objetivo';
import Analisis from './Formularios/Analisis';
import Diagnostico from './Formularios/Diagnostico';
import Plan from './Formularios/Plan';
import Aceptacion from './Formularios/Aceptacion';
import axios from 'axios';
import SignosVitales from './Formularios/SignosVitales';
import {API_URL} from '@env';
import useFormSubmit from './hooks/useFormSubmit';

const Formulario = ({token, user, navigation}) => {
  const [activeSections, setActiveSections] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const baseUrl = API_URL + 'api/reportes/medicos';

  const [envioCorrecto, setEnvioCorrecto] = useState(false);

  React.useEffect(
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

  const [sectionStates, setSectionStates] = useState({
    datosEvento: false,
    datosPaciente: false,
    motivoAtencion: false,
    evaluacionInicial: false,
    evaluacionSecundaria: false,
    signosVitales: false,
    paciente: false,
    subjetivo: false,
    objetivo: false,
    analisis: false,
    diagnostico: false,
    plan: false,
  });

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

  const SECTIONS = [
    {
      title: 'Personal que atiende',
      content: (
        <PersonalQueAtiende
          onFormSubmit={data => {
            handleFormSubmit(data);
          }}
          user={{user}}></PersonalQueAtiende>
      ),
    },
    {
      title: 'Datos del evento',
      content: (
        <DatosEvento
          onFormSubmit={data => {
            handleFormSubmit(data);
            setSectionStates(prevState => ({
              ...prevState,
              datosEvento: true, // Actualiza el estado paciente a true
            }));
          }}
          closeSection={() => {
            // Actualiza las secciones activas para cerrar la sección del acordeón
            updateSections([]);
          }}></DatosEvento>
      ),
      confirm: sectionStates.datosEvento,
    },
    {
      title: 'Datos del paciente',
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
          }}></DatosPaciente>
      ),
      confirm: sectionStates.datosPaciente,
    },
    {
      title: 'Motivos de atención',
      content: (
        <MotivosDeAtencion
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
          }}></MotivosDeAtencion>
      ),
      confirm: sectionStates.motivoAtencion,
    },
    {
      title: 'Evalución Inicial',
      content: (
        <EvaluacionIncial
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
          }}></EvaluacionIncial>
      ),
      confirm: sectionStates.evaluacionInicial,
    },
    {
      title: 'Evalución Secundaria',
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
          }}></EvaluacionSecundaria>
      ),
      confirm: sectionStates.evaluacionSecundaria,
    },
    {
      title: 'Signos Vitales',
      content: (
        <SignosVitales
          onFormSubmit={data => {
            handleFormSubmit(data);
            setSectionStates(prevState => ({
              ...prevState,
              signosVitales: true, // Actualiza el estado paciente a true
            }));
          }}
          closeSection={() => {
            // Actualiza las secciones activas para cerrar la sección del acordeón
            updateSections([]);
          }}></SignosVitales>
      ),
      confirm: sectionStates.signosVitales,
    },
    {
      title: 'Paciente',
      content: (
        <Paciente
          parte="paciente"
          closeSection={() => {
            // Actualiza las secciones activas para cerrar la sección del acordeón
            updateSections([]);
          }}
          onFormSubmit={data => {
            handleFormSubmit(data);
            //
            setSectionStates(prevState => ({
              ...prevState,
              paciente: true, // Actualiza el estado paciente a true
            }));
          }}></Paciente>
      ),
      confirm: sectionStates.paciente,
    },
    {
      title: 'Subjetivo',
      content: (
        <Subjetivo
          parte="subjetivo"
          closeSection={() => {
            // Actualiza las secciones activas para cerrar la sección del acordeón
            updateSections([]);
          }}
          onFormSubmit={data => {
            handleFormSubmit(data);
            setSectionStates(prevState => ({
              ...prevState,
              subjetivo: true, // Actualiza el estado paciente a true
            }));
          }}></Subjetivo>
      ),
      confirm: sectionStates.subjetivo,
    },
    {
      title: 'Objetivo',
      content: (
        <Objetivo
          parte="objetivo"
          closeSection={() => {
            // Actualiza las secciones activas para cerrar la sección del acordeón
            updateSections([]);
          }}
          onFormSubmit={data => {
            handleFormSubmit(data);
            setSectionStates(prevState => ({
              ...prevState,
              objetivo: true, // Actualiza el estado paciente a true
            }));
          }}></Objetivo>
      ),
      confirm: sectionStates.objetivo,
    },
    {
      title: 'Análisis',
      content: (
        <Analisis
          parte="analisis"
          closeSection={() => {
            // Actualiza las secciones activas para cerrar la sección del acordeón
            updateSections([]);
          }}
          onFormSubmit={data => {
            handleFormSubmit(data);
            setSectionStates(prevState => ({
              ...prevState,
              analisis: true, // Actualiza el estado paciente a true
            }));
          }}></Analisis>
      ),
      confirm: sectionStates.analisis,
    },
    {
      title: 'Diagnostico',
      content: (
        <Diagnostico
          parte="diagnostico"
          onFormSubmit={data => {
            handleFormSubmit(data);
            setSectionStates(prevState => ({
              ...prevState,
              diagnostico: true, // Actualiza el estado paciente a true
            }));
          }}
          closeSection={() => {
            // Actualiza las secciones activas para cerrar la sección del acordeón
            updateSections([]);
          }}></Diagnostico>
      ),
      confirm: sectionStates.diagnostico,
    },
    {
      title: 'Plan',
      content: (
        <KeyboardAvoidingView>
          <Plan
            parte="plan"
            onFormSubmit={data => {
              handleFormSubmit(data);
              setSectionStates(prevState => ({
                ...prevState,
                plan: true, // Actualiza el estado paciente a true
              }));
            }}
            closeSection={() => {
              // Actualiza las secciones activas para cerrar la sección del acordeón
              updateSections([]);
            }}></Plan>
        </KeyboardAvoidingView>
      ),
      confirm: sectionStates.plan,
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

  const updateSections = activeSections => {
    setActiveSections(activeSections);
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
              Formato de registro para consulta medica a domicilio
            </Text>
          </View>
          <View style={styles.lineForm}></View>

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
          <View style={{alignItems: 'center'}}>
            <Aceptacion
              onFormSubmit={data => {
                setIsSaved(true);
                handleFormSubmit(data);
              }}
            />
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
                  <Text
                    style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
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
        </View>
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

export default Formulario;
