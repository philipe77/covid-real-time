import { Mundo } from './mundo.model';

export interface Pais extends Mundo {
    country: string;
    todayDeaths: number;
    critical: number;
    casesPerOneMillion: number
    deathsPerOneMillion: number;
    countryInfo: CountryInfo;
    todayCases:number;
    cases:number
    deaths:number;
    recovered:number;
    
}

interface CountryInfo {
    flag: string;
}