/** @format */

export const config = {
	quantityPost: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
	times: ['Hora(s)', 'Dia(s)', 'Semana(s)', 'Mes(es)', 'Año(s)'],
	socialNet: ['Instagram', 'Tiktok'],
	typeOfPost: {
		instagram: ['Historia(s)', 'Publicación(es)', 'IGTV', 'Reel(s)', 'Video(s)', 'Carousel(es)', 'Sorteos Flash'],
		facebook: ['Imagen(es)', 'Video(s', 'Historia(s)'],
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
	linkSeguidores: `${
		process.env.REACT_APP_WHATSAPP
	}?phone=${'56997104052'}&text=Hola, vi su anuncio de cuentas virales y quisiera conocer el método para crecer en instagram`,
	linkYoutube: `https://www.youtube.com/watch?v=Hxf_4gj6J4k&ab_channel=PublicidadCreativa`,
	linkSoporte: `${process.env.REACT_APP_WHATSAPP}?phone=${process.env.REACT_APP_CONTACT}&text=Hola, tengo algunas dudas sobre la aplicación:`,
}
