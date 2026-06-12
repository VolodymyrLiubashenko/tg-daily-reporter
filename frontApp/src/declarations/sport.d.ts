export interface IManchesterUnitedNextMatch {
   opponent: string;
   utcDate: string;
   competition: string;
   venue: "home" | "away";
}

export interface IObolonNextMatch {
   utcDate: string;
   date: string;
   time: string;
   home: string;
   away: string;
   competition: string;
   season: string;
   venue: "home" | "away";
   opponent: string;
}

export interface IF1NextRace {
   raceName: string;
   date: string;
   circuitName: string;
   locality: string;
   country: string;
}
