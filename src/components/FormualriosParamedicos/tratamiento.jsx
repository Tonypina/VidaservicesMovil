import {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Formik, FieldArray} from 'formik';
import * as yup from 'yup';
import CustomDropdown from './customDropdown';
import ManejoFarmacologicoComponent from './manejoFarmacologicoComponent ';
import {styles} from '../styles/styles';
import {validacionTexto, validacionNumero, validacionNumeroNR, validacionTextoNR} from '../validaciones';

const viaAerea = [
  'Aspiración',
  'Cánula Orofaringea',
  'Cánula Nasofaringea',
  'Intubación Orotraqueal',
  'Mascarilla Laríngea',
];

const catalogo_tratamiento_control_cervical_id = ['Si', 'No'];

const catalogo_tratamiento_asistencia_ventilatoria_id = [
  'Balón - Válvula - Mascarilla',
  'Ventilador Automático',
];

const catalogo_tratamiento_oxigenoterapia_id = [
  'Puntas Nasales',
  'Mascarilla Simple',
  'Mascarilla con Reservorio',
];

const catalogo_tratamiento_control_de_hemorragias_id = [
  'Presión Directa',
  'Presión Indirecta',
  'Vendaje',
  'Torniquete',
];

const via_venosa_cateter = ['Linea', 'Catéter'];

const bomba_de_infusion = ['Si', 'No'];

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

const dropdownConfigurations2 = [
  {
    label: '*Vía Aérea',
    data: viaAerea.map((option, index) => ({
      label: option,
      value: index + 1,
    })),
    fieldKey: 'catalogo_tratamiento_via_aerea_id',
  },
  {
    label: '*Control Cervical',
    data: catalogo_tratamiento_control_cervical_id.map((option, index) => ({
      label: option,
      value: index + 1,
    })),
    fieldKey: 'catalogo_tratamiento_control_cervical_id',
  },
  {
    label: '*Asistencia Ventilatoria',
    data: catalogo_tratamiento_asistencia_ventilatoria_id.map(
      (option, index) => ({
        label: option,
        value: index + 1,
      }),
    ),
    fieldKey: 'catalogo_tratamiento_asistencia_ventilatoria_id',
  },
];

const dropdownConfigurations3 = [
  {
    label: '*Oxigenoterapia',
    data: catalogo_tratamiento_oxigenoterapia_id.map((option, index) => ({
      label: option,
      value: index + 1,
    })),
    fieldKey: 'catalogo_tratamiento_oxigenoterapia_id',
  },
];

const dropdownConfigurations4 = [
  {
    label: '*Control de Hemorragias',
    data: catalogo_tratamiento_control_de_hemorragias_id.map(
      (option, index) => ({
        label: option,
        value: index + 1,
      }),
    ),
    fieldKey: 'catalogo_tratamiento_control_de_hemorragias_id',
  },
  {
    label: '*Vías Venosas',
    data: via_venosa_cateter.map((option, index) => ({
      label: option,
      value: index + 1,
    })),
    fieldKey: 'via_venosa_cateter',
  },
  {
    label: '*Bomba de Infusión',
    data: bomba_de_infusion.map((option, index) => ({
      label: option,
      value: index + 1,
    })),
    fieldKey: 'bomba_de_infusion',
  },
];

const dropdownConfigurations5 = [
  {
    label: '*Sitio de Aplicación',
    data: catalogo_tratamiento_sitio_de_aplicacion_id.map((option, index) => ({
      label: option,
      value: index + 1,
    })),
    fieldKey: 'catalogo_tratamiento_sitio_de_aplicacion_id',
  },
  {
    label: '*Tipo de Soluciones',
    data: catalogo_tratamiento_tipo_de_soluciones_id.map((option, index) => ({
      label: option,
      value: index + 1,
    })),
    fieldKey: 'catalogo_tratamiento_tipo_de_soluciones_id',
  },
];

const manejoFarmacologicoSchema = yup.object().shape({
  medicamento: validacionTextoNR(),
  dosis: validacionTextoNR(),
  via_administracion: validacionTextoNR(),
  terapia_electrica: validacionTextoNR(),
  rcp: validacionNumeroNR(),
});

const validationSchema = yup.object().shape({
  

  catalogo_condicion_paciente_id: validacionNumeroNR(),
  estabilidad: validacionTextoNR(),
  catalogo_clasificacion_id: validacionNumeroNR(),
  trauma_score: validacionNumeroNR(),
  glasgow: validacionNumeroNR(),

  catalogo_tratamiento_via_aerea_id: validacionNumeroNR(),
  catalogo_tratamiento_control_cervical_id: validacionNumeroNR(),
  catalogo_tratamiento_asistencia_ventilatoria_id: validacionNumeroNR(),

  frec: validacionNumero().when(
    'catalogo_tratamiento_asistencia_ventilatoria_id',
    {
      is: catalogo_tratamiento_asistencia_ventilatoria_id =>
        catalogo_tratamiento_asistencia_ventilatoria_id === 2,
      then: () => validacionNumero(),
      otherwise: () => yup.number(),
    },
  ),

  vias_venosas_num: validacionNumeroNR(),

  vol: validacionNumero().when(
    'catalogo_tratamiento_asistencia_ventilatoria_id',
    {
      is: catalogo_tratamiento_asistencia_ventilatoria_id =>
        catalogo_tratamiento_asistencia_ventilatoria_id === 2,
      then: () => validacionNumero(),
      otherwise: () => yup.number(),
    },
  ),

  catalogo_tratamiento_oxigenoterapia_id: validacionNumeroNR(),
  ltsxmin: validacionNumeroNR(),
  catalogo_tratamiento_control_de_hemorragias_id: validacionNumeroNR(),
  via_venosa_cateter: validacionNumeroNR(),
  via_venosa_num: validacionNumeroNR(),
  // via_venosa_linea: validacionNumero(),
  // via_venosa_cateter: validacionNumero(),

  bomba_de_infusion: validacionNumeroNR(),

  cant: yup.number().when(
    'bomba_de_infusion', 
    {
      is: bomba_de_infusion => 
        bomba_de_infusion === 1,
      then: () => validacionNumero(),
      otherwise: () => yup.number(),
    }
  ),

  catalogo_tratamiento_sitio_de_aplicacion_id: validacionNumeroNR(),
  catalogo_tratamiento_tipo_de_soluciones_id: validacionNumeroNR(),
  cantidad: validacionNumeroNR(),
  infusiones: validacionNumeroNR(),

  manejo_farmacologico: yup.array().of(manejoFarmacologicoSchema),
});

const Tratamiento = ({onFormSubmit, closeSection}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    catalogo_tratamiento_asistencia_ventilatoria_id: '',
    bomba_de_infusion: '',
  });

  return (
    <Formik
      initialValues={{

        catalogo_tratamiento_via_aerea_id: '',
        catalogo_tratamiento_control_cervical_id: '',
        catalogo_tratamiento_asistencia_ventilatoria_id: '',
        frec: '',
        vol: '',
        catalogo_tratamiento_oxigenoterapia_id: '',
        ltsxmin: '',
        catalogo_tratamiento_control_de_hemorragias_id: '',

        via_venosa_cateter: '',
        vias_venosas_num: '',

        bomba_de_infusion: '',
        cant: '',

        catalogo_tratamiento_sitio_de_aplicacion_id: '',
        catalogo_tratamiento_tipo_de_soluciones_id: '',
        cantidad: '',
        infusiones: '',
        manejo_farmacologico: [],
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal

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
          <Text style={styles.layoutFormulario}>(*) Datos opcionales</Text>

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

          {values.catalogo_tratamiento_asistencia_ventilatoria_id === 2 ? (
            <>
              <Text style={styles.layoutFormulario}>*Frecuencia:</Text>
              <TextInput
                placeholder="Ingresa Frecuencia"
                keyboardType="numeric"
                style={styles.input}
                onChangeText={handleChange('frec')}
                onBlur={handleBlur('frec')}
                value={values.frec}
              />
              {errors.frec ? (
                <Text style={styles.errorMensaje}>{errors.frec}</Text>
              ) : null}

              <Text style={styles.layoutFormulario}>*Volumen:</Text>
              <TextInput
                placeholder="Ingresa Volumen"
                keyboardType="numeric"
                style={styles.input}
                onChangeText={handleChange('vol')}
                onBlur={handleBlur('vol')}
                value={values.vol}
              />
              {errors.vol ? (
                <Text style={styles.errorMensaje}>{errors.vol}</Text>
              ) : null}
            </>
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

          <Text style={styles.layoutFormulario}>*LtsXMin:</Text>
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

          {dropdownConfigurations4.map(config => (
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

          <Text style={styles.layoutFormulario}>*#:</Text>
          <TextInput
            placeholder="#"
            keyboardType="numeric"
            style={styles.input}
            onChangeText={handleChange('vias_venosas_num')}
            onBlur={handleBlur('vias_venosas_num')}
            value={values.vias_venosas_num}
          />
          {errors.vias_venosas_num ? (
            <Text style={styles.errorMensaje}>{errors.vias_venosas_num}</Text>
          ) : null}

          {values.bomba_de_infusion === 1 ? (
            <>
              <Text style={styles.layoutFormulario}>*Cantidad:</Text>
              <TextInput
                placeholder="Ingresa Cantidad"
                keyboardType="numeric"
                style={styles.input}
                onChangeText={handleChange('cant')}
                onBlur={handleBlur('cant')}
                value={values.cant}
              />
              {errors.cant ? (
                <Text style={styles.errorMensaje}>{errors.cant}</Text>
              ) : null}
            </>
          ) : null}

          {dropdownConfigurations5.map(config => (
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

          <Text style={styles.layoutFormulario}>*Cantidad:</Text>
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

          <Text style={styles.layoutFormulario}>*Infusiones:</Text>
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

          <Text style={styles.textFormSubtitle}>*Manejo Farmacologico:</Text>
          <View>
            <FieldArray name="manejo_farmacologico">
              {arrayHelpers => (
                <ManejoFarmacologicoComponent
                  manejoFarmacologico={values.manejo_farmacologico}
                  arrayHelpers={arrayHelpers}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                />
              )}
            </FieldArray>
          </View>

          <TouchableOpacity
            style={styles.botonSave}
            onPress={() => {
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
