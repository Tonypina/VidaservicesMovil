import {Formik} from 'formik';
import {View, TouchableOpacity, Text} from 'react-native';
import {useEffect, useReducer, useState} from 'react';
import CustomDropdown from './customDropdown';
import {styles} from '../styles/styles';
import {object} from 'yup';
import {validacionTexto, validacionTextoNR, validacionNumero} from '../validaciones';
import { err } from 'react-native-svg/lib/typescript/xml';

const nivelConsciencia = [
  {label: 'Alerta', value: 1},
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
  {label: 'Rápido - Rítmico', value: 3},
  {label: 'Lento - Rítmico', value: 2},
  {label: 'Rápido - Arrítmico', value: 1},
  {label: 'Lento - Arrítmico', value: 4},
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

const EvaluacionInicial = ({onFormSubmit, closeSection, isConsciente}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [selectedOption, setSelectedOption] = useState({    
  })

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

  const [excludeItems, setExcludeItems] = useState({})

  useEffect(() => {
    if (isConsciente) {
      setExcludeItems(prevExcludeItems => ({
        ...prevExcludeItems,
        0: [
          {label: 'Inconsciente', value: 4},
        ],
      }))
    } else {
      setExcludeItems(prevExcludeItems => ({
        ...prevExcludeItems,
        0: [{label: 'Alerta', value: 1}],
      }))
    }

  }, [isConsciente])

  useEffect(() => {


    if (selectedOption.catalogo_via_aerea_id === 2) {
      setExcludeItems(prevExcludeItems => ({
        ...prevExcludeItems,
        3: [
          {label: 'Ruidos Respiratorios Normales', value: 1},
        ],
        2: [
          {label: 'Automatismo Regular', value: 1},
        ]
      }))
      
    } else {
      setExcludeItems(prevExcludeItems => ({
        ...prevExcludeItems,
        2: [],
        3: [],
      }))
    }

    if (selectedOption.catalogo_ventilacion_observaciones_id === 4) {
      setExcludeItems(prevExcludeItems => ({
        ...prevExcludeItems,
        3: [
          {label: 'Ruidos Respiratorios Normales', value: 1},
          {label: 'Ruidos Respiratorios Disminuidos', value: 2},
        ],
        4: [
          {label: 'Izquierdo', value: 1},
          {label: 'Derecho', value: 2},
        ],
        5: [
          {label: 'Apice', value: 1},
          {label: 'Base', value: 2},
        ],
      }))
      
    } else {
      setExcludeItems(prevExcludeItems => ({
        ...prevExcludeItems,
        3: (selectedOption.catalogo_via_aerea_id === 2) ? prevExcludeItems[3] : [],
        4: [],
        5: [],
      }))
    }
    
    if (selectedOption.catalogo_ventilacion_auscultacion_id === 1) {
      setExcludeItems(prevExcludeItems => ({
        ...prevExcludeItems,
        4: [
          {label: 'Izquierdo', value: 1},
          {label: 'Derecho', value: 2},
        ],
        5: [
          {label: 'Apice', value: 1},
          {label: 'Base', value: 2},
        ],
      }))
      
    } else {
      setExcludeItems(prevExcludeItems => ({
        ...prevExcludeItems,
        4: (selectedOption.catalogo_ventilacion_observaciones_id === 4) ? prevExcludeItems[4] : [],
        5: (selectedOption.catalogo_ventilacion_observaciones_id === 4) ? prevExcludeItems[5] : [],
      }))
    }

    if (selectedOption.catalogo_pulsos_id === 3) {
      setExcludeItems(prevExcludeItems => ({
        ...prevExcludeItems,
        7: [
          {label: 'Rápido - Rítmico', value: 3},
          {label: 'Lento - Rítmico', value: 2},
          {label: 'Rápido - Arrítmico', value: 1},
          {label: 'Lento - Arrítmico', value: 4},
        ],
      }))
      
    } else {
      setExcludeItems(prevExcludeItems => ({
        ...prevExcludeItems,
        7: [{label: 'Ausente', value: 5}],
      }))
    }
    
  }, [selectedOption])

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
          {dropdownConfigurations.map((config, index) => {
            return (
              <CustomDropdown
                excludeItems={excludeItems[index]}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                key={index}
                label={config.label}
                data={config.data}
                setFieldValue={setFieldValue}
                fieldKey={config.fieldKey}
                field={values[config.fieldKey]}
                isFocus={isFocus}
                setIsFocus={setIsFocus}
                errors={errors}
              />
            )
          })}

          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default EvaluacionInicial;
