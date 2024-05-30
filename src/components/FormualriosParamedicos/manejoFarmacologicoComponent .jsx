import {useState, memo} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';
import RadioGroup from 'react-native-radio-buttons-group';
import DateTimePicker from '@react-native-community/datetimepicker';

const RCP_OPTIONS = [
  {
    id: 1,
    label: 'Sí',
    value: 1,
  },
  {
    id: 2,
    label: 'No',
    value: 0,
  },
];

const TERAPIA_OPTIONS = [
  {
    id: 1,
    label: 'Sí',
    value: 1,
  },
  {
    id: 2,
    label: 'No',
    value: 0,
  },
];
const ManejoFarmacologicoComponent = ({
  manejoFarmacologico,
  arrayHelpers,
  handleChange,
  handleBlur,
  errors,
}) => {
  const [time, setTime] = useState(manejoFarmacologico.map(() => new Date()));
  const [showTimePicker, setShowTimePicker] = useState(
    manejoFarmacologico.map(() => false),
  );

  const toggleTimePicker = index => {
    setShowTimePicker(prev =>
      prev.map((item, i) => (i === index ? !item : item)),
    );
  };

  const handleTimeChange = (event, selectedTime, index) => {
    if (selectedTime) {
      const updatedTime = [...time];
      updatedTime[index] = selectedTime;

      setTime(updatedTime);

      const updatedFormulario = [...manejoFarmacologico];
      const formattedTime = `${selectedTime.getFullYear()}-${String(
        selectedTime.getMonth() + 1,
      ).padStart(2, '0')}-${String(selectedTime.getDate()).padStart(
        2,
        '0',
      )}T${String(selectedTime.getHours()).padStart(2, '0')}:${String(
        selectedTime.getMinutes(),
      ).padStart(2, '0')}:${String(selectedTime.getSeconds()).padStart(
        2,
        '0',
      )}`;
      updatedFormulario[index].hora = formattedTime;

      handleChange(`manejo_farmacologico.${index}.hora`)(formattedTime);
    }

    setShowTimePicker(prev =>
      prev.map((item, i) => (i === index ? false : item)),
    );
  };

  const [selectedRCP, setSelectedRCP] = useState(RCP_OPTIONS);
  const [selectedTerapia, setSelectedTerapia] = useState(TERAPIA_OPTIONS);
  return (
    <View>
      {manejoFarmacologico.map((manejo, index) => (
        <View key={index}>
          <Text style={styles.layoutFormulario}>
            Manejo Farmacologico y Terapia Eléctrica #{index + 1}
          </Text>
          <TouchableOpacity onPress={() => toggleTimePicker(index)}>
            <TextInput
              style={styles.input}
              editable={false}
              placeholder="Seleccione una hora"
              value={time[index].toLocaleTimeString()}
            />
          </TouchableOpacity>
          {showTimePicker[index] && (
            <DateTimePicker
              mode="time"
              display="spinner"
              value={time[index]}
              onChange={(event, selectedTime) => {
                handleTimeChange(event, selectedTime, index);
              }}
            />
          )}

          {errors.manejo_farmacologico &&
          errors.manejo_farmacologico[index] &&
          errors.manejo_farmacologico[index].hora ? (
            <Text style={styles.errorMensaje}>
              {errors.manejo_farmacologico[index].hora}
            </Text>
          ) : null}

          <TextInput
            style={styles.input}
            onChangeText={handleChange(
              `manejo_farmacologico.${index}.medicamento`,
            )}
            onBlur={handleBlur(`manejo_farmacologico.${index}.medicamento`)}
            value={manejo.medicamento}
            placeholder="Medicamento"
          />
          {errors.manejo_farmacologico &&
          errors.manejo_farmacologico[index] &&
          errors.manejo_farmacologico[index].medicamento ? (
            <Text style={styles.errorMensaje}>
              {errors.manejo_farmacologico[index].medicamento}
            </Text>
          ) : null}

          <TextInput
            style={styles.input}
            onChangeText={handleChange(`manejo_farmacologico.${index}.dosis`)}
            onBlur={handleBlur(`manejo_farmacologico.${index}.dosis`)}
            value={manejo.dosis}
            placeholder="Dosis"
          />
          {errors.manejo_farmacologico &&
          errors.manejo_farmacologico[index] &&
          errors.manejo_farmacologico[index].dosis ? (
            <Text style={styles.errorMensaje}>
              {errors.manejo_farmacologico[index].dosis}
            </Text>
          ) : null}
          <TextInput
            style={styles.input}
            onChangeText={handleChange(
              `manejo_farmacologico.${index}.via_administracion`,
            )}
            onBlur={handleBlur(
              `manejo_farmacologico.${index}.via_administracion`,
            )}
            value={manejo.via_administracion}
            placeholder="Via administracion"
          />
          {errors.manejo_farmacologico &&
          errors.manejo_farmacologico[index] &&
          errors.manejo_farmacologico[index].via_administracion ? (
            <Text style={styles.errorMensaje}>
              {errors.manejo_farmacologico[index].via_administracion}
            </Text>
          ) : null}

          <Text style={styles.layoutFormulario}>Terapia Eléctrica: </Text>
          <RadioGroup
            radioButtons={selectedTerapia}
            containerStyle={styles.radioGroup}
            onPress={newSelectedTerapia => {
              setSelectedTerapia(newSelectedTerapia);
              const selectedButton = newSelectedTerapia.find(rb => rb.selected);
              if (selectedButton) {
                manejo.terapia_electrica_paramedico = selectedButton.value;
              }
            }}
          />
          {errors.manejo_farmacologico &&
          errors.manejo_farmacologico[index] &&
          errors.manejo_farmacologico[index].terapia_electrica_paramedico ? (
            <Text style={styles.errorMensaje}>
              {errors.manejo_farmacologico[index].terapia_electrica_paramedico}
            </Text>
          ) : null}

          <Text style={styles.layoutFormulario}>RCP: </Text>
          <RadioGroup
            radioButtons={selectedRCP}
            containerStyle={styles.radioGroup}
            onPress={newSelectedRCP => {
              setSelectedRCP(newSelectedRCP);
              const selectedButton = newSelectedRCP.find(rb => rb.selected);
              if (selectedButton) {
                manejo.rcp = selectedButton.value;
              }
            }}
          />
          {errors.manejo_farmacologico &&
          errors.manejo_farmacologico[index] &&
          errors.manejo_farmacologico[index].rcp ? (
            <Text style={styles.errorMensaje}>
              {errors.manejo_farmacologico[index].rcp}
            </Text>
          ) : null}
        </View>
      ))}
      {arrayHelpers.form.values.manejo_farmacologico.length > 0 ? (
        <TouchableOpacity
          style={styles.removeBoton}
          onPress={() => {
            arrayHelpers.pop();
          }}>
          <Text style={styles.textWhite}>Eliminar Último Manejo Farmacológico</Text>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity
        style={styles.addBoton}
        onPress={() => {
          arrayHelpers.push({
            hora: '',
            medicamento: '',
            dosis: '',
            via_administracion: '',
            terapia_electrica_paramedico: '',
            rcp: '',
          });
          setTime(prev => [...prev, new Date()]);
          setShowTimePicker(prev => [...prev, false]);
        }}>
        <Text style={styles.textWhite}>Agregar Manejo Farmacológico</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(ManejoFarmacologicoComponent);
