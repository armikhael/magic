/** @format */
import publicIp from 'public-ip'

const serviceIp = async () => {
	const ipv4 = await publicIp.v4()
	let date = new Date()
	let day = date.getDate()
	let month = date.getMonth() + 1
	let year = date.getFullYear()
	let today = `${day}-${month}-${year}`

	if (localStorage.getItem('ip')) {
		const localStorageIp = JSON.parse(localStorage.getItem('ip'))
		const newData = { date: today, ip: ipv4 }
		if (localStorageIp.date === newData.date && localStorageIp.ip === newData.ip) {
			return false
		} else {
			localStorage.setItem('ip', JSON.stringify(newData))
			return true
		}
	} else {
		const newData = { date: `${day}-${month}-${year}`, ip: ipv4 }
		localStorage.setItem('ip', JSON.stringify(newData))
		return true
	}
}

export default serviceIp
