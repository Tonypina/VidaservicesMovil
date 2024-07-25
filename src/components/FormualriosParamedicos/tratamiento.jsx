import {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Formik, FieldArray} from 'formik';
import * as yup from 'yup';
import CustomDropdown from './customDropdown';
import CustomMultiSelect from './customMultiSelect';
import ManejoFarmacologicoComponent from './manejoFarmacologicoComponent ';
import {styles} from '../styles/styles';
import {validacionTexto, validacionNumero, validacionNumeroNR, validacionTextoNR} from '../validaciones';

const viaAerea = [
  'Aspiración',
  'Cánula Orofaringea',
  'Cánula Nasofaringea',
  'Intubación Orotraqueal',
  'Mascarilla Laríngea',
  'No lo requiere',
];

const catalogo_tratamiento_control_cervical_id = ['Sí', 'No'];

const catalogo_tratamiento_asistencia_ventilatoria_id = [
  'Balón - Válvula - Mascarilla',
  'No lo requiere',
];

const catalogo_tratamiento_oxigenoterapia_id = [
  'Puntas Nasales',
  'Mascarilla Simple',
  'Mascarilla con Reservorio',
  'No lo requiere',
];

const catalogo_tratamiento_control_de_hemorragias_id = [
  'Presión Directa',
  'Presión Indirecta',
  'Vendaje',
  'Torniquete',
  'No lo requiere',
];

const via_venosa_catalogo = ['Linea IV', 'No lo requiere'];

const catalogo_tratamiento_sitio_de_aplicacion_id = [
  'Mano',
  'Pliegue Antecubital',
  'Intraosea',
  'Otra',
];

const catalogo_tratamiento_tipo_de_soluciones_id = [
  'Hartman',
  'NaCl 0.9%',
  'Mixta',
  'Glucosa 5%',
  'Otras',
];

const dropdownConfigurations1 = [
  {
    label: 'Vía Aérea',
    data: viaAerea.map((option, index) => ({
      label: option,
      value: index + 1,
    })),
    fieldKey: 'catalogo_tratamiento_via_aerea_id',
  },
  {
    label: 'Control Cervical',
    data: catalogo_tratamiento_control_cervical_id.map((option, index) => ({
      label: option,
      value: index + 1,
    })),
    fieldKey: 'catalogo_tratamiento_control_cervical_id',
  },
  {
    label: 'Asistencia Ventilatoria',
    data: catalogo_tratamiento_asistencia_ventilatoria_id.map(
      (option, index) => ({
        label: option,
        value: index + 1,
      }),
    ),
    fieldKey: 'catalogo_tratamiento_asistencia_ventilatoria_id',
  },
  {
    label: 'Oxigenoterapia',
    data: catalogo_tratamiento_oxigenoterapia_id.map((option, index) => ({
      label: option,
      value: index + 1,
    })),
    fieldKey: 'catalogo_tratamiento_oxigenoterapia_id',
  },
];

const multiSelectConfigurations1 = [
  {
    label: 'Control de Hemorragias',
    data: catalogo_tratamiento_control_de_hemorragias_id.map(
      (option, index) => ({
        label: option,
        value: index + 1,
      }),
    ),
    fieldKey: 'control_de_hemorragias',
  },
];

const multiSelectConfigurations2 = [
  {
    label: 'Tipo de Soluciones',
    data: catalogo_tratamiento_tipo_de_soluciones_id.map(
      (option, index) => ({
        label: option,
        value: index + 1,
      }),
    ),
    fieldKey: 'tipo_de_soluciones',
  },
];

const dropdownConfigurations2 = [
  {
    label: 'Vías Venosas',
    data: via_venosa_catalogo.map((option, index) => ({
      label: option,
      value: index + 1,
    })),
    fieldKey: 'via_venosa_catalogo',
  },
];

const dropdownConfigurations3 = [
  {
    label: 'Sitio de Aplicación',
    data: catalogo_tratamiento_sitio_de_aplicacion_id.map((option, index) => ({
      label: option,
      value: index + 1,
    })),
    fieldKey: 'catalogo_tratamiento_sitio_de_aplicacion_id',
  },
];

const validationSchema = yup.object().shape({

  catalogo_tratamiento_via_aerea_id: validacionNumero(),
  catalogo_tratamiento_control_cervical_id: validacionNumero(),
  catalogo_tratamiento_asistencia_ventilatoria_id: validacionNumero(),

  catalogo_tratamiento_oxigenoterapia_id: validacionNumero(),
  ltsxmin: validacionNumero().when(
    'catalogo_tratamiento_oxigenoterapia_id',
    {
      is: catalogo_tratamiento_oxigenoterapia_id =>
      catalogo_tratamiento_oxigenoterapia_id !== 4,
      then: () => validacionNumero(),
      otherwise: () => yup.number().nullable(),
    }
  ),

  control_de_hemorragias: yup.array().of(yup.number()).min(1, 'Este campo necesita al menos una selección'),
  
  via_venosa_catalogo: validacionNumero(),
  via_venosa_cateter: validacionNumero().when(
    'via_venosa_catalogo',
    {
      is: via_venosa_catalogo =>
      via_venosa_catalogo === 1,
      then: () => validacionNumero(),
      otherwise: () => yup.number().nullable()
    }
  ),

  catalogo_tratamiento_sitio_de_aplicacion_id: validacionNumero().when(
    'via_venosa_catalogo',
    {
      is: via_venosa_catalogo =>
      via_venosa_catalogo === 1,
      then: () => validacionNumero(),
      otherwise: () => yup.number().nullable()
    },
  ),
  tipo_de_soluciones: validacionNumero().when(
    'via_venosa_catalogo',
    {
      is: via_venosa_catalogo =>
      via_venosa_catalogo === 1,
      then: () => yup.array().of(yup.number()).min(1, 'Este campo necesita al menos una selección'),
      otherwise: () => yup.array()
    },
  ),
  cantidad: validacionNumero().when(
    'via_venosa_catalogo',
    {
      is: via_venosa_catalogo =>
      via_venosa_catalogo === 1,
      then: () => validacionNumero(),
      otherwise: () => yup.number().nullable()
    },
  ),
  infusiones: validacionNumero().when(
    'via_venosa_catalogo',
    {
      is: via_venosa_catalogo =>
      via_venosa_catalogo === 1,
      then: () => validacionNumero(),
      otherwise: () => yup.number().nullable()
    },
  )
});

const Tratamiento = ({onFormSubmit, closeSection}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    catalogo_tratamiento_oxigenoterapia_id: '',
    via_venosa_catalogo: '',
  });

  const [control_de_hemorragias, setControl_de_hemorragias] = useState([])
  const [tipo_de_soluciones, setTipo_de_soluciones] = useState([])

  return (
    <Formik
      initialValues={{

        catalogo_tratamiento_via_aerea_id: null,
        catalogo_tratamiento_control_cervical_id: null,
        catalogo_tratamiento_asistencia_ventilatoria_id: null,
        catalogo_tratamiento_oxigenoterapia_id: null,
        ltsxmin: null,
        control_de_hemorragias: [],

        via_venosa_cateter: null,

        catalogo_tratamiento_sitio_de_aplicacion_id: null,
        tipo_de_soluciones: [],

        cantidad: null,
        infusiones: null,
      }}
      validationSchema={validationSchema}
      onSubmit={values => {

        onFormSubmit(values);
        closeSection();
      }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
      }) => (
        <View>
          {dropdownConfigurations1.map(config => (
            <CustomDropdown
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
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

          {selectedOption.catalogo_tratamiento_oxigenoterapia_id !== 4 && (
            <>
              <Text style={styles.layoutFormulario}>LtsXMin:</Text>
              <TextInput
                placeholder="Ingresa Lts X Min"
                keyboardType="numeric"
                style={styles.input}
                onChangeText={handleChange('ltsxmin')}
                onBlur={handleBlur('ltsxmin')}
                value={values.ltsxmin}
              />
              {errors.ltsxmin ? (
                <Text style={styles.errorMensaje}>{errors.ltsxmin}</Text>
              ) : null}
            </>
          )}

          {multiSelectConfigurations1.map(config => (
            <CustomMultiSelect
              key={config.fieldKey}
              label={config.label}
              data={config.data}
              setFieldValue={setControl_de_hemorragias}
              fieldKey={config.fieldKey}
              field={control_de_hemorragias}
              isFocus={isFocus}
              setIsFocus={setIsFocus}
              errors={errors}
              />
          ))}

          {dropdownConfigurations2.map(config => (
            <CustomDropdown
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
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

          {selectedOption.via_venosa_catalogo === 1 && (
            <>
              <Text style={styles.layoutFormulario}>Cateter #:</Text>
              <TextInput
                placeholder="Ingresa el número de cateter"
                keyboardType="numeric"
                style={styles.input}
                onChangeText={handleChange('via_venosa_cateter')}
                onBlur={handleBlur('via_venosa_cateter')}
                value={values.via_venosa_cateter}
              />
              {errors.via_venosa_cateter ? (
                <Text style={styles.errorMensaje}>{errors.via_venosa_cateter}</Text>
              ) : null}
            
              {dropdownConfigurations3.map(config => (
                <CustomDropdown
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
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
              
              {multiSelectConfigurations2.map(config => (
                <CustomMultiSelect
                  key={config.fieldKey}
                  label={config.label}
                  data={config.data}
                  setFieldValue={setTipo_de_soluciones}
                  fieldKey={config.fieldKey}
                  field={tipo_de_soluciones}
                  isFocus={isFocus}
                  setIsFocus={setIsFocus}
                  errors={errors}
                  />
              ))}
    
              <Text style={styles.layoutFormulario}>Cantidad:</Text>
              <TextInput
                placeholder="Ingresa Cantidad"
                keyboardType="numeric"
                style={styles.input}
                onChangeText={handleChange('cantidad')}
                onBlur={handleBlur('cantidad')}
                value={values.cantidad}
              />
              {errors.cantidad ? (
                <Text style={styles.errorMensaje}>{errors.cantidad}</Text>
              ) : null}
    
              <Text style={styles.layoutFormulario}>Infusiones:</Text>
              <TextInput
                placeholder="Ingresa Infusiones"
                keyboardType="numeric"
                style={styles.input}
                onChangeText={handleChange('infusiones')}
                onBlur={handleBlur('infusiones')}
                value={values.infusiones}
              />
              {errors.infusiones ? (
                <Text style={styles.errorMensaje}>{errors.infusiones}</Text>
              ) : null}
            </>
          )}

          <TouchableOpacity
            style={styles.botonSave}
            onPress={() => {
              values.control_de_hemorragias = control_de_hemorragias;
              values.tipo_de_soluciones = tipo_de_soluciones;
              console.log(errors);
              handleSubmit();
            }}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default Tratamiento;
