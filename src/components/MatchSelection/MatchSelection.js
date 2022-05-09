import { useEffect, useState } from "react";
import Betclic from "../../services/Betclic";
import styles from './MatchSelection.module.css';
import Moment from 'react-moment';
import { Link } from "react-router-dom";

export default function MatchSelection() {
//   const [compatibleOdds, setCompatibleOdd] = useState();
  const [matchs, setMatchs] = useState();
//   const oddsId = [3254000496, 3254000486, 3254000497];

  useEffect(() => {
    
    (async () => {
      const dataMatchs = await Betclic.getMatchs();
      console.log(dataMatchs);
      setMatchs(dataMatchs);
      // setCompatibleOdd(await Betclic.checkCompatibleOdds(oddsId));
      
    })();
   
  }, []);

  return matchs ? (
    <div className={styles.matchsContainer}>
        {matchs.map( (match, index) => {
            let day;
            // let time = Moment.utc(match.date).format("HH:mm");
            if(match.date.substring(8, 10) == new Date().getDate())
                day = "Aujourd'hui";
            if(match.date.substring(8, 10) == new Date().getDate() +1)
                day = "Demain";
            if(match.date.substring(8, 10) == new Date().getDate() +2)
                day = "Après-demain";
            if(match.date.substring(8, 10) >= new Date().getDate() +3)
                day = "Plus tard";
            return (
            <Link key={index} className={styles.matchContainer} to={`/match/${match.id}`}>
                
                <small>{match.competition.name}</small>
                <p>{match.name}</p>
                <span>{day}</span>
                <Moment format="HH:mm" locale="fr">{match.date}</Moment>
            </Link>
            )
        })}
    </div>
  ) : <>Chargement...</>
  
}

