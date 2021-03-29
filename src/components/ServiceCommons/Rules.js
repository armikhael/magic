/** @format */

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
		},
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
				let patron = /^\d*$/
				if (patron.test(value)) {
					return Promise.resolve()
				}
				return Promise.reject('Sólo se permiten números')
			},
		},
	],
	rulesPrice: [
		{
			min: 1,
			message: 'Minimo 1 caracter!',
		},
		{
			validator: (_, value) => {
				let patron = /^([0-9])*$/
				console.log(patron.test(value))
				if (patron.test(value) === true) {
					console.log('positivo')
					return Promise.resolve()
				}
				return Promise.reject('NO se permitem el símbolos, letras, ni espacios en blanco en el precio')
			},
		},
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
			message: 'Debes ingresar los seguidores que tienes actualmente (será verificado)',
		},
		{
			validator: (_, value) => {
				if (value >= 1000) {
					return Promise.resolve()
				}
				return Promise.reject('Debes contar con al menos 1000 seguidores')
			},
		},
	],
	rulesAccount: [
		{
			required: true,
			message: 'Debe agregar su cuenta',
		},
		{
			validator: (_, value) => {
				if (value.indexOf('@') === -1 && value.indexOf(' ') === -1) {
					return Promise.resolve()
				}
				return Promise.reject('NO se permite el símbolo @ ni espacios en blanco')
			},
		},
	],
}
