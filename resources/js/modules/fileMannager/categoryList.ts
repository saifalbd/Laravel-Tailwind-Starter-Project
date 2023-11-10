import { el, mount } from "redom";

import { Category } from "./type";
import { icons } from "./icons";
import { AddCategory } from "./addCategory";



export class CategoryList {

    public el:HTMLElement;
    public clickCallBack:Function;
    public categoryDrawer:AddCategory;

    public prevCatList:Record<string,HTMLElement> = {}

    constructor(clickCallBack:Function,categoryDrawer:AddCategory){
        this.clickCallBack = clickCallBack;
        this.categoryDrawer = categoryDrawer;

        const dBtn = el('div',{class:'no-edit active'},el('button',{type:'button',class:'click-item'},"All Category"));
        this.el = el('div',{class:'category-list'},[
            dBtn
        ]);

        this.onItemClick({id:'',title:'AllCategory',active:true},dBtn)

       
    }

    onItemClick(e:Category,cat:HTMLElement){
        cat.addEventListener('click',()=>{
            const btns = this.el.querySelectorAll('div>button.click-item');
            Array.prototype.forEach.call(btns,(btn:HTMLButtonElement)=>{
             btn.parentElement.classList.remove("active");
     
            })
            cat.classList.add("active");
             this.clickCallBack(e);
         })
    }


    singleItem(e:Category){
        const btnClick =  el('button',{type:'button',class:'click-item'},e.title);
        const btnEdit = el('button',{class:'edit-item'},icons.edit());
        btnEdit.addEventListener('click',()=>{
            this.categoryDrawer.onEdit(e)
        })
        const cat = el('div',{'data-cat-id':e.id, class:`${e.active?'active':''}`},[
            btnClick,
            btnEdit  
        ])
        btnClick.addEventListener('click',()=>{
            const btns = this.el.querySelectorAll('div>button.click-item');
            Array.prototype.forEach.call(btns,(btn:HTMLButtonElement)=>{
             btn.parentElement.classList.remove("active");
     
            })
            cat.classList.add("active");
             this.clickCallBack(e);
         })
       
   
    return cat;
    }

  

    update(items:Category[]){
        items.forEach((e) => {
           this.push(e)
        }); 

        console.log(this.prevCatList)
    }
    public push(e:Category){
       

        
       try {
        if(!e) throw 'Category Not found';
        if(!e.id) throw 'Category id Not Found';
        const key  = `cat_${e.id}`;
     
        if(Object.prototype.hasOwnProperty.call(this.prevCatList,key)){
            const dom =  this.prevCatList[key];
            dom.querySelector('button.click-item').textContent = e.title;
            const cardList = document.body.querySelectorAll(`.image-layout div[data-cat-id="${e.id}"]`);

            Array.prototype.forEach.call(cardList,(d:HTMLElement)=>{
                const oldCls = Array.prototype.filter.call(d.classList,(e:string)=>e.startsWith('aspect-'));
                const img = d.querySelector('img');
                d.classList.remove(oldCls);
                img.classList.remove(oldCls);
                if(e.ratio){
                    d.classList.add(`aspect-${e.ratio}`);
                    img.classList.add(`aspect-${e.ratio}`)
                }
                
            })
           
          
        }else{
            this.prevCatList[key] = this.singleItem(e);
            mount(this.el,this.prevCatList[key])  
        }
       } catch (error) {
        console.error(error)
       }
       
      
      
    }

    onmount() {
   
        console.log("mounted Hello");
    }



    

}