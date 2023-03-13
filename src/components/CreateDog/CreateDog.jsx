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
import icon from '../../assets/icon1.png';
import Look from '../../assets/looking.png';


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
        setInputForm({
            name : '',
            weightMin : '',
            weightMax : '',
            heightMin : '',
            heightMax : '',
            lifeSpan :'',
            image : '' ,
            temperament : ''
        })
    };

    return (
        <div className={Styles.Div} >
            <Link to='/home'>
                <img className={Styles.LogoImg} src={icon} alt="Logo" height='130px' />
            </Link>
                <img className={Styles.imgLook} src={Look} alt="pic" />
                <div className={Styles.FormDiv}>
                    <div className={Styles.FormDivDiv}>
                        <h1>Make your dog</h1>
                        <label htmlFor="name">
                            <span>Name: </span>
                            <input type="text" name="name" value={inputForm.name} onChange={e => handlerForm(e)} />
                        </label>

                        <label htmlFor="weightMin">
                            <span>Weight min: </span>
                            <input type="number" name="weightMin" value={inputForm.weigthMin} onChange={e => handlerForm(e)}/>
                            <span> Kgs </span>
                        </label>

                        <label htmlFor="weightMax">
                            <span>Weight max: </span>
                            <input type="number" name="weightMax" value={inputForm.weigthMax} onChange={e => handlerForm(e)} />
                            <span> Kgs </span>
                        </label>

                        <label htmlFor="heightMin">
                            <span>height min: </span>
                            <input type="number" name="heightMin" value={inputForm.heightMin} onChange={e => handlerForm(e)} />
                            <span> Cm </span>
                        </label>

                        <label htmlFor="heightMax">
                            <span>Height max: </span>
                            <input type="number" name="heightMax"  value={inputForm.heightMax} onChange={e => handlerForm(e)}/>
                            <span> Cm </span>
                        </label>

                        <label htmlFor="lifeSpan">
                            <span>Life Span: </span>
                            <input type="number" name="lifeSpan" value={inputForm.lifeSpan} onChange={e => handlerForm(e)} />
                            <span> Years </span>
                        </label>

                        <label htmlFor="image">
                            <span>URL image: </span>
                            <input type="text" name="image" value={inputForm.image} onChange={e => handlerForm(e)} />
                        </label>

                        <select className={Styles.BtnHome} name='temperament' onClick={e => handlerForm(e)} >
                            <option className={Styles.BtnHome} >Temperament</option>
                            {allTemperament.map((temperament) => (
                                <option className={Styles.BtnHome} name='temperament' onClick={e => handlerForm(e)} key={temperament.name} value={temperament.name}>
                                    {temperament.name}
                                </option>
                            ))}
                        </select>

                        {
                            inputForm.temperament === '' || inputForm.image === '' || inputForm.lifeSpan === '' || inputForm.heightMax === '' || inputForm.heightMin === '' || inputForm.weightMax === '' || inputForm.weightMin === '' | inputForm.name === '' ? (
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