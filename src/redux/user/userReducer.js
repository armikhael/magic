
const initialStateUser = {
    email: 'diego.carciente@gmail.com'
}

const userReducer = (state = initialStateUser, action) => {
    switch (action.type) {
        case 'SAVE_USER':
            return {
                ...state,
                email: 'diego2@gmail.com'
            }    
        default:
            break;
    }
}

export default userReducer