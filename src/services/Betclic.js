import betclicRepository from "../repositories/betclicRepository";

const Betclic = {
    async getMatchs(){
        const data = await betclicRepository.getMatchs();
        return data;
    },
    async getOddsForMatch(id){
        const data = await betclicRepository.getOddsForMatch(id);
        return data;
    },
    async checkCompatibleOdds(oddsId){
        const data = await betclicRepository.checkCompatibleOdds(oddsId);
        return data;
    }
}

export default Betclic;