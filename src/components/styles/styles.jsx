import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: 340,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 7,
    marginHorizontal: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  inputContainer: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 10,
    borderColor: 'lightgray',
  },
  prefix: {
    paddingLeft: 20,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalExito: {
    color: 'green',
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTextWarning: {
    color: 'red',
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lineForm: {
    marginTop: 10,
    width: '100%',
    height: 2,
    backgroundColor: 'red',
  },
  containerHeader: {
    marginBottom: 10,
  },
  textFolio: {
    fontWeight: '700',
    fontSize: 20,
  },
  contenedorFolio: {
    marginTop: 10,
    flexDirection: 'row',

    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingLeft: 5,
    backgroundColor: '#fff',
    padding: 0,
    borderRadius: 20,
    margin: 10,
    marginTop: 10,
    // alignItems:"center"
  },
  savedHeader: {
    backgroundColor: '#71EB60',
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,

    padding: 10,
    marginBottom: 10,

    elevation: 5, // agrega una sombra
    shadowColor: '#000', // color de la sombra
    shadowOffset: {
      width: 100,
      height: 10,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10, // radio de la sombra
  },
  headerText: {
    // fontWeight: "bold",
    fontSize: 18,
    textAlign: 'center',
  },
  content: {
    paddingLeft: 5,
    // backgroundColor: "#E9F4FF",
    borderRadius: 10,
    // paddingHorizontal:30,
    alignContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    height: 52,
    paddingLeft: 20,
  },
  checkbox: {
    alignItems: 'flex-start',
    marginVertical: 5,
  },
  checkboxText: {
    marginLeft: 10,
  },
  containerEvaIni: {
    marginTop: 5,
    borderWidth: 1,
  },
  botonConfirm: {
    backgroundColor: '#284D95',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,

    alignItems: 'center',
    marginTop: 30,
  },
  botonCancelado: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,

    alignItems: 'center',
    marginTop: 30,
  },
  botonSalir: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    top: 475,
    
    alignItems: 'center',
  },
  principalText: {
    color: '#284D95',
    fontWeight: '700',
    fontSize: 20,
  },
  radioGroup: {
    alignItems: 'flex-start',
  },
  layoutFormulario: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 16,
    marginLeft: 10,
  },
  containerPrevia: {
    alignItems: 'center',
    marginTop: 30,
  },
});
