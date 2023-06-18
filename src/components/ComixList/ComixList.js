import {Link} from 'react-router-dom'

import { useState, useEffect, Fragment } from 'react';
import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import './ComixList.scss';

const ComixList = () => {
    const [comixes, setComixes] = useState([]);
    const [offset, setOffset] = useState(1000);
    const [isEnd, setIsEnd] = useState(false);
    const [firstLoading, setFirstLoading] = useState(true);

    const {loading, error, getAllComixes} = useMarvelServices();

    useEffect(() => {
        onRequest();
    }, [])

    useEffect(() => {
        if(comixes.length > 0) setFirstLoading(false);
    }, [comixes])

    const onRequest = () => {
        getAllComixes(offset)
            .then(onLoaded);
    }

    const onLoaded = (newComixes) => {
        if(newComixes.length < 8) setIsEnd(true);

        setComixes(comixes => [...comixes, ...newComixes]);
        setOffset(offset => offset + 8);
    }

    const comix = comixes.map((item, index) => {
        return (
            <Fragment key={index}>
           <Link to={`${item.id}`} className="comix__item">    
                <div className="item__img">
                    <img src={item.img} alt="Comix" /> 
                </div>
                <div className="comix__title">{item.title}</div>
                <div className="comix__price">{item.price}</div>
            </Link>
            </Fragment>
        )
    })

    return (
        <div className="comix__content">
            <div className="comix__list">
                {error ? <ErrorMessage/> : (loading && firstLoading) 
                    ? <Spinner/> : null}

                {comix}
            </div>
            
            <button 
                className='button button__main'
                onClick={onRequest}
                style={{display: (loading || isEnd) ? 'none' : 'block'}}>
                <div className="inner">More</div>
            </button>
        </div>     
    )
}

export default ComixList;
