import {Formik, FieldArray} from 'formik';
import {View, Button, Text, TextInput, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import CustomDropdown from './customDropdown';
import {styles} from '../styles/styles';
import ManejoFarmacologicoComponent from './manejoFarmacologicoComponent ';
import {object, array} from 'yup';
import {validacionTexto} from '../validaciones';

const catalogo_condicion_paciente_id = ['Critico', 'No Critico'];
const estabilidad = ['Inestable', 'Estable'];

const catalogo_clasificacion_id = ['Roja', 'Amarilla', 'Verde', 'Negra'];

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

const via_venosa_linea = ['Linea', 'Catéter'];

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

const dropdownConfigurations = [
  {
    label: 'Condiciones del Paciente',
    data: catalogo_condicion_paciente_id.map(condition => ({
      label: condition,
      value: condition,
    })),
    fieldKey: 'catalogo_condicion_paciente_id',
  },
  {
    label: 'Estabilidad',
    data: estabilidad.map(condition => ({
      label: condition,
      value: condition,
    })),
    fieldKey: 'estabilidad',
  },
  {
    label: 'Prioridad',
    data: catalogo_clasificacion_id.map(priority => ({
      label: priority,
      value: priority,
    })),
    fieldKey: 'catalogo_clasificacion_id',
  },
  {
    label: 'Vía Aérea',
    data: viaAerea.map(option => ({
      label: option,
      value: option,
    })),
    fieldKey: 'catalogo_tratamiento_via_aerea_id',
  },
  {
    label: 'Control Cervical',
    data: catalogo_tratamiento_control_cervical_id.map(option => ({
      label: option,
      value: option,
    })),
    fieldKey: 'catalogo_tratamiento_control_cervical_id',
  },
  {
    label: 'Asistencia Ventilatoria',
    data: catalogo_tratamiento_asistencia_ventilatoria_id.map(option => ({
      label: option,
      value: option,
    })),
    fieldKey: 'catalogo_tratamiento_asistencia_ventilatoria_id',
  },
  {
    label: 'Oxigenoterapia',
    data: catalogo_tratamiento_oxigenoterapia_id.map(option => ({
      label: option,
      value: option,
    })),
    fieldKey: 'catalogo_tratamiento_oxigenoterapia_id',
  },
  {
    label: 'Control de Hemorragias',
    data: catalogo_tratamiento_control_de_hemorragias_id.map(option => ({
      label: option,
      value: option,
    })),
    fieldKey: 'catalogo_tratamiento_control_de_hemorragias_id',
  },
  {
    label: 'Vías Venosas',
    data: via_venosa_linea.map(option => ({
      label: option,
      value: option,
    })),
    fieldKey: 'via_venosa_linea',
  },
  {
    label: 'Bomba de Infusión',
    data: bomba_de_infusion.map(option => ({
      label: option,
      value: option,
    })),
    fieldKey: 'bomba_de_infusion',
  },
  {
    label: 'Sitio de Aplicación',
    data: catalogo_tratamiento_sitio_de_aplicacion_id.map(option => ({
      label: option,
      value: option,
    })),
    fieldKey: 'catalogo_tratamiento_sitio_de_aplicacion_id',
  },
  {
    label: 'Tipo de Soluciones',
    data: catalogo_tratamiento_tipo_de_soluciones_id.map(option => ({
      label: option,
      value: option,
    })),
    fieldKey: 'catalogo_tratamiento_tipo_de_soluciones_id',
  },
];

const Tratamiento = ({onFormSubmit, closeSection}) => {
  const [isFocus, setIsFocus] = useState(false);

  const manejoFarmacologicoSchema = object().shape({
    medicamento: validacionTexto(),
    dosis: validacionTexto(),
    via_administracion: validacionTexto(),
    terapia_electrica: validacionTexto(),
    rcp: validacionTexto(),
  });

  const validationSchema = object().shape({
    alergias: validacionTexto(),
    medicamentos_en_consumo: validacionTexto(),
    antecedentes_quirurgicos: validacionTexto(),
    ultima_ingesta: validacionTexto(),

    catalogo_condicion_paciente_id: validacionTexto(),
    estabilidad: validacionTexto(),
    catalogo_clasificacion_id: validacionTexto(),

    catalogo_tratamiento_via_aerea_id: validacionTexto(),
    control_cervical: validacionTexto(),
    catalogo_tratamiento_asistencia_ventilatoria_id: validacionTexto(),
    catalogo_tratamiento_oxigenoterapia_id: validacionTexto(),
    catalogo_tratamiento_control_de_hemorragias_id: validacionTexto(),
    via_venosa_linea: validacionTexto(),

    bomba_de_infusion: validacionTexto(),
    catalogo_tratamiento_sitio_de_aplicacion_id: validacionTexto(),
    catalogo_tratamiento_tipo_de_soluciones_id: validacionTexto(),
    manejo_farmacologico: array().of(manejoFarmacologicoSchema),
  });

  return (
    <Formik
      initialValues={{
        alergias: '',
        medicamentos_en_consumo: '',
        antecedentes_quirurgicos: '',
        ultima_ingesta: '',

        catalogo_condicion_paciente_id: '',
        estabilidad: '',
        catalogo_clasificacion_id: '',

        catalogo_tratamiento_via_aerea_id: '',
        control_cervical: '',
        catalogo_tratamiento_asistencia_ventilatoria_id: '',
        catalogo_tratamiento_oxigenoterapia_id: '',
        catalogo_tratamiento_control_de_hemorragias_id: '',
        via_venosa_linea: '',

        bomba_de_infusion: '',
        catalogo_tratamiento_sitio_de_aplicacion_id: '',
        catalogo_tratamiento_tipo_de_soluciones_id: '',
        // signosVitales: [
        //   {hora: '', FR: '', FC: '', TAS: '', SA2: '', TEMP: '', EKG: ''},
        // ],
        manejo_farmacologico: [
          {
            hora: '',
            medicamento: '',
            dosis: '',
            via_administracion: '',
            terapia_electrica: '',
            rcp: '',
          },
        ],
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
          {/* <Text style={styles.textFormSubtitle}>Signos Vitales:</Text>
          <View>
            <FieldArray name="signosVitales">
              {arrayHelpers => (
                <SignosVitalesComponent
                  signosVitales={values.signosVitales}
                  arrayHelpers={arrayHelpers}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              )}
            </FieldArray>
          </View> */}
          <Text style={styles.textFormSubtitle}>Interrogatorio</Text>
          <Text style={styles.layoutFormulario}>Alergias:</Text>
          <TextInput
            placeholder="Ingresa alergias"
            style={styles.input}
            onChangeText={handleChange('alergias')}
            onBlur={handleBlur('alergias')}
            value={values.alergias}
          />
          {errors.alergias ? (
            <Text style={styles.errorMensaje}>{errors.alergias}</Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Medicamentos:</Text>
          <TextInput
            placeholder="Ingresa Medicamentos"
            style={styles.input}
            onChangeText={handleChange('medicamentos_en_consumo')}
            onBlur={handleBlur('medicamentos_en_consumo')}
            value={values.medicamentos_en_consumo}
          />
          {errors.medicamentos_en_consumo ? (
            <Text style={styles.errorMensaje}>
              {errors.medicamentos_en_consumo}
            </Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Antecedentes Personales:</Text>
          <TextInput
            placeholder="Ingresa Antecedentes Personales"
            style={styles.input}
            onChangeText={handleChange('antecedentes_quirurgicos')}
            onBlur={handleBlur('antecedentes_quirurgicos')}
            value={values.antecedentes_quirurgicos}
          />
          {errors.antecedentes_quirurgicos ? (
            <Text style={styles.errorMensaje}>
              {errors.antecedentes_quirurgicos}
            </Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Ultima Ingesta:</Text>
          <TextInput
            placeholder="Ingresa Ultima Ingesta"
            style={styles.input}
            onChangeText={handleChange('ultima_ingesta')}
            onBlur={handleBlur('ultima_ingesta')}
            value={values.ultima_ingesta}
          />
          {errors.ultima_ingesta ? (
            <Text style={styles.errorMensaje}>{errors.ultima_ingesta}</Text>
          ) : null}

          {console.log(errors)}

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

          <Text style={styles.textFormSubtitle}>Manejo Farmacologico:</Text>
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

          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default Tratamiento;
