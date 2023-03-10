import axios from 'axios';

export const getDogs = () => (dispatch) => {
    axios.get("http://localhost:3001/dogs/")
    .then(response => {
        dispatch({
            type: 'GET_DOGS', 
            payload: response.data.results
        })
    })
}

// export const getTemperament = () => async (dispatch) => {
//     await axios.get('http://localhost:3001/temperaments/')
//     .then(response => 
//         dispatch({
//         type: 'GET_TEMPERAMENT',
//         payload: response.data.result
//     }))
    
// }

export const getTemperament = () =>  (dispatch) => {
    try {
      const response = axios.get('http://localhost:3001/temperaments/');
      dispatch({ 
        type: 'GET_TEMPERAMENT', 
        payload: response.data.results
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getDetail = (id) => (dispatch) => {

        axios.get(`http://localhost:3001/dogs/${id}`)
            .then(response => {
                dispatch({
                    type: 'GET_DETAIL', 
                    payload : response.data.results[0]
                })
            })
}

export const getDogName = (name) => (dispatch) => {
            axios.get('http://localhost:3001/dogs?name=' + name)
            .then(response => 
                dispatch({
                    type: 'GET_DOG_NAME',
                    payload: response.data.results
                }))
            
}

export function filterDogsByTemperament(payload){ 
    console.log(payload)
    return {
        type: 'FILTER_BY_TEMPERAMENT',
        payload
    }

}

export function filterCreated(payload){
    return {
        type: 'FILTER_CREATED',
        payload
    }

}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByWeight(payload) {
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    }
} 