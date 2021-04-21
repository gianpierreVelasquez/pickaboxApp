export const VALIDATIONS = {
    email: [
        { type: 'email', message: 'Ingrese un correo valido.' },
        { type: 'required', message: 'El campo de correo es requerido.' }
    ],
    password: [
        { type: 'required', message: 'El campo de contraseña es requerido.' },
        { type: 'minlength', message: 'Este campo debe almenos 8 caracteres.' }
    ],
    response: [
        { type: 'required', message: 'Campo requerido.' },
        { type: 'min', message: 'No puede ser menor a la cantidad solicitada' },
        { type: 'max', message: 'No puede superar la cantidad solicitada.' }
    ]
}