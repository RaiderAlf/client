//HOOKS
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
//ACTIONS
import { getDogName, getDogs, getTemperament, orderByName } from '../../redux/actions';
//COMPONENTS
import Loader from '../Loader/Loader';
import Card from '../Card/Card';
//STYLES
import Styles from './Home.module.css';

const Home = () => {

    //REDUCER
    const dispatch = useDispatch();
    const allDogs = useSelector(state => state.dogs);
    // const allTemperament = useSelector(state => state.temperament);

    //SEARCH STATE
    const [ input, setInput ] = useState({
        value : ''
    });

    //SORT STATE
    const [ sort, setSort ] = useState({
        value : 'Asc'
    });

    //ALL DOGS
    useEffect(() => {
        dispatch(getDogs());
    },[dispatch]);

    //DOGS Temperament
    useEffect(() => {
        dispatch(getTemperament)
    },[dispatch])
    
    //RESET HANDLER
    const handlerReset = (e) => {
        e.preventDefault();
        dispatch(getDogs());
    };

    //SELECT HANDLER
    const handlerSelect = (e) => {
        e.preventDefault()
        setSort({
            value : e.target.value
        })
    }

    //SORT BY NAME
    const handleSort = (e) => {
        e.preventDefault();
        dispatch(orderByName(sort.value));
    }

    //INPUT HANDLER
    const handlerOnSearch = (e) => {
        e.preventDefault();
        setInput({
            value : e.target.value
        });
    };

    //SEARCH BY NAME
    const handlesBtnSearch = (e) => {
        e.preventDefault();
        dispatch(getDogName(input.value))
        setInput({
            value: ''
        });
    };

    
    return(
        <div className={Styles.Home} >
            <div className={Styles.NavBar} >

                <div className={Styles.divSearch} >
                    <input autoComplete='off' className={Styles.InputSearch} type="text" name='search' value={input.value} onChange={(e) => handlerOnSearch(e)} placeholder='Escribe una Raza' />
                    {
                        input.value.length < 1 ? (
                            <button disabled className={Styles.BtnHome}  onClick={(e) => handlesBtnSearch(e)} >Buscar</button>
                        ) : (
                            <button className={Styles.BtnHome}  onClick={(e) => handlesBtnSearch(e)} >Buscar</button>
                        )
                    }
                    
                </div>

                <select onChange ={ e=> {handlerSelect(e)}}  >
                    <option value='Asc'>A-Z</option>
                    <option value='Desc'>Z-A</option>
                </select>

                <button className={Styles.BtnHome} onClick={e => handleSort(e)} > Sort </button>


                <button className={Styles.BtnHome} onClick={(e) => handlerReset(e)} >Todos los perros</button>

            </div>
            <div className={Styles.HomeDiv} >
                {
                    allDogs.results?.length ? (
                        
                        allDogs.results?.map(dog => ( <Card key={dog.id} name={dog.name} image={dog.image} id={dog.id} />))
                    ) : (
                        <Loader />
                    )
                }    
            </div>
            
            
        </div>
    );
};

export default Home;