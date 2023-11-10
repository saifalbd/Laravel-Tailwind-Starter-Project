import { el, mount } from "redom";


export class Pagination {
    public el:HTMLElement;

     constructor(){

        this.el = el('nav',{class:"pagination-box",'aria-label':"Page navigation example"});

        mount(this.el,this.listBX());

    }

    listBX(){
        const prev = el('li',{},el('button','Previus'));
        const next = el('li',{},el('button','Next'));
        const list = [1,2,3,4].map(page=>{
            return el('li',{},el('button',page));
        })

        return el('ul',{},[prev,...list,next])
    }

}