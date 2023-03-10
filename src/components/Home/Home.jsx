//IMPORTS
import { Link } from 'react-router-dom';
//HOOKS
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
//ACTIONS
import { getDogName, getDogs, getTemperament, filterDogsByTemperament } from '../../redux/actions';
//COMPONENTS
import Loader from '../Loader/Loader';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
//STYLES
import Styles from './Home.module.css';
//ASSETS
import icon from '../../assets/icon.png';

const Home = () => {

    //REDUCER
    const dispatch = useDispatch();

    //ALL DOGS
    useEffect(() => {
        dispatch(getDogs());
    },[dispatch]);

    //DOGS Temperament
    useEffect(() => {
        dispatch(getTemperament)
    },[dispatch])

    //STATES
    const allDogs = useSelector(state => state.dogs);
    const allTemperament = useSelector(state => state.temperament);

    //SEARCH STATE
    const [ input, setInput ] = useState({
        value : ''
    });

    //PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage, /* setElementsPerPage */] = useState(8);

    //COUNTER ELEMENTS
    const indexOfLastElement = currentPage * elementsPerPage;
    const indexOfFirstElement = indexOfLastElement - elementsPerPage;
    const currentElements = allDogs.slice(indexOfFirstElement, indexOfLastElement);


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    //RESET HANDLER
    const handlerReset = (e) => {
        console.log(currentElements)
        e.preventDefault();
        dispatch(getDogs());
    };

    //FILTER BY TEMPERAMENT
//     const handleFilterTemperament = (e) => {
//         e.preventDefault();
//         dispatch(filterDogsByTemperament(e.target.value));
//    };

    //SORT BY NAME
    const handleSort = (e) => {
        e.preventDefault();
        allDogs.reverse()
    };


    //INPUT HANDLER
    const handlerOnSearch = (e) => {
        console.log(allDogs, allTemperament)
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
                <Link to='/home'>
                    <img className={Styles.LogoImg} src={icon} alt="Logo" height='80px' />
                </Link>

                <div className={Styles.divSearch} >

                    <input autoComplete='off' className={Styles.InputSearch} type="text" name='search' value={input.value} onChange={(e) => handlerOnSearch(e)} placeholder='Buscar . . .' />
                    {
                        input.value.length < 1 ? (
                            <button disabled className={Styles.BtnHome}  onClick={(e) => handlesBtnSearch(e)} >Buscar</button>
                        ) : (
                            <button className={Styles.BtnHome}  onClick={(e) => handlesBtnSearch(e)} >Buscar</button>
                        )
                    }

                </div>

                {/* <select onChange={(e) => handleFilterTemperament(e)}>
                    <option>Temperaments</option>
                    <option value='All'>All</option>

                    {allTemperament.map((temperament) => (
                        <option key={temperament.name} value={temperament.name}>
                        {temperament.name}
                    </option>
                    ))}
             </select> */}

                <select onChange={ e => {handleSort(e)}}  >
                    <option value='Asc'>A-Z</option>
                    <option value='Desc'>Z-A</option>
                </select>

                <button className={Styles.BtnHome} onClick={(e) => handlerReset(e)} >Todos los perros</button>

                <Link className={Styles.BtnHome} to={'/create'}>
                    Create a Dog
                </Link>

                <Link className={Styles.BtnHome} to='/about'>
                    About
                </Link>

            </div>
            <hr/>
            <div className={Styles.contentDiv}>
                <div className={Styles.HomeDiv} >
                        {
                            currentElements?.length ? (

                                currentElements?.map(dog => ( <Card 
                                    key={dog.id} 
                                    name={dog.name}
                                    weight={dog.weight} 
                                    image={dog.image} 
                                    id={dog.id} 
                                    temperament={dog.temperament}
                                    />))
                            ) : (
                                <Loader />
                            )
                        }    
                    </div>
                    
                    <div className={Styles.Pagination} >
                        <Pagination 
                            elementsPerPage={elementsPerPage}
                            totalElements={allDogs.length}
                            onPageChange={handlePageChange}
                        />
                    </div>
            </div>
            
        </div>
    );
};

export default Home;