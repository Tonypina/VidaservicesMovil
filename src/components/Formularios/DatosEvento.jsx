import {Formik} from 'formik';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Platform,
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import React, {useState, memo} from 'react';
import {styles} from '../styles/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import {validacionTexto, validacionNumero} from '../validaciones';

const validationSchema = object().shape({
  folio: validacionNumero(),
  catalogo_lugar_id: validacionNumero(),
  calle: validacionTexto(),
  colonia: validacionTexto(),
  alcaldia: validacionTexto(),
  entre_calles_1: validacionTexto(),
  cliente: validacionTexto(),
  siniestro: validacionTexto(),
});
import {object} from 'yup';

const DatosEvento = ({onFormSubmit, closeSection}) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [times, setTimes] = useState({
    salida: new Date(),
    contacto: new Date(),
    termino: new Date(),
  });
  const [showTimePickers, setShowTimePickers] = useState({
    salida: false,
    contacto: false,
    termino: false,
  });

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);

    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const toggleTimePicker = type => {
    setShowTimePickers(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleTimeChange = (type, event, selectedTime) => {
    setShowTimePickers(prev => ({
      ...prev,
      [type]: false,
    }));
    if (selectedTime) {
      setTimes(prev => ({
        ...prev,
        [type]: selectedTime,
      }));
    }
  };
  // Lugar
  const [lugarOptions, setLugarOptions] = useState([
    {
      id: 1,
      label: 'Hogar',
      value: 'hogar',
    },
    {
      id: 2,
      label: 'Vía Publica',
      value: 'viaPublica',
    },
    {
      id: 3,
      label: 'Trabajo',
      value: 'trabajo',
    },
    {
      id: 4,
      label: 'Escuela',
      value: 'escuela',
    },
    {
      id: 5,
      label: 'Recreación',
      value: 'recreacion',
    },
  ]);

  return (
    <Formik
      initialValues={{
        folio: '',
        atencion_fecha: '',
        salida_hora: '',
        contacto_hora: '',
        termino_hora: '',
        catalogo_lugar_id: '',
        calle: '',
        colonia: '',
        alcaldia: '',
        entre_calles_1: '',
        cliente: '',
        siniestro: '',
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        // Envía los datos ingresados al componente principal
        values.atencion_fecha = date;
        values.salida_hora = times.salida;
        values.contacto_hora = times.contacto;
        values.termino_hora = times.termino;

        onFormSubmit(values);
        closeSection();
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View>
          <Text style={styles.layoutFormulario}>Folio: </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.prefix}>C -</Text>
            <TextInput
              placeholder="Ingresa el folio"
              inputMode="numeric"
              keyboardType="numeric"
              onChangeText={handleChange('folio')}
              onBlur={handleBlur('folio')}
            />
          </View>
          {errors.folio ? (
            <Text style={styles.errorMensaje}>{errors.folio}</Text>
          ) : null}
          <View style={{marginTop: 6}}>
            <Text style={styles.layoutFormulario}>Seleccione la Fecha</Text>
            <TouchableOpacity onPress={toggleDatePicker}>
              <TextInput
                style={styles.input}
                editable={false}
                placeholder="Seleccione una fecha"
                onChangeText={handleChange('atencion_fecha')}
                onBlur={handleBlur('atencion_fecha')}
                value={date.toDateString()}
              />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                mode="date"
                display="calendar"
                value={date}
                onChange={handleDateChange}
              />
            )}
          </View>

          {Object.entries(times).map(([type, time]) => (
            <View key={type}>
              <Text style={styles.layoutFormulario}>
                Hora de atención ({type[0].toUpperCase() + type.slice(1)}):
              </Text>
              <TouchableOpacity onPress={() => toggleTimePicker(type)}>
                <TextInput
                  style={styles.input}
                  editable={false}
                  placeholder="Seleccione una hora"
                  value={time.toLocaleTimeString()}
                />
              </TouchableOpacity>

              {showTimePickers[type] && (
                <DateTimePicker
                  mode="time"
                  display="spinner"
                  value={time}
                  onChange={(event, selectedTime) =>
                    handleTimeChange(type, event, selectedTime)
                  }
                />
              )}
            </View>
          ))}

          <Text style={styles.layoutFormulario}>Lugar dónde ocurrió:</Text>
          <View>
            <RadioGroup
              radioButtons={lugarOptions}
              onPress={lugarOptions => {
                setLugarOptions(lugarOptions);

                Object.keys(lugarOptions).forEach(key => {
                  if (lugarOptions[key].selected) {
                    values.catalogo_lugar_id = lugarOptions[key].id;
                  }
                });
              }}
              containerStyle={styles.radioGroup}
            />
          </View>
          {errors.catalogo_lugar_id ? (
            <Text style={styles.errorMensaje}>{errors.catalogo_lugar_id}</Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Avenida/Calle y número: </Text>
          <TextInput
            placeholder="Ingresa la Avenida/Calle y número"
            style={styles.input}
            onChangeText={handleChange('calle')}
            onBlur={handleBlur('calle')}
            value={values.calle}
          />
          {errors.calle ? (
            <Text style={styles.errorMensaje}>{errors.calle}</Text>
          ) : null}
          <Text style={styles.layoutFormulario}>Colonia: </Text>
          <TextInput
            placeholder="Ingresa la colonia"
            style={styles.input}
            onChangeText={handleChange('colonia')}
            onBlur={handleBlur('colonia')}
            value={values.colonia}
          />
          {errors.colonia ? (
            <Text style={styles.errorMensaje}>{errors.colonia}</Text>
          ) : null}
          <Text style={styles.layoutFormulario}>Alcaldia: </Text>
          <TextInput
            placeholder="Ingresa la alcaldia"
            style={styles.input}
            onChangeText={handleChange('alcaldia')}
            onBlur={handleBlur('alcaldia')}
            value={values.alcaldia}
          />
          {errors.alcaldia ? (
            <Text style={styles.errorMensaje}>{errors.alcaldia}</Text>
          ) : null}
          <Text style={styles.layoutFormulario}>Entre calles: </Text>
          <TextInput
            placeholder="Ingresa entre que calles está"
            style={styles.input}
            onChangeText={handleChange('entre_calles_1')}
            onBlur={handleBlur('entre_calles_1')}
            value={values.entre_calles_1}
          />
          {errors.entre_calles_1 ? (
            <Text style={styles.errorMensaje}>{errors.entre_calles_1}</Text>
          ) : null}
          <Text style={styles.layoutFormulario}>Cliente: </Text>
          <TextInput
            placeholder="Ingresa al Cliente"
            style={styles.input}
            onChangeText={handleChange('cliente')}
            onBlur={handleBlur('cliente')}
            value={values.cliente}
          />
          {errors.cliente ? (
            <Text style={styles.errorMensaje}>{errors.cliente}</Text>
          ) : null}
          <Text style={styles.layoutFormulario}>Siniestro: </Text>
          <TextInput
            placeholder="Ingresa el siniestro"
            style={styles.input}
            onChangeText={handleChange('siniestro')}
            onBlur={handleBlur('siniestro')}
            value={values.siniestro}
          />
          {errors.siniestro ? (
            <Text style={styles.errorMensaje}>{errors.siniestro}</Text>
          ) : null}
          <TouchableOpacity style={styles.botonSave} onPress={handleSubmit}>
            <Text style={styles.textStyleBoton}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
export default memo(DatosEvento);
