import axios from 'axios'

export async function makeHttpRequest(
  url: string,
  options: {
    [x: string]: string
  } = {
    cache: 'no-cache',
  }
) {
  try {
    const response = await axios(url, options)
    if (response.statusText === 'OK') {
      return await response.data
    } else {
      throw new Error(response.statusText)
    }
  } catch (error) {
    // TODO: add logging middleware for record-keeping
    if (!axios.isAxiosError(error)) {
      console.log(error)
      throw 'An unknown error has occured'
    }
    // Axios specific error
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      throw `Error: ${error.response.statusText}`
    } else if (error.request) {
      // The request was made but no response was received
      throw `Unable to establish a connection with ${url}`
    } else {
      // Something happened in setting up the request that triggered an Error
      throw error.message
    }
  }
}
