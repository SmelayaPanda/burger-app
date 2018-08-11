import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://burger-app-e23f8.firebaseio.com/'
})

export default instance