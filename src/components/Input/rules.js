export const rulesValidation = {
    rulesEmail: [
        {
            type: 'email',
            message: 'Correo no es inválido',
        },
        {
            required: true,
            message: 'Porfavor ingresa tu Correo',
        },
    ],
    rulesPassword: [
        {
            required: true,
            message: 'Ingresa tu contraseña!',
        },
        { 
            min: 4,
            message: 'Minimo 4 caracteres!'
        },
    ],
    rulesText: [
        {
            required: true,
            message: 'Ingresa el nombre de tu cuenta',
        },
        { 
            min: 4,
            message: 'Minimo 4 caracteres!'
        },
    ]

}