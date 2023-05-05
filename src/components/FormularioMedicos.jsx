import React, { useState } from "react";
import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  Pressable
} from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { styles } from "./styles/styles";
import PersonalQueAtiende from "./Formularios/PersonalQueAtiende";
import MotivosDeAtencion from "./Formularios/MotivosDeAtencion";
import EvaluacionIncial from "./Formularios/EvaluacionInicial";
import DatosPaciente from "./Formularios/DatosPaciente";
import DatosEvento from "./Formularios/DatosEvento";
import EvaluacionSecundaria from "./Formularios/EvaluacionSecundaria";
import Paciente from "./Formularios/Paciente";
import Subjetivo from "./Formularios/Subjetivo";
import Objetivo from "./Formularios/Objetivo";
import Analisis from "./Formularios/Analisis";
import Diagnostico from "./Formularios/Diagnostico";
import Plan from "./Formularios/Plan";
import Aceptacion from "./Formularios/Aceptacion";
import axios from "axios";
import SignosVitales from "./Formularios/SignosVitales";
import { API_URL } from '@env'

const Formulario = ({ token, user,  navigation }) => {
  const [activeSections, setActiveSections] = useState([]);
  const [errorVisible, setErrorVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [formValues, setFormValues] = useState({});

  const baseUrl = API_URL + "api/reportes/medicos";

  const handleFormSubmit = (data) => {
    setFormValues({ ...formValues, ...data });
    console.log("Desde el principal", formValues); // Para verificar que se está actualizando el estado correctamente
  };

  const handleSubmit = (data) => {

    setFormValues({ ...formValues, ...data });
    console.log(formValues);

    axios({
      method: "post",
      url: baseUrl,
      headers: {
        'Authorization': 'Bearer ' + token,
        "Content-Type": 'application/json'
      },
      data: formValues,

    }).then((response) => {
      if (response.status === 201) {
        console.log("Se insertó correctamente.");
      }

      navigation.navigate('previaFormulario');
    }).catch(error => {
      console.log(error.response.data);
      setErrorVisible(true);
    });
  }

  const SECTIONS = [
    {
      title: "Personal que atiende",
      content: (
        <PersonalQueAtiende
          onFormSubmit={(data) => {
            handleFormSubmit(data);
          }}

          user={{ user }}
        ></PersonalQueAtiende>
      ),
    },
    {
      title: "Datos del evento",
      content: (
        <DatosEvento
          onFormSubmit={(data) => {
            handleFormSubmit(data);
          }}
        ></DatosEvento>
      ),
    },
    {
      title: "Datos del paciente",
      content: (
        <DatosPaciente
          onFormSubmit={(data) => {
            handleFormSubmit(data);
          }}
        ></DatosPaciente>
      ),
    },
    {
      title: "Motivos de atención",
      content: (
        <MotivosDeAtencion
          onFormSubmit={(data) => {
            handleFormSubmit(data);
          }}
        ></MotivosDeAtencion>
      ),
    },
    {
      title: "Evalución Inicial",
      content: (
        <EvaluacionIncial
          onFormSubmit={(data) => {
            handleFormSubmit(data);
          }}
        ></EvaluacionIncial>
      ),
    },
    {
      title: "Evalución Secundaria",
      content: (
        <EvaluacionSecundaria
          onFormSubmit={(data) => {
            handleFormSubmit(data);
          }}
        ></EvaluacionSecundaria>
      ),
    },
    {
      title: "Signos Vitales",
      content: (
        <SignosVitales
          onFormSubmit={(data) => {
            handleFormSubmit(data);
          }}
        ></SignosVitales>
      ),
    },
    {
      title: "Paciente",
      content: (
        <Paciente
          parte="paciente"
          onFormSubmit={(data) => {
            handleFormSubmit(data);
          }}
        ></Paciente>
      ),
    },
    {
      title: "Subjetivo",
      content: (
        <Subjetivo
          parte="subjetivo"
          onFormSubmit={(data) => {
            handleFormSubmit(data);
          }}
        ></Subjetivo>
      ),
    },
    {
      title: "Objetivo",
      content: (
        <Objetivo
          parte="objetivo"
          onFormSubmit={(data) => {
            handleFormSubmit(data);
          }}
        ></Objetivo>
      ),
    },
    {
      title: "Análisis",
      content: (
        <Analisis
          parte="analisis"
          onFormSubmit={(data) => {
            handleFormSubmit(data);
          }}
        ></Analisis>
      ),
    },
    {
      title: "Diagnostico",
      content: (
        <Diagnostico
          parte="diagnostico"
          onFormSubmit={(data) => {
            handleFormSubmit(data);
          }}
        ></Diagnostico>
      ),
    },
    {
      title: "Plan",
      content: (
        <KeyboardAvoidingView>
          <Plan
            parte="plan"
            onFormSubmit={(data) => {
              handleFormSubmit(data);
            }}
          ></Plan>
        </KeyboardAvoidingView>
      ),
    },
  ];

  const renderHeader = (section) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  const renderContent = (section) => {
    return <View style={styles.content}>{section.content}</View>;
  };

  const updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  if (token) {
    return (
      <ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={errorVisible}
          onRequestClose={() => {
            setErrorVisible(!errorVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>No se pudo insertar.</Text>
              <Text style={styles.modalText}>¡Todos los campos son obligatorios!</Text>
              <Pressable
                style={[styles.botonConfirm]}
                onPress={() => setErrorVisible(!errorVisible)}>
                <Text style={styles.textStyle}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style={styles.container}>
          <View styles={styles.containerFormularioTipo}>
            <Text
              style={{
                color: "#284D95",
                fontSize: 20,
                textAlign: "center",
                fontWeight: 700,
                marginTop: 10,
              }}
            >
              Formato de registro para consulta medica a domicilio
            </Text>
          </View>
          <View style={styles.lineForm}></View>
  
          <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
            <Accordion
              sections={SECTIONS}
              activeSections={activeSections}
              renderHeader={renderHeader}
              renderContent={renderContent}
              onChange={updateSections}
              touchableComponent={TouchableNativeFeedback}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Aceptacion onFormSubmit={(data) => {
                setIsSaved(true);
                handleFormSubmit(data);
              }}
            />
          </View>
          { isSaved ? (
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity style={styles.botonConfirm} onPress={() => {
                // handleFormSubmit();
                handleSubmit();
              }}>
                <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
                  Enviar
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </ScrollView>
    );
  } else {
    
    axios({
      method: 'post',
      url: API_URL + 'auth/logout'
    }).then(() => {
      navigation.navigate("login");
    });
  }
};

export default Formulario;
