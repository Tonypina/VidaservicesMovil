import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import PushNotification from 'react-native-push-notification';
import crashlytics from '@react-native-firebase/crashlytics';

const useFormSubmit = (baseUrl, token, sectionStates) => {

    const [errorVisible, setErrorVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formValues, setFormValues] = useState({
        isCanceled: false,
    });
    const [isSavedFrap, setIsSavedFrap] = useState(false);
    const [modalEnviado, setModalEnviado] = useState(false);

    const saveDataLocally = async (data) => {
        try {
            await AsyncStorage.setItem('asyncForm', JSON.stringify(data))
        } catch (e) {
        // Guardar error
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

      saveDataLocally(formValues);
      setIsSavedFrap(true);

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
            await AsyncStorage.removeItem('asyncForm');
  
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
                ['Tu reporte con folio C-'+ formValues.folio +' será enviado automáticamente cuando tu conexión mejore.']
              ]);
              
            } else {
              setIsSavedFrap(false);

              if (error.response.data.errors) {
                setErrorMessage(error.response.data.errors); 
              } else {
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
          ['Tu reporte con folio C-'+ formValues.folio +' será enviado automáticamente cuando tu conexión mejore.']
        ]);
      }, 15000)
    }

  };

    return {
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
    };
};

export default useFormSubmit;