import { useState } from "react";

import ForRandomHero from "../ErrorBoundary/ForRandomHero";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import HeroList from "../HeroList/HeroList";
import HeroSidebarInfo from "../HeroSidebarInfo/HeroSidebarInfo";
import RandomHero from "../RandomHero/RandomHero";

import bg from '../../resources/img/bg.png';
import './basec.scss'


const HomePage = () => {
    const [heroId, setHeroId] = useState(null);

    const onSelectedHero = (heroId) => {
        if(heroId) setHeroId(heroId);
    }

    return (
    <>
        <main>
            <ForRandomHero>
                <RandomHero />
            </ForRandomHero>

            <div className="main__content">
                <ErrorBoundary>
                    <HeroList onSelectedHero={onSelectedHero} />
                </ErrorBoundary>
                <section>
                    <ErrorBoundary>
                        <HeroSidebarInfo heroId={heroId} />
                    </ErrorBoundary>
                </section>
            </div>
        </main>

        <div className="bg-decoration">
                <img src={bg} alt="bg decaration" />
        </div>
    </> 
    );
}
 
export default HomePage;