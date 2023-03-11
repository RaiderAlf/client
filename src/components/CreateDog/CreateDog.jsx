//IMPORT
import axios from "axios";
import { Link } from 'react-router-dom';
//HOOKS
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//STYLES
import Styles from './CreateDog.module.css';
//ACTIONS
import { getTemperament } from '../../redux/actions';
//ASSETS
import icon from '../../assets/icon1.png'


const CreateDogs = () => {

    //REDUCER
    const dispatch = useDispatch();

    const allTemperament = useSelector(state => state.temperament);

    useEffect(() => {
        dispatch(getTemperament)
    },[dispatch])

    const [ inputForm, setInputForm ] = useState({
        name : '',
        weightMin : '',
        weightMax : '',
        heightMin : '',
        heightMax : '',
        lifeSpan :'',
        image : '' ,
        temperament : ''
    });

    // const Create = {
    //     name : inputForm.name,
    //     weight : inputForm.weightMin + ' - ' + inputForm.weightMax,
    //     height : inputForm.heightMin + ' - ' + inputForm.heightMax,
    //     lifeSpan : inputForm.lifeSpanMin + ' - ' + inputForm.lifeSpanMax,
    //     image : inputForm.image,
    //     temperament : inputForm.temperament
    // }

    const handlerForm = (e) => {
        console.log(allTemperament)
        setInputForm({
            ...inputForm,
            [e.target.name] : e.target.value
        });
    };

    const handlerSubmit = (e) => {
        axios.post('http://localhost:3001/dogs', inputForm)
        alert('Perro Creado')
    };

    return (
        <div className={Styles.Div} >
            <Link to='/home'>
                <img className={Styles.LogoImg} src={icon} alt="Logo" height='130px' />
            </Link>
                <div className={Styles.FormDiv}>
                    <div className={Styles.FormDivDiv}>
                        <h1>Crea tu perro</h1>
                        <hr/>
                        <br/>
                        <label htmlFor="name">
                            <span>Nombre: </span>
                            <input type="text" name="name" value={inputForm.name} onChange={e => handlerForm(e)} />
                        </label>

                        <label htmlFor="weightMin">
                            <span>Peso minimo: </span>
                            <input type="text" name="weightMin" value={inputForm.weigthMin} onChange={e => handlerForm(e)}/>
                        </label>

                        <label htmlFor="weightMax">
                            <span>Peso Maximo: </span>
                            <input type="text" name="weightMax" value={inputForm.weigthMax} onChange={e => handlerForm(e)} />
                        </label>

                        <label htmlFor="heightMin">
                            <span>Altura Minima: </span>
                            <input type="text" name="heightMin" value={inputForm.heightMin} onChange={e => handlerForm(e)} />
                        </label>

                        <label htmlFor="heightMax">
                            <span>Altura Maxima: </span>
                            <input type="text" name="heightMax"  value={inputForm.heightMax} onChange={e => handlerForm(e)}/>
                        </label>

                        <label htmlFor="lifeSpan">
                            <span>Esperanza de vida aproximada: </span>
                            <input type="text" name="lifeSpan" value={inputForm.lifeSpan} onChange={e => handlerForm(e)} />
                        </label>

                        <label htmlFor="image">
                            <span>URL de la Imagen: </span>
                            <input type="text" name="image" value={inputForm.image} onChange={e => handlerForm(e)} />
                        </label>

                        <select className={Styles.BtnHome} name='temperament' onClick={e => handlerForm(e)} >
                            <option className={Styles.BtnHome} >Temperaments</option>
                            {allTemperament.map((temperament) => (
                                <option className={Styles.BtnHome} name='temperament' onClick={e => handlerForm(e)} key={temperament.name} value={temperament.name}>
                                    {temperament.name}
                                </option>
                            ))}
                        </select>



                        {
                            inputForm.name === '' && inputForm.weightMin === ''  && inputForm.weightMax === '' && inputForm.heightMin === '' && inputForm.heightMax === '' && inputForm.lifeSpan === '' && inputForm.image === '' && inputForm.temperament === '' ? (
                                <button disabled onClick={e => handlerSubmit(e)}>Crear Perro</button>
                            ) : (
                                <button onClick={e => handlerSubmit(e)}>Crear Perro</button>
                            )
                        }
                        
                    </div>
                </div>
        </div>
    )
};

export default CreateDogs;