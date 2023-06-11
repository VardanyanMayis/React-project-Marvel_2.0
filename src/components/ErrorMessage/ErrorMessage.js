import errorImg from './error.gif';

import './ErrorMesage.scss';

const ErrorMessage = () => {
    return (
        <div className='error__block'>
            <img src={errorImg} alt="img for error" />
            <div className="error__text__block">
                <p>Upss!</p>
                <p>We couldn't find the hero</p>
                <p>try again</p>
            </div>
        </div>
    );
}

export default ErrorMessage;
