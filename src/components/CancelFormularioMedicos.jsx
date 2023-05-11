import React, { useState } from "react";
import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable
} from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { styles } from "./styles/styles";
import PersonalQueAtiende from "./Formularios/PersonalQueAtiende";
import DatosPaciente from "./Formularios/DatosPaciente";
import DatosEvento from "./Formularios/DatosEvento";
import axios from "axios";
import { API_URL } from '@env'

const Formulario = ({ token, user,  navigation }) => {
  const [activeSections, setActiveSections] = useState([]);
  
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formValues, setFormValues] = useState({});

  const baseUrl = API_URL + "api/reportes/medicos";

  const handleFormSubmit = (data) => {
    setFormValues({ ...formValues, ...data });
    console.log("Desde el principal", formValues); // Para verificar que se está actualizando el estado correctamente
  };

  const handleSubmit = (data) => {

    setFormValues({ ...formValues, ...data });
    setFormValues({ ...formValues, isCanceled: true });
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
      console.log(error.response.data.errors);
      setErrorMessage(error.response.data.errors);
      // console.log(errors);
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
              <Text style={styles.modalTextWarning}>No se pudo generar el reporte.</Text>
              
              <Text style={styles.modalText}>Errores:</Text>
              <ScrollView>
                {errorVisible ? (
                  Object.entries(errorMessage).map(error => {
                    const [key, value] = error;
                    return (
                      <Text style={styles.modalText}>{value[0]}</Text>
                    )
                  })
                ) : 
                null}
              </ScrollView>
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
            <View style={{ alignItems: "center", paddingBottom: 30 }}>
              <TouchableOpacity style={styles.botonConfirm} onPress={() => {
                handleSubmit();
              }}>
                <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
                  Enviar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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