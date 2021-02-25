import axios from 'axios'

const serviceGetAccount = async (item) => {
  let returnResponse
  await axios({
    method: 'GET',
    url: `${process.env.REACT_APP_HOST}/account/name/${item}`,
  })
  .then((response) => {
    returnResponse = response.data[0]
  })
  .catch((error) => {
    returnResponse = error.response
  })
  return returnResponse
}

const serviceUploadImage = async (item) => {
  let returnResponse		
  await axios({
    method: 'POST',
    url: `https://api.imgbb.com/1/upload`,
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data: item
  })
  .then((response) => {
    returnResponse = response.data.data
  })
  .catch((error) => {
    returnResponse = error.response
  })
  return returnResponse
}

const serviceUpdateImage = async (id, item) => {
  let returnResponse
  await axios({
    method: 'PUT',
    url: `${process.env.REACT_APP_HOST}/account/image`,
    data: {
      id: id,
      image: item.image.url,
      image_thumb: item.thumb.url,
    }
  })
  .then((response) => {
    returnResponse = response.data
  })
  .catch((error) => {
    returnResponse = error.response
  })
  return returnResponse
}

export { serviceGetAccount, serviceUploadImage, serviceUpdateImage }