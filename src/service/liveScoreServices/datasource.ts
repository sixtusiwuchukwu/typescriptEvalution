import Validator from "../../utils/validators";
import { User } from "../../interface/userInterface";
import __User from "../../model/user/userModel";
import { newKey } from "../../tools/generateKey";
const importDynamic = new Function('modulePath', 'return import(modulePath)');
const fetch = async (...args:any[]) => {
  const module = await importDynamic('node-fetch');
  return module.default(...args);
};

// const key:string = process.env.APIKEY
const {APIKEY,APIURL} = process.env

class LiveScoreDatasource extends Validator {
    private apiKey:string;
    private apiUrl:string;
    private leagues:any[];
    private fixtures:any[]
    constructor(apiKey:string) {
        super()
        this.apiKey = apiKey
        this.apiUrl = APIURL
        this.leagues = []
        this.fixtures = []
      }
      async fetchData(criteria:Object):Promise<Object> {
        let query = ''
        for (let [key, param] of Object.entries(criteria)) {
          query += `&${key}=${param}`
        }        
       return await fetch(`${this.apiUrl}?APIkey=${this.apiKey}` + query).then((res)=>res.json())
        
      }
      async getCountries():Promise<Array<object>> {
        return (await this.fetchData({ met: 'Countries' }) as any).result
      }
      async getLeagues(country_key:string) {
        let leagues = (await this.fetchData({ met: 'Leagues' }) as any).result
        this.leagues = leagues
        let toReturn = leagues
          .filter((league:any) => {
            return league.country_key == country_key
          })
          .map(({ league_name, country_name, league_key }:any) => {
            return { league_name, country_name, league_key }
          })
        return toReturn
      }
      async getAllLeagues():Promise <Array<object>>{
        return (await this.fetchData({ met: 'Leagues' })as any ).result
      }
      getFixtures(league_id:string):any[] {
        let fixtures = this.fixtures.filter((fixture) => {
          return fixture.league_key == league_id
        })
        return fixtures
      }
      getFixture(fixture_id:any){
        let fixture = this.fixtures.filter(fixture => fixture.event_key == fixture_id)
        return fixture[0]
      }
      leagueId(league_name:string):Promise<[]>{
        return this.leagues.filter((league:any) => {
            return league.league_name == league_name
          })[0].league_key
      }
      async getAllFixtures() {
        let time = new Date()
        let fromDate = '2022-01-' + (time.getDate() - 3)
        let toDate = '2022-02-' + ((time.getDate() + 3)%31)
        let fixtures =
         (await this.fetchData({ met: 'Fixtures', from: fromDate, to: toDate })as any).result
        this.fixtures = fixtures
        return fixtures
      }
      async geth2h(id1:any,id2:any){
        return (await this.fetchData({met:'H2H',firstTeamId:id1,secondTeamId:id2})as any).result
      }
      async gettable(id:number){
        return (await this.fetchData({met:'Standings',leagueId:id})as any).result
      }
    
    
  async generateApiKey(User: User) {
    const { _id } = User;

    let user = await __User.findById(_id);
    if (!user) {
      return { Error: "user Not Found" };
    }
   let key:string = user.apiKey= await newKey();
    user.save();
    return{response:key}
  }

}

let NewLiveScore = new LiveScoreDatasource(APIKEY)
    
export default NewLiveScore



