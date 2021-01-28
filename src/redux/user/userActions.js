export const saveUser = (field, payload) => {
    return  {
        type: 'GLOBAL_USER',
        field: field, 
        payload: payload,
    }
}