const betclicRepository = {
    async getMatchs (){
        const url = `https://offer.cdn.betclic.fr/api/pub/v4/events?application=2&competitionIds=3&competitionIds=4&competitionIds=5&competitionIds=6&competitionIds=7&competitionIds=8&competitionIds=19&competitionIds=36&competitionIds=40&competitionIds=41&competitionIds=44&competitionIds=47&competitionIds=50&competitionIds=55&competitionIds=198&competitionIds=199&competitionIds=213&competitionIds=228&competitionIds=244&competitionIds=1547&competitionIds=3453&competitionIds=32&competitionIds=28946&countrycode=fr&date=2022-05-09&date=2022-05-10&date=2022-05-11&date=2022-05-12&date=2022-05-13&date=2022-05-14&date=2022-05-15&fetchMultipleDefaultMarkets=true&hasSwitchMtc=true&language=fr&limit=20&offset=0&sitecode=frfr&sortBy=ByLiveRankingPreliveDate`;
        const httpCall = await fetch(url);
        const response = await httpCall.json();
        return response;
    },
    async getOddsForMatch (id){
        const httpCall = await fetch(`https://offer.cdn.betclic.fr/api/pub/v5/events/${id}/bet-builder?application=2&countrycode=fr&language=fr&sitecode=frfr`);
        const response = await httpCall.json();
        return response;
    },
    async checkCompatibleOdds (oddsId){
        
        const url = "https://offer.cdn.betclic.fr/api/pub/v5/events/3001286427/bet-builder?application=2&countrycode=fr&language=fr&sitecode=frfr";
        const httpCall = await fetch(`${url}&selectionIds=${oddsId.join(',')}`);
        const response = await httpCall.json();
        return response;
    }
}

export default betclicRepository;