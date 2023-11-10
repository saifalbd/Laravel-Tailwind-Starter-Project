
import { el,  mount } from "redom";
import { icons } from "./icons";
import { Loader } from "./loader";
import { Category, WithRequest } from "./type";
import { alertDialog } from "../alertDialog";

export class AddCategory{
    public el:HTMLElement;
    public title:string;
    public ratio:string;
    public addCallBack:Function;
    public loader:Loader;
   public titleEl:HTMLElement;
   public inputEl:HTMLInputElement;
   public rationListEl:HTMLElement;
   public editId:number |string;
    public isEdit:boolean = false;
    public withRequest:WithRequest;
    constructor(addCallBack:Function,withRequest:WithRequest) {

        this.addCallBack = addCallBack;
        this.loader = new Loader;
        this.withRequest = withRequest;
        
        const closeBtn = el('button',{type:"button", class:"close-btn"},
        [
         icons.close(),
         el('span',{class:'sr-only'},'Close menu')
        ]
         );
       
        this.titleEl = el('span','Add Media Category');
        this.el = el('div',{
        class:"drawer right trans-x-full",tabindex:"-1"},[
            el('h5',{class:"d-label"},[
                icons.attach(),
                this.titleEl
            ]),
            closeBtn
            
        ]);

        closeBtn.addEventListener('click',()=>{
       
            this.hide()
        })

        mount(this.el,this.uploadLayout()); 
     

       
        
    }

    show(){
        this.el.classList.remove('trans-x-full');
        this.el.classList.add('trans-none');
       
    }

    hide(){
        this.isEdit = false;
        this.editId =''
        this.inputEl.value = '';
        this.ratio = null;
        this.el.classList.add('trans-x-full');
        this.el.classList.remove('trans-none');
        const backDrop = document.querySelector('[drawer-backdrop]');
        if(backDrop){
            backDrop.remove()
        }
      
    }

    uploadLayout(){
        const input = el('input',{type:"text",class:"form-control",placeholder:"Media Category Here.."});
        this.inputEl = input;

        input.addEventListener('change',()=>{
            this.title = input.value;
        });

        const listitems = el('ul',{},[
            {text:'1/1',value:'1'},
        {value:'1point5',text:'1/1.5'},
        {value:'2',text:'1/2'},
        {value:'2point5',text:'1/2.5'}
    ].map(e=>{
        let radio = el('input',{value:e.value,type:'radio',name:'list-radio'});
        radio.addEventListener('change',()=>{
            this.ratio = radio.value;
        })
        return el('li',{},el('div',{},[
            radio,
            el('label',{},e.text)

        ]))
    }))

    this.rationListEl = listitems;
       
    const save = el('button',{class:"save-media"},'save');
    save.addEventListener('click',async()=>{
        this.loader.show()
        
        try {
            const title = this.title;
        const ratio = this.ratio;
        if(this.isEdit){
            const url = route('api.attachCategory.update',{attachment_category:this.editId,...this.withRequest})
            const {data} =  await window.axios.put(url,{title,ratio});
            this.addCallBack(data);
        }else{
            const url = route('api.attachCategory.store')
            const {data} =  await window.axios.post(url,{title,ratio,...this.withRequest});
            this.addCallBack(data);

            alertDialog({
                   
                isBox:false,
                align:'right',
                dismiss:false,
                text:'Successfully Created Media Category'
            });
        

        }

     
       this.hide();
       this.loader.hide();
        } catch (error) {
            console.error(error)
        }
    });
        return el('div',{class:'upload-layout'},[
            el('div',{},[
                el('div',{},[]), //image-box
                el('div',{},input),
                el('div',{class:'aspect-ratio-box'},[
                    el('h3.headline','Aspect Ratio'),
                    listitems
                ]),
                el('div',{class:'text-center'},save),
            ]),
            this.loader
        ])
       
       
    }


    onEdit(category:Category){
        this.isEdit = true;
        this.title = category.title;
        this.ratio = category.ratio;
        this.editId = category.id;
        this.inputEl.value = category.title;
      const list =  this.rationListEl.querySelectorAll('li>div>input');
      Array.prototype.forEach.call(list,(input:HTMLInputElement)=>{
        const value = input.value;
        if(value==category.ratio){
            input.checked = true;
        }
      })

      this.show();

    }


 
    onmount() {
     
        // const id ="drawer-add-cat";
        // const model = new Modal(document.getElementById(id)); 

    }
    onremount() {
        console.log("remounted Hello");
    }
    onunmount() {
        console.log("unmounted Hello");
    }
    update(arg:any) {
        // this.el.textContent = data.name;
    }
}