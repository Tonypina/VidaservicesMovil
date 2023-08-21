import {Formik, FieldArray} from 'formik';
import {View, Button, Text, TextInput, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import CustomDropdown from './customDropdown';
import {styles} from '../styles/styles';
import ManejoFarmacologicoComponent from './manejoFarmacologicoComponent ';
import {object, array} from 'yup';
import {validacionTexto, validacionNumero} from '../validaciones';

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

const dropdownConfigurations1 = [
  {
    label: 'Condiciones del Paciente',
    data: catalogo_condicion_paciente_id.map((condition, index) => ({
      label: condition,
      value: index + 1,
    })),
    fieldKey: 'catalogo_condicion_paciente_id',
  },
  {
    label: 'Estabilidad',
    data: estabilidad.map((condition, index) => ({
      label: condition,
      value: index + 1,
    })),
    fieldKey: 'estabilidad',
  },
  {
    label: 'Prioridad',
    data: catalogo_clasificacion_id.map((priority, index) => ({
      label: priority,
      value: index + 1,
    })),
    fieldKey: 'catalogo_clasificacion_id',
  }
];

const dropdownConfigurations2 = [
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
    data: catalogo_tratamiento_asistencia_ventilatoria_id.map((option, index) => ({
      label: option,
      value: index + 1,
    })),
    fieldKey: 'catalogo_tratamiento_asistencia_ventilatoria_id',
  }
];

const dropdownConfigurations3 = [
  {
    label: 'Oxigenoterapia',
    data: catalogo_tratamiento_oxigenoterapia_id.map((option, index) => ({
      label: option,
      value: index + 1,
    })),
    fieldKey: 'catalogo_tratamiento_oxigenoterapia_id',
  },
];

const dropdownConfigurations4 = [
  {
    label: 'Control de Hemorragias',
    data: catalogo_tratamiento_control_de_hemorragias_id.map((option, index) => ({
      label: option,
      value: index + 1,
    })),
    fieldKey: 'catalogo_tratamiento_control_de_hemorragias_id',
  },
  {
    label: 'Vías Venosas',
    data: via_venosa_linea.map((option, index) => ({
      label: option,
      value: index + 1,
    })),
    fieldKey: 'via_venosa_linea',
  },
  {
    label: 'Bomba de Infusión',
    data: bomba_de_infusion.map((option, index) => ({
      label: option,
      value: index + 1,
    })),
    fieldKey: 'bomba_de_infusion',
  },
];

const dropdownConfigurations5 = [
  {
    label: 'Sitio de Aplicación',
    data: catalogo_tratamiento_sitio_de_aplicacion_id.map((option, index) => ({
      label: option,
      value: index + 1,
    })),
    fieldKey: 'catalogo_tratamiento_sitio_de_aplicacion_id',
  },
  {
    label: 'Tipo de Soluciones',
    data: catalogo_tratamiento_tipo_de_soluciones_id.map((option, index) => ({
      label: option,
      value: index + 1,
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
    rcp: validacionNumero(),
  });

  const validationSchema = object().shape({
    alergias: validacionTexto(),
    medicamentos_en_consumo: validacionTexto(),
    antecedentes_quirurgicos: validacionTexto(),
    ultima_ingesta: validacionTexto(),
    
    catalogo_condicion_paciente_id: validacionNumero(),
    estabilidad: validacionTexto(),
    catalogo_clasificacion_id: validacionNumero(),
    trauma_score: validacionNumero(),
    glasgow: validacionNumero(),

    catalogo_tratamiento_via_aerea_id: validacionNumero(),
    catalogo_tratamiento_control_cervical_id: validacionNumero(),
    catalogo_tratamiento_asistencia_ventilatoria_id: validacionNumero(),
    frec: validacionTexto(),
    vol: validacionTexto(),
    catalogo_tratamiento_oxigenoterapia_id: validacionNumero(),
    ltsxmin: validacionNumero(),
    catalogo_tratamiento_control_de_hemorragias_id: validacionNumero(),
    via_venosa_linea: validacionNumero(),
    via_venosa_cateter: validacionNumero(),

    bomba_de_infusion: validacionNumero(),
    cant: validacionNumero(),
    catalogo_tratamiento_sitio_de_aplicacion_id: validacionNumero(),
    catalogo_tratamiento_tipo_de_soluciones_id: validacionNumero(),
    cantidad: validacionNumero(),
    infusiones: validacionNumero(),
    
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
        catalogo_clasificacion_id: '',
        estabilidad: '',
        trauma_score: '',
        glasgow: '',
        
        catalogo_tratamiento_via_aerea_id: '',
        catalogo_tratamiento_control_cervical_id: '',
        catalogo_tratamiento_asistencia_ventilatoria_id: '',
        frec: '',
        vol: '',
        catalogo_tratamiento_oxigenoterapia_id: '',
        ltsxmin: '',
        catalogo_tratamiento_control_de_hemorragias_id: '',
        
        via_venosa_linea: '',
        via_venosa_cateter: '',

        bomba_de_infusion: '',
        cant: '',
        
        catalogo_tratamiento_sitio_de_aplicacion_id: '',
        catalogo_tratamiento_tipo_de_soluciones_id: '',
        cantidad: '',
        infusiones: '',
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

          {dropdownConfigurations1.map(config => (
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

          <Text style={styles.layoutFormulario}>Trauma Score:</Text>
          <TextInput
            placeholder="Ingresa Trauma Score"
            style={styles.input}
            onChangeText={handleChange('trauma_score')}
            onBlur={handleBlur('trauma_score')}
            value={values.trauma_score}
          />
          {errors.trauma_score ? (
            <Text style={styles.errorMensaje}>{errors.trauma_score}</Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Glasgow:</Text>
          <TextInput
            placeholder="Ingresa Glasgow"
            style={styles.input}
            onChangeText={handleChange('glasgow')}
            onBlur={handleBlur('glasgow')}
            value={values.glasgow}
          />
          {errors.glasgow ? (
            <Text style={styles.errorMensaje}>{errors.glasgow}</Text>
          ) : null}

          {dropdownConfigurations2.map(config => (
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

          {values.catalogo_tratamiento_asistencia_ventilatoria_id === 2 ? (
            <>
              <Text style={styles.layoutFormulario}>Frecuencia:</Text>
              <TextInput
                placeholder="Ingresa Frecuencia"
                style={styles.input}
                onChangeText={handleChange('frec')}
                onBlur={handleBlur('frec')}
                value={values.frec}
              />
              {errors.frec ? (
                <Text style={styles.errorMensaje}>{errors.frec}</Text>
              ) : null}

              <Text style={styles.layoutFormulario}>Volumen:</Text>
              <TextInput
                placeholder="Ingresa Volumen"
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

          <Text style={styles.layoutFormulario}>LtsXMin:</Text>
          <TextInput
            placeholder="Ingresa Lts X Min"
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

          {values.bomba_de_infusion === 1 ? (
            <>
              <Text style={styles.layoutFormulario}>Cantidad:</Text>
              <TextInput
                placeholder="Ingresa Cantidad"
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

          <Text style={styles.layoutFormulario}>Cantidad:</Text>
          <TextInput
            placeholder="Ingresa Cantidad"
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
            style={styles.input}
            onChangeText={handleChange('infusiones')}
            onBlur={handleBlur('infusiones')}
            value={values.infusiones}
          />
          {errors.infusiones ? (
            <Text style={styles.errorMensaje}>{errors.infusiones}</Text>
          ) : null}

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
