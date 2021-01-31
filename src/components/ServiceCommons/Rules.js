export const rules = {
	required: [
		{
			required: true,
			message: 'Debe seleccionar una opción',
		},
	],
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
			message: 'Minimo 4 caracteres!',
		},
    ],
    rulesDropdown: [
		{
			required: true,
			message: 'Ingresa tu contraseña!',
		}
	],
	rulesText: [
		{
			required: true,
			message: 'Ingresa el nombre de tu cuenta',
		},
		{
			min: 4,
			message: 'Minimo 4 caracteres!',
		},
    ],
    rulesPhone: [
			{
				required: true,
				message: 'Ingrese sú número telefónico',
			},
			{
				min: 7,
				message: 'Minimo 7 caracteres!',
      },
			{
				validator: (_, value) => {
					let patron = /^\d*$/; 
					if (patron.test(value)) {
							return Promise.resolve();
					}
					return Promise.reject('Sólo se permiten números');
				}
			}
    ],
    rulesPrice: [
		{
			min: 1,
			message: 'Minimo 1 caracter!',
    },
		{
			validator: (_, value) => {
				let patron = /^\d*$/; 
				if (patron.test(value)) {
						return Promise.resolve();
				}
				return Promise.reject('Sólo se permiten números');
			}
		}
	],
	rulesSelect: [
		{
			required: true,
			message: 'Debe seleccionar una opción',
		},
	],
	rulesFollowers: [
		{
			required: true,
			message: 'Debe seleccionar una opción',
		},
		{
			min: 8,
			message: 'Debes contar con al menos 10.000 seguidores',
		},
	],
	rulesAcount: [
		{
			required: true,
			message: 'Debe agregar su cuenta',
		}
	]
}
