//HOOKS
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
//ACTIONS
import { getDogs } from '../../redux/actions';
//COMPONENTS
import Loader from '../Loader/Loader';
import Card from '../Card/Card';
//STYLES
import Styles from './Home.module.css';

const Home = () => {

    //REDUCER
    const dispatch = useDispatch();
    const allDogs = useSelector(state => state.dogs);

    useEffect(() => {
        dispatch(getDogs())
    },[dispatch]);
    
    
    return(
        <div className={Styles.HomeDiv} >

            {
                allDogs.results?.length ? (
                    allDogs.results?.map(dog => ( <Card key={dog.id} name={dog.name} image={dog.image} id={dog.id} temperament={dog.temperament} />))
                ) : (
                    <Loader />
                )
            }


            {
                allDogs.results?.map(dog => ( <Card key={dog.id} name={dog.name} image={dog.image} id={dog.id} />))
            }

        </div>
    );
};

export default Home;