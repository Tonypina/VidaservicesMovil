import axios from 'axios';
import React, {useState, useEffect} from 'react';

const useFormSubmit = (baseUrl, token, navigation) => {
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formValues, setFormValues] = useState({
    isCanceled: false,
  });
  const [modalEnviado, setModalEnviado] = useState(false);

  const handleSubmit = data => {
    setFormValues({...formValues, ...data});

    // console.log(formValues);

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

        // navigation.navigate('previaFormulario');
      })
      .catch(error => {
        if (error.code === 'ERR_NETWORK') {
            setErrorMessage([
                ['Error de conexión'],
                ['Vuelve a intentarlo cuando tu conexión mejore.']
            ]);

            // saveDataLocally(formValues);
        
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
