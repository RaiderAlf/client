//IMPORTS
import { Link } from 'react-router-dom';

//Styles
import Styles from './Landing.module.css'

const Landing = () => {
    return (
        <div className={Styles.LandingDiv}>
            <h1>Hola Humano</h1>
            <h3>Te queremos mostrar un poco sobre nosotros</h3>
            <h4>Presiona las patitas para ingresar</h4>
            <div>
                <Link to={'/home'} className={Styles.btnLand} >
                    🐾
                </Link>
            </div>
        </div>
    )
};

export default Landing;