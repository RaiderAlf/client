import { Link } from 'react-router-dom';
import Styles from './Card.module.css';

const Card = (props) => {

    props.name[0].toUpperCase();


    return(
        <div className={Styles.CardDiv} >
            <Link to={`/detail/${props.id}`}>
                <img src={props.image} alt="Dog Pic" />
            </Link>
            <h2>{props.name}</h2>
        </div>
    )
}

export default Card