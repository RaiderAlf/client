//ASSETS
import loader from '../../assets/loader.gif';
//STYLES
import Styles from './Loader.module.css';

const Loader = () => {
    return(
        <div className={Styles.loaderDiv}>
            <img src={loader} alt="Loading" />
            <span>Loading . . . </span>
        </div>
    )
}

export default Loader