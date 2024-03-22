import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import PushNotification from 'react-native-push-notification';
import crashlytics from '@react-native-firebase/crashlytics';
import {API_URL} from '@env';

const useFormSubmit = (baseUrl, token, user, sectionStates) => {

    const [errorVisible, setErrorVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formValues, setFormValues] = useState(() => {
        if (user) {
            return {
                user_id: user.id,
                isCanceled: false,
            }
        }
        return { isCanceled: false }
    });
    const [isSavedFrap, setIsSavedFrap] = useState(false);
    const [modalEnviado, setModalEnviado] = useState(false);

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

            data = JSON.stringify(data)
            await AsyncStorage.setItem(key, data)

            return key
        } catch (e) {        
            console.log(e);
            return null
        }
    };

    const manualSubmit = async () => {
        try {
            
            keys = await AsyncStorage.getAllKeys()
            const keysToIgnore = ['token', 'user']

            
            keys.forEach(async (key, index) => {
                
                if ( !keysToIgnore.includes(key) ) {

                    let asyncForm = await AsyncStorage.getItem(key);
                    const jsonForm = JSON.parse(asyncForm)
                    let manualURL = API_URL + 'api/reportes/'
    
                    if ( key.includes('paramedicos') ) {
                        manualURL += 'paramedicos/'
                    } else {
                        manualURL += 'medicos/'
                    }
    
                    if ( key.includes('canceled') ) {
                        manualURL += 'canceled'
                    }
    
                    axios({
                        method: 'post',
                        url: manualURL,
                        headers: {
                            Authorization: 'Bearer ' + token,
                            'Content-Type': 'application/json',
                        },
                        data: asyncForm,
                    })
                    .then(async (response) => {

                        await AsyncStorage.removeItem(key);
            
                        PushNotification.localNotification({
                            channelId: "async-update",
                            title: "Reporte rezagado enviado!",
                            message: "El reporte " + jsonForm.folio + " ha sido enviado correctamente."
                        });
                    })
                    .catch(async error => {

                        if (error.code === 'ERR_NETWORK') {
                            PushNotification.localNotification({
                                channelId: "async-update",
                                title: "ERROR",
                                message: "No se pudo enviar el reporte rezagado " + jsonForm.folio + ". Inténtalo más tarde."
                            });
                        
                        } else {
    
                            if (error.response.data.errors) {
                                crashlytics().recordError(error.response.data.error)
                                await AsyncStorage.removeItem(key);

                                PushNotification.localNotification({
                                    channelId: "async-update",
                                    title: "ERROR",
                                    message: "No se pudo enviar el reporte rezagado " + jsonForm.folio + ".\nError: " + error.response.data.errors
                                });
                            } else {
                                // Duplicado
                                
                                await AsyncStorage.removeItem(key);
                                PushNotification.localNotification({
                                    channelId: "async-update",
                                    title: "ERROR: Folio Duplicado",
                                    message: "No se pudo enviar el reporte rezagado " + jsonForm.folio + ".\nHubo un problema con tu FRAP, contacta al administrador de la plataforma."
                                });                                
                                crashlytics().recordError(error)
                            }
                        }
                    });
                                    
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

    const handleSubmit = async data => {
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

            let key = await saveDataLocally(formValues);
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
                    await AsyncStorage.removeItem(key);

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
                        setIsSavedFrap(false);

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

    return {
        errorVisible,
        isSavedFrap,
        setErrorVisible,
        errorMessage,
        setErrorMessage,
        formValues,
        setFormValues,
        handleSubmit,
        manualSubmit,
        modalEnviado,
        setModalEnviado,
    };
};

export default useFormSubmit;