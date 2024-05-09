import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Formik, FieldArray} from 'formik';
import * as yup from 'yup';
import ManejoFarmacologicoComponent from './manejoFarmacologicoComponent ';
import {styles} from '../styles/styles';
import {validacionTexto, validacionNumeroNR, validacionTextoNR, validacionNumero} from '../validaciones';
import { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

const manejoFarmacologicoSchema = yup.object().shape({
  hora: validacionTexto(),
  medicamento: validacionTexto(),
  dosis: validacionTexto(),
  via_administracion: validacionTexto(),
  terapia_electrica_paramedico: validacionNumero(),
  rcp: validacionNumero(),
});

const validationSchema = yup.object().shape({
  direccion_medica_a_cargo_de: validacionTextoNR(),
  cedula_profesional: validacionTextoNR(),
  manejo_farmacologico: yup.array().of(manejoFarmacologicoSchema),
});

const Tratamiento = ({onFormSubmit, closeSection}) => {
  
  const [isFocus, setIsFocus] = useState(false) 
  const [isRequired, setIsRequired] = useState(false) 

  return (
    <Formik
      initialValues={{
        direccion_medica_a_cargo_de: '',
        cedula_profesional: '',
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
        values,
        errors,
      }) => (
        <View>

          <Text style={styles.layoutFormulario}>¿Se requiere manejo farmacológico?</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={[{label: 'Sí', value: true}, {label: 'No', value: false}]}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Selecciona' : '...'}
            searchPlaceholder="Busca..."
            value={values.isTrasladado}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              values.isTrasladado = item.value;
              setIsFocus(false);
              setIsRequired(item.value);
            }}
          />

          {isRequired && (
            <>
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

              <Text style={styles.layoutFormulario}>Dirección médica a cargo de:</Text>
              <TextInput
                placeholder="Ingresa texto"
                style={styles.input}
                onChangeText={handleChange('direccion_medica_a_cargo_de')}
                onBlur={handleBlur('direccion_medica_a_cargo_de')}
                value={values.direccion_medica_a_cargo_de}
              />
              {errors.direccion_medica_a_cargo_de ? (
                <Text style={styles.errorMensaje}>{errors.direccion_medica_a_cargo_de}</Text>
              ) : null}

              <Text style={styles.layoutFormulario}>Cédula Profesional:</Text>
              <TextInput
                placeholder="Ingresa Cédula Profesional"
                style={styles.input}
                onChangeText={handleChange('cedula_profesional')}
                onBlur={handleBlur('cedula_profesional')}
                value={values.cedula_profesional}
              />
              {errors.cedula_profesional ? (
                <Text style={styles.errorMensaje}>{errors.cedula_profesional}</Text>
              ) : null}
            </>
          )}
          

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
