import './FormApp.scss';

const FormApp = () => {
    return (
        <div className="form__block">
            <div className="form__content">
            <div className="title">Or find a character by name:</div>
                <div className="form__section">

                <div className="input__block">
                    <input type="text" placeholder="Enter name" />
                    {/* <div className="done">There is! Visit name page?</div> */}
                </div> 
   

                <div className="form__btns">
                    <button className='button button__main'>
                        <div className="inner">FIND</div>
                    </button>

                    {/* <button className='button button__secondary'>
                        <div className="inner">TO PAGE</div>
                    </button> */}
                </div>
                </div>

                {/* <div className="error">
                The character was not found. Check the name and try again   
                </div> */}
            </div> 
        </div>
    )
}

export default FormApp;
