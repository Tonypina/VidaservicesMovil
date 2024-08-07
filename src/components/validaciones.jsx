import * as yup from 'yup';
export const validacionTexto = () =>
  yup
    .string()
    .required('Este campo es obligatorio')
    .matches(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/, 'Solo se permiten letras y números');

export const validacionTextoNR = () =>
  yup
    .string()
    .matches(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/, 'Solo se permiten letras y números');

export const validacionNumero = () =>
  yup
    .number()
    .typeError('Debe ser un número')
    .required('Este campo es obligatorio');

export const validacionNumeroNR = () =>
  yup
    .number()
    .typeError('Debe ser un número');

let patternDecimal = /^[-+]?[0-9]+\.[0-9]+$/;
export const validacionDecimal = () =>
  yup
    .string()
    .test(
      "es-decimal",
      "La cantidad debe ser decimal con un digito",
      (val) => {
        if (val != undefined) {
          return patternDecimal.test(val);
        }
        return true
      }
    )
    // .typeError('Debe ser un número decimal')
    .required('Este campo es obligatorio');
export const validacionDecimalNR = () =>
  yup
    .string()
    .test(
      "es-decimal",
      "La cantidad debe ser decimal con un digito",
      (val) => {
        if (val != undefined) {
          return patternDecimal.test(val);
        }
        return true
      }
    )
    // .typeError('Debe ser un número decimal')

export const validacionTelefono = () =>
  yup
    .string()
    .required('Este campo es obligatorio')
    .matches(
      /^\d{1,10}$/,
      'El número de teléfono debe contener solo números y tener como máximo 10 dígitos',
    );

export const validacionTelefonoNR = () =>
  yup
    .string()
    .matches(
      /^\d{1,10}$/,
      'El número de teléfono debe contener solo números y tener como máximo 10 dígitos',
    );

export const validacionFecha = () =>
  yup.string().required('Este campo es obligatorio').nullable();

export const validacionObligatoria = () =>
  yup.string().required('Este campo es obligatorio');
