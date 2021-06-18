/** @format */

handleVerifyPromotion = (promotion, account) => {
	const date = new Date()
	let itemFilter = []
	promotion.forEach((iterator) => {
		let filterCountry = iterator.country.find((item) => {
			let newItem = ''
			if (item === account.country || item === 'all') {
				newItem = item
			}
			return newItem
		})
		if (date.getDate() <= iterator.day && date.getMonth() === iterator.month && filterCountry !== undefined) {
			itemFilter.push(iterator)
		}
	})
	return itemFilter
}
