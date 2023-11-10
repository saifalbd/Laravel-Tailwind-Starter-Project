import { el, svg } from "redom";

export class Loader {


    public el:HTMLElement;
    constructor(){
        this.el = el('div',{class:'loader'},[
            el('div',{
                class:"spinner"
            },this.spinners())
            
        ]);

    }

    show(){
        this.el.classList.add('show')
    }
    hide(){
        this.el.classList.remove('show')   
    }


    spinners(){
        return [...Array(8).keys()].map(e=>el('div'))
    }

}