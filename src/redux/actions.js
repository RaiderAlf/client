import axios from 'axios';




export function getDogs(){
    return async function(dispatch) {
        var json = await axios.get('http://localhost:3001/dog/');
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }

}

export function getDogName(name){ //name o payload, da igual
    return async function(dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/dog?name=' + name);
            return dispatch ({
                type: 'GET_DOG_NAME',
                payload: json.data //json.data es lo q devuelve esa ruta
            })
      } catch (error) {
        alert('Dog not found 😕');

        }
    }
}

export function getTemperament(){
    return async function(dispatch) {
        var json = await axios.get('http://localhost:3001/temperament/');
        return dispatch({
            type: 'GET_TEMPERAMENT',
            payload: json.data
        })
    }
}

export function postDog(payload){
    return async function(dispatch) {
        const data = await axios.post('http://localhost:3001/dog', payload);
        console.log(data)
        return data;
    }
}

export function filterDogsByTemperament(payload){ //el payload es el value q me va a llegar
    console.log(payload)
    return {
        type: 'FILTER_BY_TEMPERAMENT',
        payload
    }

}

export function filterCreated(payload){// el payload es la opcion que yo elija en el form
    return {
        type: 'FILTER_CREATED',
        payload
    }

}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME', //despacho con ese type
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
                    const detail = await axios.get(`http://localhost:3001/dog/${id}`);
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
 