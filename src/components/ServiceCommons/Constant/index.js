/** @format */

export const CONSTANTS = {
	MIN_FOLLOWERS: 50000,
	QUANTITY_POST: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
	TIMES: ['Hora(s)', 'Dia(s)', 'Semana(s)', 'Mes(es)', 'Año(s)'],
	SLUG_ADMITED: ['-instagram', '-facebook', '-tiktok', '-youtube'],
	RED_SOCIAL: [
		{
			name: 'Instagram',
			value: 'instagram',
		},
		{
			name: 'TikTok',
			value: 'tiktok',
		},
	],
	TYPE_POST: {
		instagram: [
			'Historia(s)',
			'Publicación(es)',
			'IGTV',
			'Reel(s)',
			'Video(s)',
			'Carousel(es)',
			'Sorteos Flash',
			'Instagram Lives',
		],
		facebook: ['Imagen(es)', 'Video(s)', 'Historia(s)', 'Facebook Lives'],
		tiktok: ['Video(s) 15 segundos', 'Video(s) 30 segundos', 'Video(s) 45 segundos', 'Video(s) 60 segundos'],
		twitter: ['Tweet(s)', 'Tweet(s) con Video(s)', 'Tweet(s) con Audio(s)', 'Tweet(s) con Enlace'],
		youtube: [
			'Video(s) 10 segundos',
			'Video(s) 15 segundos',
			'Video(s) 30 segundos',
			'Video(s) 45 segundos',
			'Video(s) 60 segundos',
		],
		twitch: [
			'Anuncio cada 5 min',
			'Anuncio cada 10 min',
			'Anuncio cada 30 min',
			'Titulo en el Stream',
			'Logo en el Stream',
			'Logo en los Paneles',
			'Hora(s) de Stream por semana',
			'Hora(s) de Stream por mes',
		],
	},
	CURRENCY: ['Dólares', 'Pesos Colombianos', 'Pesos Chilenos', 'Pesos Argentinos', 'Pesos Cubanos', 'Soles Peruanos'],
	TYPE_ACCOUNT: [
		{ name: 'Soy Modelo', value: 'model' },
		{ name: 'Soy Artista', value: 'model' },
		{ name: 'Soy Fotógrafo', value: 'bussiness' },
		{ name: 'Tengo un Negocio / Emprendimiento', value: 'bussiness' },
		{ name: 'Tengo un Sitio Web / Blog', value: 'bussiness' },
	],
	BOOLEAN: [
		{ name: 'No', value: false },
		{ name: 'Si', value: true },
	],
	FORMAT: '.jpeg, .png, .jpg',
	TYPE_LINK: [
		{ name: 'Web / Red Social', value: 'web' },
		{ name: 'WhatsApp', value: 'whatsapp' },
	],
}
