//IMPORTS
import { Link } from 'react-router-dom';
//STYLES
import Styles from './Card.module.css';

const Card = (props) => {

    return(
        <div className={Styles.CardDiv} >
            <Link className={Styles.Link} to={`/detail/${props.id}`}>
                <img src={props.image} alt="Dog Pic" />
                <h2>{props.name}</h2>
                <p><strong>Weight:</strong> {props.weight} Kgs</p>
                <p>{props.temperament}</p>
            </Link>
        </div>
    )
}

export default Card