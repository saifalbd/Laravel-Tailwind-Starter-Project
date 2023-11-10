import { el, mount, unmount } from "redom";
import { icons } from "./icons";
import { AddMedia } from "./addMedia";
import { Toast } from "./toast";
import { AxiosError } from "axios";



export class Gallery{
    public selectCallBack:Function;
    public el:HTMLElement;
    public addMedia:AddMedia;

    public toast:Toast;

    public prevList:Array<{id:number,dom:HTMLElement}> = [];
    constructor(selectCallBack:Function,addMedia:AddMedia) {
       
        this.selectCallBack = selectCallBack;
      
        this.el = el('div',{class:'image-layout'}); 
        this.addMedia = addMedia;

       
    }

    removeAttach(image:Image){
        const index = this.prevList.findIndex(e=>e.id==image.id);
        if(index>-1){
            this.prevList[index].dom.remove();
            this.prevList.splice(index,1)
        }
    }


    speedDial(image:Image){

        const save = el('button',{type:'button',class:'dial-btn'},[
            icons.save(),
            el('span','Save')
        ])

        save.addEventListener('click',()=>{
            const fileName =image.url.split('/').pop();
            var el = document.createElement("a");
            el.setAttribute("href", image.url);
            el.setAttribute("download", fileName);
            document.body.appendChild(el);
             el.click();
            el.remove();
        })
        const remove = el('button',{type:'button',class:'dial-btn'},[
            icons.remove(),
            el('span','Delete')
        ])
        const edit = el('button',{type:'button',class:'dial-btn'},[
            icons.edit(),
            el('span','Edit')
        ])
        edit.addEventListener('click',()=>{
            this.addMedia.onEdit(image)
        })
        const select = el('button',{type:'button',class:'dial-btn select'},[
            icons.select(),
            el('span','Select')
        ]);

        select.addEventListener('click',()=>{
            this.selectCallBack(image)
        })

     


        remove.addEventListener("click",async()=>{
            if (window.confirm("Do you really want to Delete Attach?")) {
                try {
                   

                    await window.axios.delete(route('api.attach.destroy',{attachment:image.id}));

                    this.removeAttach(image);



                    (new Toast({status:200,message:'Successfully Remove Image'})).show()

                  
                    
                } catch (error:AxiosError|unknown) {
                    console.error(error);
                    if(error instanceof AxiosError){
                        if(error.response){
                            const status = error.response.status;
                            const response = error.response;
                            console.log({response})
                            const message = response.data.message as string;
                            (new Toast({status:status,message:message})).show()
                        }
                    }
                   
                }
              }
        })


        const id = `speed-dial-menu-text-outside-button-${image.id}`;
        const btn = el('button',{
            type:"button",'data-dial-toggle':id,
                    'aria-controls':id,"aria-expanded":"false",
                    class:"trigger-btn"
        },icons.menu());

        const listBox = el('div',{id,class:"dial-box hidden"},[
            save,remove,edit,select

        ]);

        btn.addEventListener('click',()=>{
            listBox.classList.toggle('hidden')
        })

        return  el('div',{'data-dial-init':'true' ,class:"speed-dial"},[
            listBox,
            btn
            
        ])
    }

    singleCard(image:Image){
        return el('div',{class:`relative aspect-${image.ratio}`,'data-img-id':image.id,'data-cat-id':image.category_id},[
            el('img',{class:`aspect-${image.ratio}`,'data-cat-id':image.category_id, src:image.url}),
           this.speedDial(image)
        ])
    }

    public update(items:Image[]){
        items.forEach(image=>{
            this.push(image)
        })
    }


    onReRender(items:Image[]){
        this.prevList.forEach(image=>{
            unmount(this.el,image.dom)
        })
        items.forEach(image=>{
            this.push(image)
        })

    }

  

    public push(image:Image,isEdit:boolean=false) {
       try {
        if(isEdit){
            
            const card = this.prevList.find(e=>e.id==image.id);
            if(!card) throw `Card Are Not found`;
            const oldCls = Array.prototype.filter.call(card.dom.classList,(e:string)=>e.startsWith('aspect-'));
                const img = card.dom.querySelector('img');
                if(!img) throw "image Are Not Found"
                console.log(img)
                img.src = image.url;
                card.dom.classList.remove(oldCls);
                img.classList.remove(oldCls);
                if(image.ratio){
                    card.dom.classList.add(`aspect-${image.ratio}`);
                    img.classList.add(`aspect-${image.ratio}`)
                }
        }else{
            const card = this.singleCard(image)
            mount(this.el,card);
            this.prevList.push({id:image.id,dom:card}); 
          
        }
       } catch (error) {
        console.error(error)
       }
       
    }

    onmount() {
        console.log("mounted Hello");
    }
    onremount() {
        console.log("remounted Hello");
    }
    onunmount() {
        console.log("unmounted Hello");
    }
   
}