import {Formik} from 'formik';
import {View, TouchableOpacity, Text} from 'react-native';
import {useEffect, useState} from 'react';
import CustomDropdown from './customDropdown';
import {styles} from '../styles/styles';
import {object} from 'yup';
import {validacionTexto, validacionTextoNR, validacionNumero} from '../validaciones';

const nivelConsciencia = [
  {label: 'Consciente', value: 1},
  {label: 'Respuesta Verbal', value: 2},
  {label: 'Respuesta a Estimulo Doloroso', value: 3},
  {label: 'Inconsciente', value: 4},
];

const viaAerea = [
  {label: 'Permeable', value: 1},
  {label: 'Comprometida', value: 2},
];

const observaciones = [
  {label: 'Automatismo Regular', value: 1},
  {label: 'Ventilación Rápida', value: 2},
  {label: 'Ventilación Superficial', value: 3},
  {label: 'Automatismo Irregular', value: 5},
  {label: 'Apnea', value: 4},
];

const auscultacion = [
  {label: 'Ruidos Respiratorios Normales', value: 1},
  {label: 'Ruidos Respiratorios Disminuidos', value: 2},
  {label: 'Ruidos Respiratorios Ausentes', value: 3},
];

const hemitorax = [
  {label: 'Izquierdo', value: 1},
  {label: 'Derecho', value: 2},
  {label: 'Ambos', value: 3},
];

const sitio = [
  {label: 'Apice', value: 1},
  {label: 'Base', value: 2},
  {label: 'Ambos', value: 3},
];

const frecuenciaPulso = [
  {label: 'Carotideo', value: 1},
  {label: 'Radial', value: 2},
  {label: 'Paro Cardiorespiratorio', value: 3},
];

const calidad = [
  {label: 'Rápido', value: 3},
  {label: 'Lento', value: 2},
  {label: 'Rítmico', value: 1},
  {label: 'Arrítmico', value: 4},
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

const validationSchema = object().shape({
  catalogo_nivel_de_conciencia_id: validacionNumero(),
  catalogo_via_aerea_id: validacionNumero(),
  catalogo_ventilacion_observaciones_id: validacionNumero(),
  catalogo_ventilacion_auscultacion_id: validacionNumero(),
  catalogo_ventilacion_emitorax_id: validacionNumero(),
  catalogo_ventilacion_sitio_id: validacionNumero(),
  catalogo_pulsos_id: validacionNumero(),
  catalogo_calidad_pulso_id: validacionNumero(),
  catalogo_piel_id: validacionNumero(),
  catalogo_piel_caracteristicas_id: validacionNumero(),
});


const EvaluacionInicial = ({onFormSubmit, closeSection}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [selectedCalidad, setSelectedCalidad] = useState()
  
  const [dropdownConfigurations, setDropdownConfigurations] = useState([
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
    {
      label: 'Características',
      data: caracteristicas,
      fieldKey: 'catalogo_piel_caracteristicas_id',
    },
  ]);

  useEffect(() => {
    if (selectedCalidad === 3) {
      setDropdownConfigurations(
        dropdownConfigurations.map(drop =>
          drop.fieldKey === 'catalogo_calidad_pulso_id'
            ? {...drop, data: [{label: 'Ausente', value: 5}]}
            : {...drop}
        )
      )
    } else {
      setDropdownConfigurations(
        dropdownConfigurations.map(drop =>
          drop.fieldKey === 'catalogo_calidad_pulso_id'
            ? {...drop, data: calidad}
            : {...drop}
        )
      )
    }
  }, [selectedCalidad])

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
        catalogo_piel_caracteristicas_id: '',
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleSubmit, setFieldValue, values, errors}) => (
        <View>
          <Text style={styles.layoutFormulario}>Datos opcionales</Text>
          {dropdownConfigurations.map(config => (
            <CustomDropdown
              selectedOption={selectedCalidad}
              setSelectedOption={setSelectedCalidad}
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
