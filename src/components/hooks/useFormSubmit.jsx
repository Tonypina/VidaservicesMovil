import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import PushNotification from 'react-native-push-notification';

const useFormSubmit = (baseUrl, token, navigation) => {

    const [errorVisible, setErrorVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formValues, setFormValues] = useState({
        isCanceled: false,
    });
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

    axios({
      method: 'post',
      url: baseUrl,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      data: formValues,
    })
      .then(response => {
        setModalEnviado(true);
        PushNotification.localNotification({
          channelId: "async-update",
          title: "Reporte enviado",
          message: "El reporte ha sido enviado correctamente"
        });
      })
      .catch(error => {

        if (error.code === 'ERR_NETWORK') {
          setErrorMessage([
            ['Error de conexión'],
            ['Tu reporte con folio '+ formValues.folio +' será enviado cuento tu conexión mejore.']
          ]);

          saveDataLocally(formValues);

        } else {
          setErrorMessage(error.response.data.errors); 
        }
        setErrorVisible(true);
      });
  };

    return {
        errorVisible,
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