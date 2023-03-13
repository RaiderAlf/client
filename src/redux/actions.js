import axios from 'axios';

export const getDogs = () => async (dispatch) => {
    dispatch({
        type: 'GET_DETAIL', 
        payload : []
    });
    await axios.get("http://localhost:3001/dogs/")
    .then(response => {
        dispatch({
            type: 'GET_DOGS', 
            payload: response.data.results
        });
    });
};

export const getTemperament = () => async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/temperament/');
      dispatch({ 
        type: 'GET_TEMPERAMENT', 
        payload: response.data.results
      });
    } catch (error) {
      console.log(error);
    };
  };

export const getDetail = (id) => async (dispatch) => {

    dispatch({
        type: 'GET_DETAIL', 
        payload : []
    });

    await axios.get(`http://localhost:3001/dogs/${id}`)
        .then(response => {
            dispatch({
                type: 'GET_DETAIL', 
                payload : response.data.results[0]
            });
        });
};

export const getDogName = (name) => async (dispatch) => {
    try {
        dispatch({
            type: 'GET_DOG_NAME',
            payload: []
        });

        await axios.get('http://localhost:3001/dogs?name=' + name)
        .then(response => 
            dispatch({
                type: 'GET_DOG_NAME',
                payload: response.data.results
            }));
    } catch (error) {
        dispatch({
            type: 'GET_DOG_NAME',
            payload: [false]
        });
    };
            
};

export function filterDogsByTemperament(payload){ 
    console.log(payload)
    return {
        type: 'FILTER_BY_TEMPERAMENT',
        payload
    };

};

export function filterCreated(payload){
    return {
        type: 'FILTER_CREATED',
        payload
    };

};

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    };
};

export function orderByWeight(payload) {
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    };
} ;