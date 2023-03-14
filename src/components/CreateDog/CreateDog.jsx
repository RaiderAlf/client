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
                            {
                                inputForm.name.match(/[0-9]+/) ? <span className={Styles.ErrorMsg} >Name Invalid</span> : <span className={Styles.PropertyName} >Name</span>
                            }
                            <input type="text" name="name" value={inputForm.name} onChange={e => handlerForm(e)} />
                            {
                                inputForm.name.match(/[0-9]+/) && <span className={Styles.ErrorMsg1}>The name cannot contain numbers</span>
                            }
                        </label>

                        <label htmlFor="weightMin">
                            {
                                !inputForm.weightMin.match(/^[0-9]{3}$/) ? inputForm.weightMax !== '' && inputForm.weightMin > inputForm.weightMax ? <span className={Styles.ErrorMsg} >Weight Min not allowed</span> : <span className={Styles.PropertyName}>Weight min: </span> : <span className={Styles.ErrorMsg}>Only 2 digits are allowed</span>
                            }
                            <input type="number" name="weightMin" value={inputForm.weigthMin} onChange={e => handlerForm(e)}/>
                            <span> Kgs </span>
                            {
                               inputForm.weightMax !== '' && inputForm.weightMin > inputForm.weightMax && <span className={Styles.ErrorMsg1}>The minimum weight cannot be more than the maximum</span>
                            }
                        </label>

                        <label htmlFor="weightMax">
                            {
                                !inputForm.weightMax.match(/^[0-9]{3}$/) ? inputForm.weightMax !== '' && inputForm.weightMin > inputForm.weightMax ? <span className={Styles.ErrorMsg} >Weight Max not allowed</span> : <span className={Styles.PropertyName}>Weight min: </span> : <span className={Styles.ErrorMsg}>Only 2 digits are allowed</span>
                            }
                            <input type="number" name="weightMax" value={inputForm.weigthMax} onChange={e => handlerForm(e)} />
                            <span> Kgs </span>
                            {
                               inputForm.weightMax !== '' && inputForm.weightMin > inputForm.weightMax && <span className={Styles.ErrorMsg1}>The minimum weight cannot be more than the maximum</span>
                            }
                        </label>

                        <label htmlFor="heightMin">
                            {
                                !inputForm.heightMin.match(/^[0-9]{3}$/) ? inputForm.heightMax !== '' && inputForm.heightMin > inputForm.heightMax ? <span className={Styles.ErrorMsg}> Height Min not allowed </span> : <span className={Styles.PropertyName}>Height min: </span> : <span className={Styles.ErrorMsg}>Only 2 digits are allowed</span>
                            }
                            <input type="number" name="heightMin" value={inputForm.heightMin} onChange={e => handlerForm(e)} />
                            <span> Cm </span>
                            {
                               inputForm.heightMax !== '' && inputForm.heightMin > inputForm.heightMax && <span className={Styles.ErrorMsg1}>The minimum height cannot be more than the maximum</span>
                            }
                        </label>

                        <label htmlFor="heightMax">
                            {
                                !inputForm.heightMax.match(/^[0-9]{3}$/) ? inputForm.heightMax !== '' && inputForm.heightMin > inputForm.heightMax ? <span className={Styles.ErrorMsg}> Height Max not allowed </span> : <span className={Styles.PropertyName}>Height Max: </span> : <span className={Styles.ErrorMsg}>Only 2 digits are allowed</span>
                            }
                            <input type="number" name="heightMax"  value={inputForm.heightMax} onChange={e => handlerForm(e)}/>
                            <span> Cm </span>
                            {
                               inputForm.heightMax !== '' && inputForm.heightMin > inputForm.heightMax && <span className={Styles.ErrorMsg1}>The minimum height cannot be more than the maximum</span>
                            }
                        </label>

                        <label htmlFor="lifeSpan">
                            {
                                !inputForm.lifeSpan.match(/^[0-9]{3}$/) ? <span className={Styles.PropertyName}>Life Span: </span> : <span className={Styles.ErrorMsg}>Only 2 digits are allowed</span>
                            }
                            <input type="number" name="lifeSpan" value={inputForm.lifeSpan} onChange={e => handlerForm(e)} />
                            <span> Years </span>
                        </label>

                        <label htmlFor="image">
                            <span className={Styles.PropertyName}>URL image: </span>
                            <input type="text" name="image" value={inputForm.image} onChange={e => handlerForm(e)} />
                        </label>

                        <select className={Styles.BtnHome} name='temperament' onClick={e => handlerForm(e)} >
                            <option className={Styles.BtnHome} >Temperament</option>
                            {allTemperament.map((temperament, index) => (
                                <option className={Styles.BtnHome} name='temperament' onClick={e => handlerForm(e)} key={index} value={temperament.name}>
                                    {temperament.name}
                                </option>
                            ))}
                        </select>

                        {
                            inputForm.temperament !== '' && inputForm.image !== '' && inputForm.lifeSpan !== '' && inputForm.heightMax !== '' && inputForm.heightMin !== '' && inputForm.weightMax !== '' && inputForm.weightMin !== '' && inputForm.name !== '' && !inputForm.name.match(/[0-9]+/) && !inputForm.heightMin.match(/^[0-9]{3}$/) && !inputForm.heightMax.match(/^[0-9]{3}$/) && !inputForm.lifeSpan.match(/^[0-9]{3}$/) && !inputForm.weightMin.match(/^[0-9]{3}$/) && !inputForm.weightMax.match(/^[0-9]{3}$/) && !inputForm.name.match(/[0-9]+/) && inputForm.heightMin < inputForm.heightMax && inputForm.heightMin < inputForm.heightMax ? (
                                <button onClick={e => handlerSubmit(e)}>Crear Perro</button>
                            ) : (
                                <button disabled onClick={e => handlerSubmit(e)}>Crear Perro</button>
                            )
                        }
                        
                    </div>
                </div>
        </div>
    )
};

export default CreateDogs;