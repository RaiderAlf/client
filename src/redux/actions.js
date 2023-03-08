import axios from 'axios';

// export const getDogs = () => (dispatch) => {
        
//     axios.get('http://localhost:3001/dogs')
//     .then(res => res.data)
//     .then(data => dispatch({
//                 type: 'GET_DOGS', payload: data
//             })
//         )
// }


export const getDogs = () => (dispatch) => {
    axios.get("http://localhost:3001/dogs/")
    .then((response) => {
        dispatch({type: 'GET_DOGS', payload: response.data})
    })
}


export function getDogName(name){ 
    return async function(dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/dogs?name=' + name);
            return dispatch ({
                type: 'GET_DOG_NAME',
                payload: json.data 
            })
      } catch (error) {
        alert('Dog not found 😕');

        }
    }
}

export function getTemperament(){
    return async function(dispatch) {
        var json = await axios.get('http://localhost:3001/temperaments/');
        return dispatch({
            type: 'GET_TEMPERAMENT',
            payload: json.data
        })
    }
}

export function postDog(payload){
    return async function(dispatch) {
        const data = await axios.post('http://localhost:3001/dogs', payload);
        console.log(data)
        return data;
    }
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

export function getDetail(id){
    
        return async function (dispatch){
            try {
                if(id){
                    const detail = await axios.get(`http://localhost:3001/dogs/${id}`);
                    dispatch ({
                        type: 'GET_DETAIL',
                        payload: detail.data
                    })
                } else {
                    dispatch({
                        type: 'GET_DETAIL',
                        payload: []
                        
        
                    })
                }

            } catch(error){
                console.log(error)   

            }  
        }            
    
  }
 