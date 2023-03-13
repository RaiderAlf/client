//IMPORTS
import { Link } from 'react-router-dom';

//Styles
import Styles from './Landing.module.css'

const Landing = () => {
    return (
        <div className={Styles.LandingDiv}>
            <h1>Hi! human</h1>
            <h5>We want to show you a little bit about ourselves</h5>
            <h6>Press paws to enter</h6>
            <div>
                <Link to={'/home'} className={Styles.btnLand} >
                    🐾
                </Link>
            </div>
        </div>
    )
};

export default Landing;