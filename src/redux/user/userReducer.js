
const initialState = {
    email: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GLOBAL_USER':
            console.log('state', state);
            return {
                ...state,
                [action.field]: action.payload
            }    
        default:
            return state
    }
}

export default userReducer