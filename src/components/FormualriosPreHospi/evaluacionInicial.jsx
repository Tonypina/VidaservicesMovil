import {Formik} from 'formik';
import {View, TouchableOpacity, Text} from 'react-native';
import {useState} from 'react';
import CustomDropdown from './customDropdown';
import {styles} from '../styles/styles';

const nivelConsciencia = [
  {label: 'Consciente', value: 'Consciente'},
  {label: 'Respuesta a estimulo verbal', value: 'Respuesta a estimulo verbal'},
  {
    label: 'Respuesta a estimulo doloroso',
    value: 'Respuesta a estimulo doloroso',
  },
  {label: 'Inconsciente', value: 'Inconsciente'},
];

const viaAerea = [
  {label: 'Permeable', value: 'Permeable'},
  {label: 'Comprometida', value: 'Comprometida'},
];

const observaciones = [
  {label: 'Automatismo regular', value: 'Automatismo regular'},
  {label: 'Ventilación rápida', value: 'Ventilación rápida'},
  {label: 'Ventilación superficial', value: 'Ventilación superficial'},
  {label: 'Apnea', value: 'Apnea'},
];

const auscultacion = [
  {
    label: 'Ruidos Respiratorios Normales',
    value: 'Ruidos Respiratorios Normales',
  },
  {
    label: 'Ruidos Respiratorios Disminuidos',
    value: 'Ruidos Respiratorios Disminuidos',
  },
  {
    label: 'Ruidos Respiratorios Ausentes',
    value: 'Ruidos Respiratorios Ausentes',
  },
];

const hemitorax = [
  {label: 'Izquierdo', value: 'Izquierdo'},
  {label: 'Derecho', value: 'Derecho'},
];

const sitio = [
  {label: 'Aplica', value: 'Aplica'},
  {label: 'Base', value: 'Base'},
];

const frecuenciaPulso = [
  {label: 'Carotideo', value: 'Carotideo'},
  {label: 'Radial', value: 'Radial'},
  {label: 'Paro', value: 'Paro'},
  {label: 'Cardiorespiratorio', value: 'Cardiorespiratorio'},
];

const calidad = [
  {label: 'Rápido', value: 'Rápido'},
  {label: 'Lento', value: 'Lento'},
  {label: 'Rítmico', value: 'Rítmico'},
  {label: 'Arrítmico', value: 'Arrítmico'},
  {label: 'Ausente', value: 'Ausente'},
];

const piel = [
  {label: 'Normal', value: 'Normal'},
  {label: 'Pálida', value: 'Pálida'},
  {label: 'Cianotica', value: 'Cianotica'},
  {label: 'Icterico', value: 'Icterico'},
];

const caracteristicas = [
  {label: 'Caliente', value: 'Caliente'},
  {label: 'Fría', value: 'Fría'},
  {label: 'Diaforesis', value: 'Diaforesis'},
];

const dropdownConfigurations = [
  {
    label: 'Nivel de consciencia',
    data: nivelConsciencia,
    fieldKey: 'nivel_consciencia',
  },
  {
    label: 'Vía Aérea',
    data: viaAerea,
    fieldKey: 'via_aerea',
  },
  {
    label: 'Observaciones',
    data: observaciones,
    fieldKey: 'observaciones',
  },
  {
    label: 'Auscultación',
    data: auscultacion,
    fieldKey: 'auscultacion',
  },
  {
    label: 'Hemitorax',
    data: hemitorax,
    fieldKey: 'hemitorax',
  },
  {
    label: 'Sitio',
    data: sitio,
    fieldKey: 'sitio',
  },
  {
    label: 'Frecuencia de pulso',
    data: frecuenciaPulso,
    fieldKey: 'frecuencia_pulso',
  },
  {
    label: 'Calidad',
    data: calidad,
    fieldKey: 'calidad',
  },
  {
    label: 'Piel',
    data: piel,
    fieldKey: 'piel',
  },
  {
    label: 'Características',
    data: caracteristicas,
    fieldKey: 'caracteristicas',
  },
];

const EvaluacionInicial = ({onFormSubmit, closeSection}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Formik
      initialValues={{
        nivel_consciencia: '',
        via_aerea: '',
        observaciones: '',
        auscultacion: '',
        hemitorax: '',
        sitio: '',
        frecuencia_pulso: '',
        calidad: '',
        piel: '',
        caracteristicas: '',
      }}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleSubmit, setFieldValue, values}) => (
        <View>
          {dropdownConfigurations.map(config => (
            <CustomDropdown
              key={config.fieldKey}
              label={config.label}
              data={config.data}
              setFieldValue={value => setFieldValue(config.fieldKey, value)}
              field={values[config.fieldKey]}
              isFocus={isFocus}
              setIsFocus={setIsFocus}
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
