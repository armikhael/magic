/** @format */

export const rulesValidation = {
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
				if (patron.test(value) === true) {
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
				if (value >= 300) {
					return Promise.resolve()
				}
				return Promise.reject('Debes contar con al menos 5000 seguidores')
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
	rulesUser: [
		{
			required: true,
			message: 'Debe agregar el nombre del usuario',
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
	rulesUrl: [
		{
			validator: (_, value) => {
				let patron = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i
				if (patron.test(value) === true) {
					return Promise.resolve()
				}
				return Promise.reject('Ingrese una url válida')
			},
		},
	],
}
