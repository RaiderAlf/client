//IMPORTS
import { Link } from 'react-router-dom';
//STYLES
import Styles from './About.module.css';
//ASSETS
import icon from '../../assets/icon1.png';
import linkedIn from '../../assets/linkedIn.png';
import GitHub from '../../assets/github.png';
import Telegram from '../../assets/telegram.png';

const About = () => {
    return(
        <div className={Styles.AboutDiv} >
            <Link to='/home'>
                <img className={Styles.LogoImg} src={icon} alt="Logo" height='130px' />
            </Link>
            <div className={Styles.DivInfo} >

                <div>
                    <h1>Proyecto Individual</h1>
                    <span>Desarrollado por: </span>
                    <h2>Kevin Alfonzo Espinett</h2>
                </div>

                <div>
                    <h3>Tecnologias Usadas</h3>
                    <p>
                        En este proyecto fueron usadas diversas tecnologias entre ellas: 
                    </p>

                    <p>
                        <strong>ReactJs, Redux, NodeJs, ExpressJs, Sequalize, PostgreSQL, entre otras</strong>
                    </p>
                </div>

                <div>
                    <h3>Agradecimientos</h3>
                    <p>
                        Este proyecto va dedicado a mi hija ShuShu y  a mi esposa ya que sin su apoyo incondicional seguramente no lo fuera logrado,
                        ademas de q ambas son amantes de los perros y las mascotas en general asi que, que mejor suerte la mia de que me tocara el proyecto individual con este tema
                    </p>
                </div>

                <div>
                    <h2>Contacto</h2>
                    <div className={Styles.LinksDiv} >
                        <span><a href="https://www.linkedin.com/in/kalfonzoespinett/"><img src={linkedIn} alt="LinkedIn" height='80px' /></a></span>
                        <span><a href="https://github.com/RaiderAlf"><img src={GitHub} alt="GitHub" height='80px' /></a></span>
                        <span><a href="https://t.me/KSpinett"><img src={Telegram} alt="Telegram" height='80px' /></a></span>
                    </div>
                </div>
                
            </div>
        </div>
    )
};

export default About;