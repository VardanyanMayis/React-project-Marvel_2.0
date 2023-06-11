import './SingHero.scss';

import hero from '../../resources/img/hero.jpg'

const SingHero = () => {
    return (
        <div className="hero__info__block">
            <div className="info__img">
                <img src={hero} alt="hero" />
            </div>

            <div className="info__block">
                <div className="hero__name">LOKI</div>
                <div className="hero__description">In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.</div>
            </div>
        </div>
    )
}

export default SingHero;
