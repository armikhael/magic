/** @format */

import axios from 'axios'

export default async function serviceGetAccount(name) {
	try {
		const { data } = await axios({
			method: 'GET',
			url: `https://cuentas-virales.herokuapp.com/account/id/${name}`,
		})
		return data
	} catch (error) {
		console.log(error)
	}
}
