import {Formik, FieldArray} from 'formik';
import {View, Button, Text, TextInput, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import CustomDropdown from './customDropdown';
import {styles} from '../styles/styles';
import SignosVitalesComponent from './signosVitalesComponent';
import ManejoFarmacologicoComponent from './manejoFarmacologicoComponent ';

const condicionesPaciente = ['Critico', 'No Critico', 'Inestable', 'Estable'];

const prioridad = ['Roja', 'Amarilla', 'Verde', 'Negra'];

const viaAerea = [
  'Aspiración',
  'Cánula Orofaringea',
  'Cánula Nasofaringea',
  'Intubación Orotraqueal',
  'Mascarilla Laríngea',
];

const controlCervical = ['Si', 'No'];

const asistenciaVentilatoria = [
  'Balón - Válvula - Mascarilla',
  'Ventilador Automático',
];

const oxigenoterapia = [
  'Puntas Nasales',
  'Mascarilla Simple',
  'Mascarilla con Reservorio',
];

const controlHemorragias = [
  'Presión Directa',
  'Presión Indirecta',
  'Vendaje',
  'Torniquete',
];

const viasVenosas = ['Linea', 'Catéter'];

const bombaInfusion = ['Si', 'No'];

const sitioAplicacion = ['Mano', 'Pliegue Antecubital', 'Intraosea', 'Otra'];

const tipoSoluciones = ['Hartman', 'NaCl 0.9%', 'Mixta', 'Glucosa 5%', 'Otras'];

const dropdownConfigurations = [
  {
    label: 'Condiciones del Paciente',
    data: condicionesPaciente.map(condition => ({
      label: condition,
      value: condition,
    })),
    fieldKey: 'condiciones_paciente',
  },
  {
    label: 'Prioridad',
    data: prioridad.map(priority => ({
      label: priority,
      value: priority,
    })),
    fieldKey: 'prioridad',
  },
  {
    label: 'Vía Aérea',
    data: viaAerea.map(option => ({
      label: option,
      value: option,
    })),
    fieldKey: 'via_aerea',
  },
  {
    label: 'Control Cervical',
    data: controlCervical.map(option => ({
      label: option,
      value: option,
    })),
    fieldKey: 'control_cervical',
  },
  {
    label: 'Asistencia Ventilatoria',
    data: asistenciaVentilatoria.map(option => ({
      label: option,
      value: option,
    })),
    fieldKey: 'asistencia_ventilatoria',
  },
  {
    label: 'Oxigenoterapia',
    data: oxigenoterapia.map(option => ({
      label: option,
      value: option,
    })),
    fieldKey: 'oxigenoterapia',
  },
  {
    label: 'Control de Hemorragias',
    data: controlHemorragias.map(option => ({
      label: option,
      value: option,
    })),
    fieldKey: 'control_hemorragias',
  },
  {
    label: 'Vías Venosas',
    data: viasVenosas.map(option => ({
      label: option,
      value: option,
    })),
    fieldKey: 'vias_venosas',
  },
  {
    label: 'Bomba de Infusión',
    data: bombaInfusion.map(option => ({
      label: option,
      value: option,
    })),
    fieldKey: 'bomba_infusion',
  },
  {
    label: 'Sitio de Aplicación',
    data: sitioAplicacion.map(option => ({
      label: option,
      value: option,
    })),
    fieldKey: 'sitio_aplicacion',
  },
  {
    label: 'Tipo de Soluciones',
    data: tipoSoluciones.map(option => ({
      label: option,
      value: option,
    })),
    fieldKey: 'tipo_soluciones',
  },
];

const Tratamiento = ({onFormSubmit, closeSection}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Formik
      initialValues={{
        alergias: '',
        medicamentos: '',
        antecedentes_personales: '',
        ultima_ingesta: '',
        condicionesPaciente: '',
        prioridad: '',
        via_aerea: '',
        control_cervical: '',
        asistencia_ventilatoria: '',
        oxigenoterapia: '',
        control_hemorragias: '',
        vias_venosas: '',
        bomba_infusion: '',
        sitio_aplicacion: '',
        tipo_soluciones: '',
        signosVitales: [
          {hora: '', FR: '', FC: '', TAS: '', SA2: '', TEMP: '', EKG: ''},
        ],
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
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, setFieldValue, values}) => (
        <View>
          <Text style={styles.textFormSubtitle}>Signos Vitales:</Text>
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
          </View>
          <Text style={styles.textFormSubtitle}>Interrogatorio</Text>
          <Text style={styles.layoutFormulario}>Alergias:</Text>
          <TextInput
            placeholder="Ingresa alergias"
            style={styles.input}
            onChangeText={handleChange('alergias')}
            onBlur={handleBlur('alergias')}
            value={values.alergias}
          />
          <Text style={styles.layoutFormulario}>Medicamentos:</Text>
          <TextInput
            placeholder="Ingresa Medicamentos"
            style={styles.input}
            onChangeText={handleChange('medicamentos')}
            onBlur={handleBlur('medicamentos')}
            value={values.medicamentos}
          />
          <Text style={styles.layoutFormulario}>Antecedentes Personales:</Text>
          <TextInput
            placeholder="Ingresa Antecedentes Personales"
            style={styles.input}
            onChangeText={handleChange('antecedentes_personales')}
            onBlur={handleBlur('antecedentes_personales')}
            value={values.antecedentes_personales}
          />
          <Text style={styles.layoutFormulario}>Ultima Ingesta:</Text>
          <TextInput
            placeholder="Ingresa Ultima Ingesta"
            style={styles.input}
            onChangeText={handleChange('ultima_ingesta')}
            onBlur={handleBlur('ultima_ingesta')}
            value={values.ultima_ingesta}
          />
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
          <Text style={styles.textFormSubtitle}>Manejo Farmacologico:</Text>
          <View>
            <FieldArray name="manejo_farmacologico">
              {arrayHelpers => (
                <ManejoFarmacologicoComponent
                  manejoFarmacologico={values.manejo_farmacologico}
                  arrayHelpers={arrayHelpers}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
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
