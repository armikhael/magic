import axios from 'axios'

const serviceGetAccount = async (item) => {
  let returnResponse
  await axios({
    method: 'GET',
    url: `${process.env.REACT_APP_HOST}/account/name/${item}`,
  })
  .then((response) => {
    console.log('data', response.data[0]);
    returnResponse = response.data[0]
  })
  .catch((error) => {
    returnResponse = error.response
  })
  return returnResponse
}
const serviceUploadImage = async (item) => {
  console.log(this.state.account);
  let returnResponse		
  axios({
    method: 'POST',
    url: `https://api.imgbb.com/1/upload`,
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data: item
  })
  .then((response) => {
    console.log(response.data);
    returnResponse = response.data
  })
  .catch((error) => {
    returnResponse = error.response
  })
  return returnResponse
}

export { serviceGetAccount, serviceUploadImage }