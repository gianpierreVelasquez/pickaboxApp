export const VALIDATIONS = {
    email: [
        { type: 'email', message: 'Ingrese un correo valido.' },
        { type: 'required', message: 'El campo de correo es requerido.' }
    ],
    password: [
        { type: 'required', message: 'El campo de contraseña es requerido.' },
        { type: 'minlength', message: 'Este campo debe almenos 8 caracteres.' }
    ],
    pickedQ: [
        { type: 'required', message: 'Campo requerido.' },
        { type: 'min', message: 'No puede ser menor a la cantidad solicitada.' },
        { type: 'max', message: 'No puede superar la cantidad solicitada.' },
        { type: 'pattern', message: 'Solo puede ingresar valores enteros.'}
    ],
    verifiedQ: [
        { type: 'required', message: 'Campo requerido.' },
        { type: 'min', message: 'No puede ser menor a la cantidad registrada.' },
        { type: 'pattern', message: 'Solo puede ingresar valores enteros.'}
    ],
    containerText: [
        { type: 'required', message: 'Campo requerido.' },
        { type: 'minlength', message: 'El nombre debe tener al menos 3 letras.' },
    ],
    quantity: [
        { type: 'required', message: 'Campo requerido.' },
        { type: 'min', message: 'No puede ser menor a 0.' },
        { type: 'pattern', message: 'Solo puede ingresar valores enteros.'}
    ],
    selector: [
        { type: 'required', message: 'Debe seleccionar almenos un tipo de empaque.' }
    ],
}