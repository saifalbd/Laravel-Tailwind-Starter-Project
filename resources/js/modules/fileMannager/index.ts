
import { el, mount } from "redom";
import { icons } from "./icons";
import { MediaManager } from "./mediaManager";
import { Pagination } from "./pagination";
import { AddCategory } from "./addCategory";
import { AddMedia } from "./addMedia";
import { Loader } from "./loader";
import { Toast } from "./toast";

type Arg = {
    triger?:HTMLElement,
    onSelect?:Function
    isPage?:boolean,
    rootDom?:HTMLElement;
    withRequest?:{
        model_id:string|number,
        model_type:string
    }
}


export class MediaDialog {

    public addMedia:AddMedia;
    public addCategory:AddCategory;

    public el:HTMLElement;
    public trigerBox:HTMLElement;

    public onSelect:Function|undefined;
    public mediaDrawer:AddMedia;
    public categoryDrwar:AddCategory;
    public isPage:boolean = false;
    public loader:Loader;
    public withRequest:Record<string,number|string>

    constructor(arg:Arg){
       if(arg.hasOwnProperty('isPage')){
        this.isPage = arg.isPage;
       }

       this.withRequest = arg.withRequest?arg.withRequest:{};
      try {
        
        if(!this.isPage){
            if(!arg.hasOwnProperty('onSelect'))throw 'onSelect CallBack funtion Not Found';
            if(!arg.hasOwnProperty('triger'))throw 'triger HtmlElement Not Found';

            this.onSelect = arg.onSelect;
            this.trigerBox = arg.triger;
        }
       

        this.loader = new Loader;
      

        this.el = el('div',{tabindex:"-1",'aria-hidden':"true",class:`media-modal ${this.isPage?'page':''}`},el('div',{},[
            el('div',{class:'media-model-content'},[
                this.header(),
                this.content(),
                this.footer()
            ])
        ]));
        
      } catch (error) {
        console.error(error)
        this.el = el('div')
      }


    }


    public addBtnGroup(){

        const mediaBtn =  el('button',{
            type:"button", 
        class:"btn primary"},'Add Media');

    
    mediaBtn.addEventListener('click',()=>{
        this.mediaDrawer.show()
    })
        const catBtn = el('button',{
            type:"button", 
        class:"btn primary ml-2",
        
        },'Add Category');


        catBtn.addEventListener('click',()=>{
            this.categoryDrwar.show();
        })

     
        return el('div',{class:'add-btn-group'},[
            mediaBtn,
           catBtn
        ])
    }



    header(){

        
        const btn =  el('button',{type:"button",class:"close-btn"},icons.close());
        btn.addEventListener('click',()=>this.hide())
        return el('div',{class:'media-modal-header'},[
            el('.media-modal-header-title','Media Mananger'),
            el('div',{class:'flex items-center'},[
                this.addBtnGroup(),
               btn
            ])
        ])
    }

    imageOnSelect(image:Image){

        if(typeof this.onSelect == 'function'){
            this.onSelect(image);
            this.hide()
            return null;
        }
        const parent  = this.trigerBox.parentElement;
       const img = parent.querySelector('img');
       if(img){
        img.src = image.url;
       }else{
        const imageBox = parent.querySelector('.image-box');
        if(imageBox){
            mount(imageBox,el('img',{src:image.url}))
        }
       }

       const input = this.trigerBox.querySelector('input');
       if(input){
        input.value = String(image.id);
       }

       this.hide()
    }

    content(){
        const mediaPage = new MediaManager((image:Image)=>this.imageOnSelect(image),this.withRequest,this.loader);
        this.mediaDrawer = mediaPage.addMedia;
        this.categoryDrwar = mediaPage.addCategory;

        return el('div',{class:'media-modal-body'},[mediaPage,this.loader])
    }

    footer(){
        const pagination = new Pagination;
        let btn = el('button',{class:'close-btn btn error'},'close');
        btn.addEventListener('click',()=>this.hide())
        return el('div',{class:'media-modal-footer'},[
            pagination,
            btn
        ])
    }

    show(){

        this.el.classList.remove('hidden');
        this.el.classList.add('justify-center','items-center','flex');
    }
    hide(){
        this.el.classList.add('hidden');
        this.el.classList.remove('justify-center','items-center','flex');
    }

}





var mediaDialogIs:MediaDialog;

window.mediaManager = (o:Arg)=>{

 try {
    if(o.isPage){
        if(!o.rootDom) throw 'RootPage Dom not Found';
        const dialog = new MediaDialog(o);
        mount(o.rootDom,dialog)

    }else{

        if(!o.triger) throw 'Triger dom Not Define';
        o.triger.addEventListener('click',()=>{
           
           
         if(mediaDialogIs){
             mediaDialogIs.show()
         }else{
             const dialog = new MediaDialog(o);
             mediaDialogIs = dialog;
             mount(document.body,dialog);
         }
         
     })
    }
 } catch (error) {
    console.log('mediaManager Error')
    console.error(error)
 }
   

   

}







