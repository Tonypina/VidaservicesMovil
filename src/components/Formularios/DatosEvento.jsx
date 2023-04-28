import { Formik } from "formik";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Platform,
} from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
import React, { useState, memo } from "react";
import { styles } from "../styles/styles";
import DateTimePicker from "@react-native-community/datetimepicker";

// Mandar info y crear reporte
// const baseUrl = "http://localhost:8000/api/reportes/medicos";
// iniciarSesion = async () => {
//   const { email, password } = this.state.form;
//   let token;
//   const response = await axios({
//     method: "post",
//     url: baseUrl,
//     data: {
//       email: email,
//       password: password,
//     },
//   });
// };

const DatosEvento = ({ onFormSubmit }) => {
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
    console.log(selectedDate);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const toggleTimePicker = (type) => {
    setShowTimePickers((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleTimeChange = (type, event, selectedTime) => {
    setShowTimePickers((prev) => ({
      ...prev,
      [type]: false,
    }));
    if (selectedTime) {
      setTimes((prev) => ({
        ...prev,
        [type]: selectedTime,
      }));
    }
  };
  // Lugar
  const [lugarOptions, setLugarOptions] = useState([
    {
      id: 1,
      label: "Hogar",
      value: "hogar",
    },
    {
      id: 2,
      label: "Vía Publica",
      value: "viaPublica",
    },
    {
      id: 3,
      label: "Trabajo",
      value: "trabajo",
    },
    {
      id: 4,
      label: "Escuela",
      value: "escuela",
    },
    {
      id: 5,
      label: "Recreación",
      value: "recreacion",
    },
  ]);

  return (
    <Formik
      initialValues={{
        folio: "",
        atencion_fecha: "",
        salida_hora: "",
        contacto_hora: "",
        termino_hora: "",
        catalogo_lugar_id: "",
        calle: "",
        colonia: "",
        alcaldia: "",
        entre_calles_1: "",
        cliente: "",
        siniestro: ""
      }}
      onSubmit={(values) => {
        // Envía los datos ingresados al componente principal
        values.folio = "C-12344";
        values.atencion_fecha = date;
        values.salida_hora = times.salida;
        values.contacto_hora = times.contacto;
        values.termino_hora = times.termino;

        onFormSubmit(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <View style={{ marginTop: 6 }}>
            <Text style={styles.layoutFormulario}>Seleccione la Fecha</Text>
            <TouchableOpacity onPress={toggleDatePicker}>
              <TextInput
                style={styles.input}
                editable={false}
                placeholder="Seleccione una fecha"
                onChangeText={handleChange("atencion_fecha")}
                onBlur={handleBlur("atencion_fecha")}
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
              onPress={(lugarOptions) => {
                setLugarOptions(lugarOptions);
                
                Object.keys(lugarOptions).forEach( key => {
                  if (lugarOptions[key].selected) {
                    values.catalogo_lugar_id = lugarOptions[key].id   
                  }
                })
              }}
              containerStyle={styles.radioGroup}
            />
          </View>

          <Text style={styles.layoutFormulario}>Avenida/Calle y número: </Text>
          <TextInput
            placeholder="Ingresa la Avenida/Calle y número"
            style={styles.input}
            onChangeText={handleChange("calle")}
            onBlur={handleBlur("calle")}
            value={values.calle}
          />
          <Text style={styles.layoutFormulario}>Colonia: </Text>
          <TextInput
            placeholder="Ingresa la colonia"
            style={styles.input}
            onChangeText={handleChange("colonia")}
            onBlur={handleBlur("colonia")}
            value={values.colonia}
          />
          <Text style={styles.layoutFormulario}>Alcaldia: </Text>
          <TextInput
            placeholder="Ingresa la alcaldia"
            style={styles.input}
            onChangeText={handleChange("alcaldia")}
            onBlur={handleBlur("alcaldia")}
            value={values.alcaldia}
          />
          <Text style={styles.layoutFormulario}>Entre calles: </Text>
          <TextInput
            placeholder="Ingresa entre que calles está"
            style={styles.input}
            onChangeText={handleChange("entre_calles_1")}
            onBlur={handleBlur("entre_calles_1")}
            value={values.entre_calles_1}
          />
          <Text style={styles.layoutFormulario}>Cliente: </Text>
          <TextInput
            placeholder="Ingresa al Clinte"
            style={styles.input}
            onChangeText={handleChange("cliente")}
            onBlur={handleBlur("cliente")}
            value={values.cliente}
          />
          <Text style={styles.layoutFormulario}>Siniestro: </Text>
          <TextInput
            placeholder="Ingresa el siniestro"
            style={styles.input}
            onChangeText={handleChange("siniestro")}
            onBlur={handleBlur("siniestro")}
            value={values.siniestro}
          />
          <Button
            title="Guardar"
            onPress={() => {
              handleSubmit();
            }}
          />
        </View>
      )}
    </Formik>
  );
};
export default memo(DatosEvento);
