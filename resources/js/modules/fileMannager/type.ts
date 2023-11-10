export type Category = {
    title:string;
    id:number|string;
    active:boolean,
    ratio?:string;
}

export type WithRequest = Record<string ,string|number>