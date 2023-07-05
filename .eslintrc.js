module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'prettier/prettier': ['error', {endOfLine: 'auto'}], // Cambiado a 'auto'
    'no-unused-vars': 'error', // Marcar variables que se declaran y no se usan
    'react/react-in-jsx-scope': 'error', // Previene la omisión de React cuando se usan JSX
    'react/jsx-uses-react': 'error', // Previene que React se marque como no utilizado
    'no-undef': 'error', // Marcar el uso de variables no definidas
    'no-console': 'warn', // Emitir una advertencia si se usan declaraciones console.log()
  },
};
