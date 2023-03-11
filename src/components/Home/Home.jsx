//IMPORTS
import { Link } from 'react-router-dom';
//HOOKS
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
//ACTIONS
import { getDogName, getDogs, getTemperament, filterDogsByTemperament, orderByWeight, filterCreated } from '../../redux/actions';
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
        dispatch(getTemperament())
    },[dispatch])

    //STATES
    const allDogs = useSelector(state => state.dogs);
    const allTemperament = useSelector(state => state.temperament);

    //SEARCH STATE
    const [ input, setInput ] = useState({
        value : ''
    });

    //SORT STATE
    const [ sort, setSort ] = useState(true);

    //HANDLER BTNS SORT
    const HandleBtnSort = (e) => {
        if(sort === true){
            setSort(false)
        }else{
            setSort(true)
        }
    }

    //PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage, /* setElementsPerPage */] = useState(8);

    //COUNTER ELEMENTS
    const indexOfLastElement = currentPage * elementsPerPage;
    const indexOfFirstElement = indexOfLastElement - elementsPerPage;
    const currentElements = allDogs.slice(indexOfFirstElement, indexOfLastElement);

    //PAGINATION PAGE CONUNTER
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    //RESET HANDLER
    const handlerReset = (e) => {
        console.log(allTemperament)
        e.preventDefault();
        dispatch(getDogs());
    };

    //FILTER BY TEMPERAMENT
    const handleFilterTemperament = (e) => {
        e.preventDefault();
        dispatch(filterDogsByTemperament(e.target.value));
    };

    //SORT BY WEIGHT
    const handleWeight = (e) => {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value))
        setCurrentPage(2);
        setTimeout(function() {
            setCurrentPage(1)
          }, 1);
    }

    //SORT BY DB OR API
    const handleOrigin = (e) => {
        e.preventDefault();
        dispatch(filterCreated(e.target.value))
        setCurrentPage(2);
        setTimeout(function() {
            setCurrentPage(1)
          }, 1);
    }

    //SORT BY NAME
    const handleSort = (e) => {
        e.preventDefault();
        allDogs.reverse();
        setCurrentPage(2);
        setTimeout(function() {
            setCurrentPage(1)
          }, 1);
    };


    //INPUT HANDLER
    const handlerOnSearch = (e) => {
        console.log(allTemperament)
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

                    <input autoComplete='off' className={Styles.InputSearch} type="text" name='search' value={input.value} onChange={(e) => handlerOnSearch(e)} placeholder='Search by name . . .' />
                    {
                        input.value.length < 1 ? (
                            <button disabled className={Styles.BtnHome} onClick={(e) => handlesBtnSearch(e)} >Search</button>
                        ) : (
                            <button className={Styles.BtnHome} onClick={(e) => handlesBtnSearch(e)} >Search</button>
                        )
                    }
                </div>

                <div className={Styles.DivFilters}>
                    <span><strong>Filters</strong></span>

                    <div className={Styles.DivDivFil}>
                        <select className={Styles.BtnHome} onChange={(e) => handleFilterTemperament(e)}>
                            <option>Filter by temperaments</option>
                            
                            <option className={Styles.BtnHome} value='All'>All</option>

                            {allTemperament?.map((temperament) => (
                                <option className={Styles.BtnHome} key={temperament.name} value={temperament.name}>
                                {temperament.name}
                            </option>
                            ))}
                        </select>

                        {
                            sort === true ? (<button className={Styles.BtnHome} onClick={ e => {handleOrigin(e); HandleBtnSort(e)  }} value='Created' >Origin</button>)
                            : ( <button className={Styles.BtnHome} onClick={ e => {handleOrigin(e); HandleBtnSort(e) }} value='API' >Origin</button> )
                        }

                        {
                            sort === true ? (<button className={Styles.BtnHome} onClick={ e => { handleWeight(e); HandleBtnSort(e) }} value='Light' >Weight</button>)
                            : ( <button className={Styles.BtnHome} onClick={ e => { handleWeight(e); HandleBtnSort(e) }} value='Heavy' >Weight</button> )
                        }

                        {
                            sort === true ? (<button className={Styles.BtnHome} onClick={ e => handleSort(e) } value='Asc'>A-Z</button>)
                            : ( <button className={Styles.BtnHome} onClick={ e => handleSort(e) } value='Desc'>Z-A</button> )
                        }

                        <button className={Styles.BtnHome} onClick={(e) => handlerReset(e)} >All Dogs</button>
                    </div>

                </div>

                

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