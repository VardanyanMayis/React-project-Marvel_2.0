import {Route, Routes} from 'react-router-dom';

import {HomePage, ComixesPage, Page404, SinglComix} from '../pages';
import HeaderApp from '../HeaderApp/HeaderApp';

import './App.scss';

const App = () => {
    return (
        <div className="app">
            <HeaderApp />

            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/comixes' element={<ComixesPage />} />
                <Route path='/comixes/:id' element={<SinglComix />}/>
                <Route path='*' element={<Page404 />} />
            </Routes>
        </div>
    )
}

export default App;
