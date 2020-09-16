export const rulesValidation = {
    rulesEmail: [
        {
            type: 'email',
            message: 'Correo no es inválido',
        },
        {
            required: false,
            message: 'Porfavor ingresa tu Correo',
        },
    ],
    rulesPassword: [
        {
            required: false,
            message: 'Ingresa tu contraseña!',
        },
        { 
            min: 4,
            message: 'Minimo 4 caracteres!'
        },
    ],
    rulesText: [
        {
            required: false,
            message: 'Ingresa el nombre de tu cuenta',
        },
        { 
            min: 4,
            message: 'Minimo 4 caracteres!'
        },
    ],
    rulesPhone: [
        {
            required: false,
            message: 'Ingresa un número válido',
        },
        { 
            min: 7,
            message: 'Minimo 4 caracteres!'
        },
    ]

}