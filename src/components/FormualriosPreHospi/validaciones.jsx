import * as yup from 'yup';
export const validacionTexto = () =>
  yup
    .string()
    .required('Este campo es obligatorio')
    .matches(/^[aA-zZ\s]+$/, 'Solo se permiten letras');

export const validacionNumero = () =>
  yup
    .number()
    .typeError('Debe ser un número')
    .required('Este campo es obligatorio');

export const validacionTelefono = () =>
  yup
    .string()
    .required('Este campo es obligatorio')
    .matches(
      /^\d{1,10}$/,
      'El número de teléfono debe contener solo números y tener como máximo 10 dígitos',
    );

export const validacionFecha = () =>
  yup.string().required('Este campo es obligatorio').nullable();

export const validacionObligatoria = () =>
  yup.string().required('Este campo es obligatorio');
