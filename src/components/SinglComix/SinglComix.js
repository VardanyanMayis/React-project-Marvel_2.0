import { useState, useEffect } from 'react';
import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import './SinglComix.scss';

import comix from '../../resources/img/UW.png'

const SinglComix = ({id}) => {
    const [comix, setComix] = useState({});
    const {loading, error, getSinglComix} = useMarvelServices();

    useEffect(() => {
        getSinglComix(id)
            .then(setComix)
    }, [])

    return (
        <div className="comix__item__container">
            <div className="comix_info__block">
                {error ? <ErrorMessage/> : loading ? <Spinner/> : <ShowComix comix={comix}/>}
            </div>

            <div className="go__to__back">
                <p>Back to all</p>
            </div>
        </div>
    )
}

const ShowComix = ({comix}) => {
    return (
        <>
            <div className="img__box">
                <img src={comix.img} alt="img of comix" />
            </div>
                <div className="comix_info">
                    <h2 className="info__title">
                        {comix.title}
                    </h2>
                    <ul className="info__list">
                        <li>{comix.description}</li>
                        <li>{comix.page} pages</li>
                        <li>Language: en-us</li>
                        <li className="price">{comix.price}</li>
                    </ul>
            </div>
        </>
    )
}

export default SinglComix;
