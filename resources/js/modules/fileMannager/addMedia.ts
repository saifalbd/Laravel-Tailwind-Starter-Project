import { el, mount } from "redom";
import { icons } from "./icons";
import { Category, WithRequest } from "./type";
import { Loader } from "./loader";
import { alertDialog } from "../alertDialog";
export class AddMedia{
    public el:HTMLElement;
    public addCallBack:Function;
    public categorySelect:HTMLSelectElement;
    public file:File | undefined;
    public category_id:string | null;
    public imgEl:HTMLImageElement;
    public loader:Loader;
    public isEdit:boolean = false;
    public editId:number|string;
    public withRequest:WithRequest;
    constructor(addCallBack:Function,withRequest:WithRequest) {
        this.loader = new Loader;
        this.addCallBack = addCallBack;
        this.withRequest = withRequest;
        const closeBtn = el('button',{type:"button", class:"close-btn"},
        [
         icons.close(),
         el('span',{class:'sr-only'},'Close menu')
        ]
         );

        this.el = el('div',{id:"drawer-media",
        class:"drawer -trans-x-full ",tabindex:"-1",
        'aria-labelledby':"drawer-media-label"},[
            el('h5',{class:"d-label"},[
                icons.attach(),
                el('span','Add Media')
            ]),
            closeBtn
            
        ]);

        closeBtn.addEventListener('click',()=>{
           
            this.hide()
        })


        this.categorySelect = this.categorySlc();

        mount(this.el,this.uploadLayout()); 
    }

    show(){
        this.el.classList.remove('-trans-x-full');
        this.el.classList.add('trans-none');
       
    }

    hide(){
        this.el.classList.add('-trans-x-full');
        this.el.classList.remove('trans-none');
        const backDrop = document.querySelector('[drawer-backdrop]');
        if(backDrop){
            backDrop.remove();
        }
  
        if( this.imgEl){
            this.imgEl.src = '';
            this.file = undefined;
            this.category_id = null;
        }
        
        this.categorySelect.value = '';
        this.editId = '';
    }


    private categorySlc(){
        const select = el('select',{class:'form-control'},[
            el('option',{calue:''},'Select Category')
        ]);
        select.addEventListener('change',()=>{
           this.category_id = select.value;
        })

        return select;
    }

    uploadLayout(){
        const input = el('input',{type:"file",class:"form-control"});

        input.addEventListener('change',()=>{
            const files = input.files;
            const fileReadImg = document.getElementById('fileReadImg') as HTMLElement;  
            if(files && files.length){
                const reader = new FileReader;
                const file = files[0];

                reader.onload = ()=>{
                   
                    let src = reader.result as string;
                    if(this.imgEl){
                        this.imgEl.src = src;
                    }else{
                    this.imgEl = el('img',{src});
                     fileReadImg.appendChild(this.imgEl)
                    }

                }
                reader.readAsDataURL(file);
                this.file = file;
            }else{
              const img =  fileReadImg.querySelector('img');
              if(img){
                img.src ='';
              }
              this.file = undefined;
            }
            
        })
        const category  = this.categorySelect;


        const save = el('button',{class:"save-media"},'save');
        save.addEventListener('click',async()=>{
            try {
                const attach = this.file;
                if(!attach && !this.isEdit){
                  
                    alertDialog({
                        type:'Warning',
                        isBox:false,
                        align:'right',
                        dismiss:false,
                        text:'image Are Not Select'
                    });
                    return null;
                };
                const category = this.category_id;
                if(!category){
                    alertDialog({
                        type:'Warning',
                        isBox:false,
                        align:'right',
                        dismiss:false,
                        text:'category not Selected'
                    });
                    
                    return null;
                };

                const f = new FormData;
                if(this.isEdit){
                    if(attach){
                        f.append('attach',attach);
                    }
                }else{
                    if(attach){
                    f.append('attach',attach);
                    }
                }
                
                f.append('category',category);
                for (const key in this.withRequest) {
                    const val = (this.withRequest as any)[key];
                    if(val){
                        f.append(key,val); 
                    }
                   
                }
                
                const url =this.isEdit?route('api.attach.update',{attachment:this.editId}): route('api.attach.store');
                this.loader.show();
                const {data} = await window.axios.post(url,f);
                this.addCallBack(data,this.isEdit);

                alertDialog({
                   
                    isBox:false,
                    align:'right',
                    dismiss:false,
                    text:'Successfully Created Media See on Page Bottom'
                });
            
               
                this.loader.hide();
                this.hide();
                
            } catch (error) {
              console.log(error)  
            }
        })
     
        return el('div',{class:'upload-layout'},[
            el('div',{},[
                el('div',{id:'fileReadImg'},[]), //image-box
                el('div',{},input),
                el('div',{},category),
                el('div',{class:'text-center'},save),
            ]),
            this.loader
        ])
    }

    update(categories:Category[]) {
        categories.forEach(c=>{
            mount(this.categorySelect,el('option',{value:c.id},c.title))
        })
    }

    public onEdit(image:Image){
      try {
        if(!image) throw 'Image Not Found';
        if(!image.id) throw 'Image ID not Found';
        if(!image.category_id) throw 'Image Category ID not Found';
        if(this.imgEl){
            this.imgEl.src = image.url;
        }else{
            const dom = document.getElementById('fileReadImg');
            if(dom){
                this.imgEl = el('img',{src:image.url});
                dom.appendChild(this.imgEl)
            }
          
        }
        
        this.categorySelect.value = String(image.category_id);
        this.category_id = String(image.category_id);
        this.editId = image.id;
        this.isEdit = true;
        this.show()

      } catch (error) {
        console.error(error)
      }
    }
}