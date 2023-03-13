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
import NotFoundDogs from '../NotFoundDogs/NotFoundDogs';
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
            dispatch(getTemperament())
        },[dispatch])

    // //DOGS Temperament
    // useEffect(() => {
    // },[dispatch])

    //STATES
    const allDogs = useSelector(state => state.dogs);
    const allTemperament = useSelector(state => state.temperament);

    //SEARCH STATE
    const [ input, setInput ] = useState({
        value : ''
    });

    //SORT STATE
    const [ sort, setSort ] = useState(true);

    //------------------------------------------------ PAGINATION-------------------

    //PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage, /* setElementsPerPage */] = useState(8);

    
    //COUNTER ELEMENTS
    const indexOfLastElement = currentPage * elementsPerPage;
    const indexOfFirstElement = indexOfLastElement - elementsPerPage;
    const currentElements = allDogs.slice(indexOfFirstElement, indexOfLastElement);
    
    //PAGINATION BUTTON NEXT
    const paginationBtnNext = (e) => {
        e.preventDefault();
        setCurrentPage(currentPage + 1);
    };

    //PAGINATION BUTTON PREVIOUS
    const paginationBtnPrev = (e) => {
        e.preventDefault();
        setCurrentPage(currentPage - 1);
    };

    //----------------------------------------------- BUTTONS FILTERS AND ORDER-------------------

    //HANDLER BTNS SORT
    const HandleBtnSort = (e) => {
        if(sort === true){
            setSort(false)
        }else{
            setSort(true)
        }
    }

    //INPUT HANDLER
    const switchOnSearch = (e) => {
        setInput({
            value : e.target.value
        });
    };

    //SEARCH BY NAME
    const handlesBtnSearch = (e) => {
        e.preventDefault();
        dispatch(getDogName(input.value));
        setInput({
            value: ''
        });
    };

    //RESET HANDLER
    const handlerReset = (e) => {
        e.preventDefault();
        dispatch(getDogs());
    };

    //FILTER BY TEMPERAMENT
    const handleFilterTemperament = (e) => {
        e.preventDefault();
        dispatch(filterDogsByTemperament(e.target.value));
    };

    //UPDATE DOGS
    const renderUpdate = () => {
        setCurrentPage(2);
        setTimeout(() => {
            setCurrentPage(1);
          }, 1);
    }

    //SORT BY WEIGHT
    const handleWeight = (e) => {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        renderUpdate();
    };

    //SORT BY DB OR API
    const handleOrigin = (e) => {
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
        renderUpdate();
    };

    //SORT BY NAME
    const handleSort = (e) => {
        e.preventDefault();
        allDogs.reverse();
        renderUpdate();
    };

    //------------------------------------------ RENDER ------------------------------------
    
    return(

        <div className={Styles.Home} >
            {/* -----------NAVBAR--------------- */}
            <div className={Styles.NavBar} >
                <Link to='/home'>
                    <img className={Styles.LogoImg} onClick={e => handlerReset(e)} src={icon} alt="Logo" height='80px' />
                </Link>
                {/* ----------- SEARCH BY NAME----------- */}
                <div className={Styles.divSearch} >

                    <input autoComplete='off' className={Styles.InputSearch} type="text" name='search' value={input.value} onChange={(e) => switchOnSearch(e)} placeholder='Search by name . . .' />
                    {
                        input.value.length < 1 ? (
                            <button disabled className={Styles.BtnSearch} onClick={(e) => handlesBtnSearch(e)} >Search</button>
                        ) : (
                            <button className={Styles.BtnSearch} onClick={(e) => handlesBtnSearch(e)} >Search</button>
                        )
                    }
                </div>
                {/* -----------FILTERS AND ORDERS DIV-------------- */}
                <div className={Styles.DivFilters}>

                    <span className={Styles.FiltersBtn} ><strong>Filters and Orders</strong></span>
                    {/*FILTER BY TEMPERAMENT */}
                    <div className={Styles.DivFiltersHover} >

                        <div className={Styles.DivDivFil}>
                            <select className={Styles.BtnHome} onChange={(e) => handleFilterTemperament(e)}>
                                <option className={Styles.BtnHome} value='All'>All</option>

                                {allTemperament?.map((temperament) => (
                                    <option className={Styles.BtnHome} key={temperament.name} value={temperament.name}>
                                    {temperament.name}
                                </option>
                                ))}
                            </select>
                            {/* ----------------ORDERS---------------- */}
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
                            {/* ----------------RESET DOGS---------------- */}
                            <button className={Styles.BtnHome} onClick={(e) => handlerReset(e)} >All Dogs</button>
                        </div>

                    </div>

                </div>
                {/* --------------------INTERNAL LINKS---------------------- */}
                <Link className={Styles.BtnHome} to={'/create'}>
                    Create a Dog
                </Link>

                <Link className={Styles.BtnHome} to='/about'>
                    About
                </Link>

            </div>

            <div className={Styles.contentDiv}>
                {/* -----------------DIV ELEMENTS---------------- */}
                <div className={Styles.HomeDiv} >
                        {

                            currentElements?.length ? (
                                allDogs[0] === false ? (
                                        <NotFoundDogs />
                                    ) : (
                                       currentElements?.map((dog, index )=> ( <Card 
                                            key={index} 
                                            name={dog.name}
                                            weight={dog.weight} 
                                            image={dog.image} 
                                            id={dog.id} 
                                            temperament={dog.temperament}
                                            />)) 
                                    ) 
                            ) : ( <Loader /> )

                        }    


                    </div>
                    {/* -------------PAGINATION---------------- */}
                    <div className={Styles.Pagination} >
                        {
                            currentPage === 1 ? ( <span></span> ) : ( <button className={Styles.BtnHome} onClick={e => paginationBtnPrev(e)} >PREV</button> )
                        }
                        <span className={Styles.spanPagination} >{currentPage}</span>
                        {
                            Math.ceil(allDogs.length /elementsPerPage) > currentPage ? ( <button className={Styles.BtnHome} onClick={e => paginationBtnNext(e)} >NEXT</button> ) : ( <span></span> )
                        }
                    </div>
            </div>
            
        </div>
    );
};

// elementsPerPage={elementsPerPage}
    // totalElements={allDogs.length}
    // onPageChange={handlePageChange}

export default Home;