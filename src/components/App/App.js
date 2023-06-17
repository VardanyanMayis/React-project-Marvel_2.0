import {Route, Routes} from 'react-router-dom';

import {HomePage, ComixesPage} from '../pages'
import HeaderApp from '../HeaderApp/HeaderApp';

import './App.scss';

const App = () => {
    return (
        <div className="app">
            <HeaderApp />

            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/comixes' element={<ComixesPage />} />
            </Routes>
        </div>
    )
}

export default App;
