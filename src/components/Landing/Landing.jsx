//IMPORTS
import { Link } from 'react-router-dom';

//Styles
import Styles from './Landing.module.css'

const Landing = () => {
    return (
        <div className={Styles.LandingDiv}>
            <h1>Hola Humano</h1>
            <h5>Te queremos mostrar un poco sobre nosotros</h5>
            <h6>Presiona las patitas para ingresar</h6>
            <div>
                <Link to={'/home'} className={Styles.btnLand} >
                    🐾
                </Link>
            </div>
        </div>
    )
};

export default Landing;