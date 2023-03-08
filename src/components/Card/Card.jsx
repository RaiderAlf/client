import { Link } from 'react-router-dom';
import Styles from './Card.module.css';

const Card = (props) => {

    props.name[0].toUpperCase();


    return(
        <div className={Styles.CardDiv} >
            <Link to={`/dogs/${props.id}`}>
                <img src={props.image} alt="Dog Pic" />
            </Link>
            <h2>{props.name}</h2>
            <strong className={Styles.temp} >{props.temperament}</strong>
        </div>
    )
}

export default Card