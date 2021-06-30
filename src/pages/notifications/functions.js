/** @format */

const handleSetInterval = async (item) => {
	item = lodash.shuffle(item)
	let newArray = []
	for (var i = 1; i < item.length; i++) {
		console.log(item[i])
		item[i].key = i
		newArray.push(item[i])
		let orderBy = lodash.orderBy(newArray, ['key'], ['desc'])
		setData([...orderBy])
		await sleep(5000)
	}
}

const sleep = (item) => {
	return new Promise((resolve) => setTimeout(resolve, item))
}
