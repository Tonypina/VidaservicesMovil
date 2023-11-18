import {Formik} from 'formik';
import {View, TouchableOpacity, Text} from 'react-native';
import {useState} from 'react';
import CustomDropdown from './customDropdown';
import {styles} from '../styles/styles';
import {object} from 'yup';
import {validacionTexto, validacionTextoNR, validacionNumeroNR} from '../validaciones';

const nivelConsciencia = [
  {label: 'Consciente', value: 1},
  {label: 'Respuesta a estimulo verbal', value: 2},
  {
    label: 'Respuesta a estimulo doloroso',
    value: 3,
  },
  {label: 'Inconsciente', value: 4},
];

const viaAerea = [
  {label: 'Permeable', value: 1},
  {label: 'Comprometida', value: 2},
];

const observaciones = [
  {label: 'Automatismo regular', value: 1},
  {label: 'Ventilación rápida', value: 2},
  {label: 'Ventilación superficial', value: 3},
  {label: 'Apnea', value: 4},
];

const auscultacion = [
  {
    label: 'Ruidos Respiratorios Normales',
    value: 1,
  },
  {
    label: 'Ruidos Respiratorios Disminuidos',
    value: 2,
  },
  {
    label: 'Ruidos Respiratorios Ausentes',
    value: 3,
  },
];

const hemitorax = [
  {label: 'Izquierdo', value: 1},
  {label: 'Derecho', value: 2},
];

const sitio = [
  {label: 'Aplica', value: 1},
  {label: 'Base', value: 2},
];

const frecuenciaPulso = [
  {label: 'Carotideo', value: 1},
  {label: 'Radial', value: 2},
  {label: 'Paro', value: 3},
  {label: 'Cardiorespiratorio', value: 4},
];

const calidad = [
  {label: 'Rápido', value: 3},
  {label: 'Lento', value: 2},
  {label: 'Rítmico', value: 1},
  {label: 'Arrítmico', value: 4},
  {label: 'Ausente', value: 5},
];

const piel = [
  {label: 'Normal', value: 11},
  {label: 'Pálida', value: 4},
  {label: 'Cianotica', value: 5},
  {label: 'Icterico', value: 10},
];

const caracteristicas = [
  {label: 'Caliente', value: 1},
  {label: 'Fría', value: 2},
  {label: 'Diaforesis', value: 3},
];

const dropdownConfigurations = [
  {
    label: 'Nivel de consciencia',
    data: nivelConsciencia,
    fieldKey: 'catalogo_nivel_de_conciencia_id',
  },
  {
    label: 'Vía Aérea',
    data: viaAerea,
    fieldKey: 'catalogo_via_aerea_id',
  },
  {
    label: 'Observaciones',
    data: observaciones,
    fieldKey: 'catalogo_ventilacion_observaciones_id',
  },
  {
    label: 'Auscultación',
    data: auscultacion,
    fieldKey: 'catalogo_ventilacion_auscultacion_id',
  },
  {
    label: 'Hemitorax',
    data: hemitorax,
    fieldKey: 'catalogo_ventilacion_emitorax_id',
  },
  {
    label: 'Sitio',
    data: sitio,
    fieldKey: 'catalogo_ventilacion_sitio_id',
  },
  {
    label: 'Frecuencia de pulso',
    data: frecuenciaPulso,
    fieldKey: 'catalogo_pulsos_id',
  },
  {
    label: 'Calidad',
    data: calidad,
    fieldKey: 'catalogo_calidad_pulso_id',
  },
  {
    label: 'Piel',
    data: piel,
    fieldKey: 'catalogo_piel_id',
  },
  // {
  //   label: 'Características',
  //   data: caracteristicas,
  //   fieldKey: 'caracteristicas',
  // },
];
const validationSchema = object().shape({
  catalogo_nivel_de_conciencia_id: validacionTextoNR(),
  catalogo_via_aerea_id: validacionTextoNR(),
  catalogo_ventilacion_observaciones_id: validacionTextoNR(),
  catalogo_ventilacion_auscultacion_id: validacionTextoNR(),
  catalogo_ventilacion_emitorax_id: validacionTextoNR(),
  catalogo_ventilacion_sitio_id: validacionTextoNR(),
  catalogo_pulsos_id: validacionTextoNR(),
  catalogo_calidad_pulso_id: validacionTextoNR(),
  catalogo_piel_id: validacionTextoNR(),
  // Falta en api
  // caracteristicas: validacionTexto(),
});

const EvaluacionInicial = ({onFormSubmit, closeSection}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Formik
      initialValues={{
        catalogo_nivel_de_conciencia_id: '',
        catalogo_via_aerea_id: '',
        catalogo_ventilacion_observaciones_id: '',
        catalogo_ventilacion_auscultacion_id: '',
        catalogo_ventilacion_emitorax_id: '',
        catalogo_ventilacion_sitio_id: '',
        catalogo_pulsos_id: '',
        catalogo_calidad_pulso_id: '',
        catalogo_piel_id: '',
        // Falta en api
        // caracteristicas: '',
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleSubmit, setFieldValue, values, errors}) => (
        <View>
          {dropdownConfigurations.map(config => (
            <CustomDropdown
              key={config.fieldKey}
              label={config.label}
              data={config.data}
              setFieldValue={setFieldValue}
              fieldKey={config.fieldKey}
              field={values[config.fieldKey]}
              isFocus={isFocus}
              setIsFocus={setIsFocus}
              errors={errors}
            />
          ))}

          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default EvaluacionInicial;
