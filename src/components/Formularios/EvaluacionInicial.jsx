import {Formik} from 'formik';
import {View, Text, TouchableOpacity} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import React, {useState} from 'react';
import {styles} from '../styles/styles';
import {
  validacionTexto,
  validacionNumero,
  validacionTelefono,
} from '../validaciones';
import {object} from 'yup';

const EvaluacionIncial = ({onFormSubmit, closeSection}) => {
  const [nivelDeConcienciaOptions, setNivelDeConcienciaOptions] = useState([
    {
      id: 1,
      label: 'Alerta',
      value: 'alerta',
    },
    {
      id: 2,
      label: 'Respuesta verbal',
      value: 'respuestaVerbal',
    },
    {
      id: 3,
      label: 'Respuesta al dolor',
      value: 'respuestaAlDolor',
    },
    {
      id: 4,
      label: 'Inconciente',
      value: 'inconciente',
    },
  ]);

  const [pulsosOptions, setPulsosOptions] = useState([
    {
      id: 1,
      label: 'Carotideo',
      value: 'carotideo',
    },
    {
      id: 2,
      label: 'Radial',
      value: 'radial',
    },
    {
      id: 3,
      label: 'Paro cardiorrespiratorio',
      value: 'paroCardiorrespiratorio',
    },
  ]);

  const [condicionPacienteOptions, setCondicionPacienteOptions] = useState([
    {
      id: 1,
      label: 'Critico',
      value: 'critico',
    },
    {
      id: 2,
      label: 'No Critico',
      value: 'noCritico',
    },
  ]);

  const [viaAereaOptions, setViaAereaOptions] = useState([
    {
      id: 1,
      label: 'Permeable',
      value: 'permeable',
    },
    {
      id: 2,
      label: 'Comprometido',
      value: 'comprometido',
    },
  ]);

  const [calidadPulsoOptions, setCalidadPulsoOptions] = useState([
    {
      id: 1,
      label: 'Ritmica',
      value: 'ritmica',
    },
    {
      id: 2,
      label: 'Lento',
      value: 'lento',
    },
    {
      id: 3,
      label: 'Rapido',
      value: 'rapido',
    },
    {
      id: 4,
      label: 'Arritmico',
      value: 'arritmico',
    },
  ]);

  const [clasificacionOptions, setClasificacionOptions] = useState([
    {
      id: 1,
      label: 'Rojo',
      value: 'rojo',
    },
    {
      id: 2,
      label: 'Amarillo',
      value: 'amarillo',
    },
    {
      id: 3,
      label: 'Verde',
      value: 'verde',
    },
    {
      id: 4,
      label: 'Negro',
      value: 'negro',
    },
  ]);

  const [respiracionOptions, setRespiracionOptions] = useState([
    {
      id: 1,
      label: 'Presente',
      value: 'presente',
    },
    {
      id: 2,
      label: 'Ausente',
      value: 'ausente',
    },
  ]);

  const [tipoRespiracionOptions, setTipoRespiracionOptions] = useState([
    {
      id: 1,
      label: 'Normal',
      value: 'normal',
    },
    {
      id: 2,
      label: 'Agorico',
      value: 'agorico',
    },
    {
      id: 3,
      label: 'CheyneStoke',
      value: 'cheyneStoke',
    },
    {
      id: 4,
      label: 'Kussmaul',
      value: 'kussmaul',
    },
    {
      id: 5,
      label: 'Biot',
      value: 'biot',
    },
    {
      id: 6,
      label: 'Taquipnea',
      value: 'taquipnea',
    },
    {
      id: 7,
      label: 'Bradipnea',
      value: 'bradipnea',
    },
  ]);

  const [pielOptions, setPielOptions] = useState([
    {
      id: 1,
      label: 'Tibia',
      value: 'tibia',
    },
    {
      id: 2,
      label: 'Fría',
      value: 'fria',
    },
    {
      id: 3,
      label: 'Caliente',
      value: 'caliente',
    },
    {
      id: 4,
      label: 'Palida',
      value: 'palida',
    },
    {
      id: 5,
      label: 'Cianotica',
      value: 'cianotica',
    },
    {
      id: 6,
      label: 'Diaforético',
      value: 'diaforetico',
    },
    {
      id: 7,
      label: 'Rubicunda',
      value: 'rubicunda',
    },
    {
      id: 8,
      label: 'Deshidratada',
      value: 'deshidratada',
    },
    {
      id: 9,
      label: 'Marmorea',
      value: 'marmorea',
    },
  ]);

  const validationSchema = object().shape({
    catalogo_nivel_de_conciencia_id: validacionNumero(),
    catalogo_pulsos_id: validacionNumero(),
    catalogo_condicion_paciente_id: validacionNumero(),
    catalogo_via_aerea_id: validacionNumero(),
    catalogo_calidad_pulso_id: validacionNumero(),
    catalogo_clasificacion_id: validacionNumero(),
    catalogo_respiracion_id: validacionNumero(),
    catalogo_tipo_respiracion_id: validacionNumero(),
    catalogo_piel_id: validacionNumero(),
  });

  return (
    <Formik
      initialValues={{
        catalogo_nivel_de_conciencia_id: '',
        catalogo_pulsos_id: '',
        catalogo_condicion_paciente_id: '',
        catalogo_via_aerea_id: '',
        catalogo_calidad_pulso_id: '',
        catalogo_clasificacion_id: '',
        catalogo_respiracion_id: '',
        catalogo_tipo_respiracion_id: '',
        catalogo_piel_id: '',
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleSubmit, values, errors}) => (
        <View>
          <View>
            <Text style={styles.layoutFormulario}>Nivel de conciencia: </Text>
            <RadioGroup
              radioButtons={nivelDeConcienciaOptions}
              onPress={nivelDeConcienciaOptions => {
                setNivelDeConcienciaOptions(nivelDeConcienciaOptions);

                Object.keys(nivelDeConcienciaOptions).forEach(key => {
                  if (nivelDeConcienciaOptions[key].selected) {
                    values.catalogo_nivel_de_conciencia_id =
                      nivelDeConcienciaOptions[key].id;
                  }
                });
              }}
              containerStyle={styles.radioGroup}
            />
            {errors.catalogo_nivel_de_conciencia_id ? (
              <Text style={styles.errorMensaje}>
                {errors.catalogo_nivel_de_conciencia_id}
              </Text>
            ) : null}
          </View>

          <Text style={styles.layoutFormulario}>Pulsos: </Text>
          <RadioGroup
            justifyContent="flex-start"
            radioButtons={pulsosOptions}
            onPress={pulsosOptions => {
              setPulsosOptions(pulsosOptions);

              Object.keys(pulsosOptions).forEach(key => {
                if (pulsosOptions[key].selected) {
                  values.catalogo_pulsos_id = pulsosOptions[key].id;
                }
              });
            }}
            containerStyle={styles.radioGroup}
          />

          {errors.catalogo_pulsos_id ? (
            <Text style={styles.errorMensaje}>{errors.catalogo_pulsos_id}</Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Condicion del paciente: </Text>
          <RadioGroup
            radioButtons={condicionPacienteOptions}
            onPress={condicionPacienteOptions => {
              setCondicionPacienteOptions(condicionPacienteOptions);

              Object.keys(condicionPacienteOptions).forEach(key => {
                if (condicionPacienteOptions[key].selected) {
                  values.catalogo_condicion_paciente_id =
                    condicionPacienteOptions[key].id;
                }
              });
            }}
            containerStyle={styles.radioGroup}
          />
          {errors.catalogo_condicion_paciente_id ? (
            <Text style={styles.errorMensaje}>
              {errors.catalogo_condicion_paciente_id}
            </Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Via Aerea: </Text>
          <RadioGroup
            radioButtons={viaAereaOptions}
            onPress={viaAereaOptions => {
              setViaAereaOptions(viaAereaOptions);

              Object.keys(viaAereaOptions).forEach(key => {
                if (viaAereaOptions[key].selected) {
                  values.catalogo_via_aerea_id = viaAereaOptions[key].id;
                }
              });
            }}
            containerStyle={styles.radioGroup}
          />
          {errors.catalogo_via_aerea_id ? (
            <Text style={styles.errorMensaje}>
              {errors.catalogo_via_aerea_id}
            </Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Calidad del pulso: </Text>
          <RadioGroup
            radioButtons={calidadPulsoOptions}
            onPress={calidadPulsoOptions => {
              setCalidadPulsoOptions(calidadPulsoOptions);

              Object.keys(calidadPulsoOptions).forEach(key => {
                if (calidadPulsoOptions[key].selected) {
                  values.catalogo_calidad_pulso_id =
                    calidadPulsoOptions[key].id;
                }
              });
            }}
            containerStyle={styles.radioGroup}
          />
          {errors.catalogo_calidad_pulso_id ? (
            <Text style={styles.errorMensaje}>
              {errors.catalogo_calidad_pulso_id}
            </Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Clasificación: </Text>
          <RadioGroup
            radioButtons={clasificacionOptions}
            onPress={clasificacionOptions => {
              setClasificacionOptions(clasificacionOptions);

              Object.keys(clasificacionOptions).forEach(key => {
                if (clasificacionOptions[key].selected) {
                  values.catalogo_clasificacion_id =
                    clasificacionOptions[key].id;
                }
              });
            }}
            containerStyle={styles.radioGroup}
          />
          {errors.catalogo_clasificacion_id ? (
            <Text style={styles.errorMensaje}>
              {errors.catalogo_clasificacion_id}
            </Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Respiración: </Text>
          <RadioGroup
            radioButtons={respiracionOptions}
            onPress={respiracionOptions => {
              setRespiracionOptions(respiracionOptions);

              Object.keys(respiracionOptions).forEach(key => {
                if (respiracionOptions[key].selected) {
                  values.catalogo_respiracion_id = respiracionOptions[key].id;
                }
              });
            }}
            containerStyle={styles.radioGroup}
          />
          {errors.catalogo_respiracion_id ? (
            <Text style={styles.errorMensaje}>
              {errors.catalogo_respiracion_id}
            </Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Tipo de respiración: </Text>
          <RadioGroup
            radioButtons={tipoRespiracionOptions}
            onPress={tipoRespiracionOptions => {
              setTipoRespiracionOptions(tipoRespiracionOptions);

              Object.keys(tipoRespiracionOptions).forEach(key => {
                if (tipoRespiracionOptions[key].selected) {
                  values.catalogo_tipo_respiracion_id =
                    tipoRespiracionOptions[key].id;
                }
              });
            }}
            containerStyle={styles.radioGroup}
          />
          {errors.catalogo_tipo_respiracion_id ? (
            <Text style={styles.errorMensaje}>
              {errors.catalogo_tipo_respiracion_id}
            </Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Piel: </Text>
          <RadioGroup
            radioButtons={pielOptions}
            onPress={pielOptions => {
              setPielOptions(pielOptions);

              Object.keys(pielOptions).forEach(key => {
                if (pielOptions[key].selected) {
                  values.catalogo_piel_id = pielOptions[key].id;
                }
              });
            }}
            containerStyle={styles.radioGroup}
          />
          {errors.catalogo_piel_id ? (
            <Text style={styles.errorMensaje}>{errors.catalogo_piel_id}</Text>
          ) : null}

          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default EvaluacionIncial;
