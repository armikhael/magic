import axios from 'axios'

export default async function serviceGetAccounts() {
    try {
        const { data } = await axios({
            method: 'GET',
            url: 'https://cuentas-virales.herokuapp.com/account?page=1&limit=10',
        })        
        return data
    } catch (error) {
        console.log(error); 
    }
}

