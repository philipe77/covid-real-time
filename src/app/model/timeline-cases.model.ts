export interface TimeLineCase{
    timeline:TimeLine
    country:string
}
export interface TimeLine{
    cases:any[],
    deaths:Cases[]
}

export interface Cases{
    data:any,
    
}

export interface MortesPorPais{
    country:string
    timeline:TimeLine
}
