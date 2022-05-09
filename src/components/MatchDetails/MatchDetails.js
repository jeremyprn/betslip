import { useEffect, useState } from "react";
import Betclic from "../../services/Betclic";
import styles from './MatchDetails.module.css';
import Moment from 'react-moment';
import { Link, useParams } from "react-router-dom";

export default function MatchDetails() {

    const params = useParams();
    const [match, setMatch] = useState();
    const [day, setDay] = useState();

    useEffect(() => {
    
        (async () => {
          const dataMatchs = await Betclic.getOddsForMatch(params.id);
          console.log(dataMatchs.event.grouped_markets);
          setMatch(dataMatchs);

          if(dataMatchs.event.date.substring(8, 10) == new Date().getDate())
            setDay("Aujourd'hui");
          if(dataMatchs.event.date.substring(8, 10) == new Date().getDate() +1)
            setDay("Demain");
          if(dataMatchs.event.date.substring(8, 10) == new Date().getDate() +2)
            setDay("Après-demain");
          if(dataMatchs.event.date.substring(8, 10) >= new Date().getDate() +3)
            setDay("Plus tard");
          
        })();
       
      }, []);
    return (
        <div className={styles.container}>
            {match?.event ?
                <div className={styles.matchContainer}>
                    <div className={styles.header}>
                        <small>{match.event.competition.name}</small>
                        <p>{match.event.name}</p>
                        <span>{day}</span>
                        <Moment format="HH:mm" locale="fr">{match.event.date}</Moment>
                    </div>
                    <div className={styles.oddsContainer}>

                        {/* Event */}
                        {match.event.grouped_markets.map((odd, index) => {
                            return (
                                <div key={index} className={styles.oddContainer}>
                                    <span className={styles.oddTitle}>{odd.name}</span>

                                    {/* Market */}
                                    {odd.markets.map((market, index) => {
                                        return (
                                            <div key={index} className={styles.marketContainer}>
                                                {odd.name == market.name ? <span></span>
                                                :<span className={styles.marketTitle}>{market.name}</span>}
                                             
                                                {/* Selection */}
                                                <div>
                                                {market.selections.map((selection, index) => {
                                                    return (
                                                    <div key={index} className={styles.selectionsContainer}>
                                                        {selection.map((element, index) => {
                                                            const name = element?.name;
                                                            const odd = element?.odds;
                                                            return(
                                                                <div key={index} className={styles.selectionContainer}>
                                                                    <span className={styles.selectionTitle}>{name}</span>
                                                                    <span className={styles.selectionOdd}>{odd}</span>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                )})}
                                                </div>

                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            :
                <>Le match ayant l'id {params.id} n'existe pas.</>
            }
        </div>
    )
}