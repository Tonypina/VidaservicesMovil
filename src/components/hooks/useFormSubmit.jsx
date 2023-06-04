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
    console.log(formValues);

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
        if (response.status === 201) {
          console.log('Se insertó correctamente.');
        }

        // navigation.navigate('previaFormulario');
      })
      .catch(error => {
        console.log(error.response.data.errors);
        setErrorMessage(error.response.data.errors);
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
