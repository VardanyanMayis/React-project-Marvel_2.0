import { useState } from 'react';

// import Components
import HeaderApp from '../HeaderApp/HeaderApp';
import RandomHero from '../RandomHero/RandomHero';
import BanerApp from '../BanerApp/BanerApp';
import ComixList from '../ComixList/ComixList';
import SinglComix from '../SinglComix/SinglComix';
import HeroList from '../HeroList/HeroList';
import HeroSidebarInfo from '../HeroSidebarInfo/HeroSidebarInfo';
import UnderFindHero from '../UnderFindHero/UnderFindHero';
import FormApp from '../FormApp/FormApp';
import SingHero from '../SingHero/SingHero';

// ErrorComponents
import ForRandomHero from '../ErrorBoundary/ForRandomHero';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

import bg from '../../resources/img/bg.png';
import './App.scss';

const App = () => {
    const [heroId, setHeroId] = useState(null);

    const onSelectedHero = (heroId) => {
        if(heroId) setHeroId(heroId);
    }

    return (
        <div className="app">
            <HeaderApp />
            <main>
                {/* <ForRandomHero>
                    <RandomHero />
                </ForRandomHero> */}

                <BanerApp />

                <div className="main__content">
                    <ErrorBoundary>
                        {/* <HeroList onSelectedHero={onSelectedHero} /> */}
                        <ComixList/>
                        {/* <SinglComix id={92271}/> */}
                    </ErrorBoundary>
                    {/* <section>
                        <ErrorBoundary>
                            <HeroSidebarInfo heroId={heroId} />
                        </ErrorBoundary>
                    </section> */}
                </div>
            </main>

            {/* <div className="bg-decoration">
                <img src={bg} alt="bg decaration" />
            </div> */}
        </div>
    )
}

/* <button className='button button__main'>
<div className="inner">Hello World</div>
</button>

<button className='button button__secondary'>
<div className="inner">Hello World</div>
</button> */

export default App;
