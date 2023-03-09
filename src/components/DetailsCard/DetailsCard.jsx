//IMPORTS
import { Link } from 'react-router-dom';
//HOOKS
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDetail } from '../../redux/actions';
//COMPONENTS
import Loader from '../Loader/Loader';
//STYLES
import Style from './DetailsCard.module.css'

const DetailsCard = () => {
    
    const dispatch = useDispatch();
    const { id } = useParams();
    const details = useSelector(state => state.detail);

    console.log(details)

    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch, id]);

    return (
        <div className={Style.DetailDiv} >
            
            {
                details.hasOwnProperty('name') ?  (
                    <div className={Style.CardDiv} >
                        <Link className={Style.btnBack} to='/home'>
                            Volver
                        </Link>
                        <img src={details.image} alt={details.name} width='500px' />
                        <div>
                            <h1 className={Style.BreedName} >{details.name}</h1>
                            <h4>Peso: </h4>
                            <span>{details.height} kgs</span>
                            <h4>Tamaño: </h4>
                            <span>{details.weight} cm</span>
                            <h4>Esperanza de vida: </h4>
                            <span>{details.lifeSpan} </span>
                            <h4>Temperamentos: </h4>
                            <span> {details.temperament}</span>
                        </div>
                    </div>
                ) : (
                    <Loader />
                )
            }
            
        </div>
    )
    
};

export default DetailsCard;