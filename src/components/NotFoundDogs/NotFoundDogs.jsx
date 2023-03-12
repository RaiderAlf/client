//STYLES
import Styles from './NotFoundDogs.module.css';
//ASSETS
import NoDogs from '../../assets/no dogs.png';

const NotFoundDogs = () => {
    return(
        <div className={Styles.NoDogsDiv} >
            <img src={NoDogs} alt="Not Found" />
        </div>
    )
};

export default NotFoundDogs;