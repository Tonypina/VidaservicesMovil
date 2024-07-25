import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  Alert
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import {styles} from './styles/styles';
import PersonalQueAtiende from './Formularios/PersonalQueAtiende';
import DatosPaciente from './Formularios/DatosPaciente';
import DatosEvento from './Formularios/DatosEvento';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

const Formulario = ({token, user, navigation}) => {
  const [activeSections, setActiveSections] = useState([]);

  const [errorVisible, setErrorVisible] = useState(false);
  const [modalEnviado, setModalEnviado] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [envioCorrecto, setEnvioCorrecto] = useState(false);
 
  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        
        if (!envioCorrecto) {
          e.preventDefault();
  
          Alert.alert(
            'Seguro que deseas salir?',
            'Tus cambios no serán guardados. Estás seguro de salir?',
            [
              { text: "No salir", style: 'cancel', onPress: () => {} },
              {
                text: 'Salir',
                style: 'destructive',
                onPress: () => navigation.dispatch(e.data.action),
              },
            ]
          );
        } else {
          return;
        }
      }),
    [envioCorrecto, navigation]
  );

  const [formValues, setFormValues] = useState({
    user_id: user.id,
    isCanceled: true,
  });

  const baseUrl = API_URL + 'api/reportes/medicos/canceled';

  const [sectionStates, setSectionStates] = useState({
    datosEvento: false,
    datosPaciente: false,
  });

  const handleFormSubmit = data => {
    setFormValues({...formValues, ...data});
  };

  const saveDataLocally = async (data) => {
    try {
        let keys = await AsyncStorage.getAllKeys()
        let key = '_' + keys.length;

        if ( baseUrl.includes('canceled') ) {
            key = '_canceled' + key
        }
        
        if ( baseUrl.includes('paramedicos') ) {
            key = 'paramedicos' + key
        } else {
            key = 'medicos' + key
        }

        await AsyncStorage.setItem(key, JSON.stringify(data))

        return key
    } catch (e) {        
        console.log(e);
        return null
    }
  };

  const handleSubmit = data => {
    setFormValues({...formValues, ...data});

    const requiredValidation = () => {

        let validated = true;

        Object.entries(sectionStates).forEach((item) => {
            
            if (!item[1]) {
    
            setErrorMessage([
                ['Asegurate de llenar todos los campos del reporte y presionar el botón GUARDAR en cada uno.']
            ]);
    
            setErrorVisible(true);
    
            validated = false;
            }

        });

        return validated;
    };

    if (requiredValidation()) {

        let key = saveDataLocally(formValues);
        setIsSaved(true);

        sendingData = setTimeout(() => {
            axios({
            method: 'post',
            url: baseUrl,
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            data: formValues,
            })
            .then(async (response) => {
                setModalEnviado(true);
                
                await AsyncStorage.removeItem(key["_j"]);
    
                PushNotification.localNotification({
                channelId: "async-update",
                title: "Reporte enviado",
                message: "El reporte ha sido enviado correctamente"
                });

                clearTimeout(clearSendingData);
            })
            .catch(error => {
                clearTimeout(clearSendingData);
                
                if (error.code === 'ERR_NETWORK') {
                setErrorMessage([
                    ['Error de conexión'],
                    ['Tu reporte con folio '+ formValues.folio +' será enviado automáticamente cuando tu conexión mejore.']
                ]);
                
                } else {
                setIsSaved(false);

                if (error.response.data.errors) {
                    setErrorMessage(error.response.data.errors); 
                } else {
                    AsyncStorage.removeItem(key);
                    setErrorMessage([
                    ["Error"],
                    ["Hubo un problema con tu FRAP, contacta al administrador de la plataforma."]
                    
                    ])
                    crashlytics().recordError(error)
                }
                }
                setErrorVisible(true);
            });
        }, 0);

        clearSendingData = setTimeout(() => {
            clearTimeout(sendingData);

            setErrorMessage([
                ['Error de conexión'],
                ['Tu reporte con folio '+ formValues.folio +' será enviado automáticamente cuando tu conexión mejore.']
            ]);
        }, 15000)
    }
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
          onRequestClose={() => {
          }}>
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
                  setErrorVisible(!errorVisible);
                  setIsSent(!isSent);

                  if (isSaved) {
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
            {!isSent ? (
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
              <View style={{alignItems: 'center', marginBottom: 50, marginTop: 50}}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Enviando...</Text>
              </View>
            )}
          </View>
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
