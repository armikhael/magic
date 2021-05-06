/** @format */

export const updateDataUser = (field, payload) => {
	return {
		type: 'GLOBAL_USER',
		field: field,
		payload: payload,
	}
}
