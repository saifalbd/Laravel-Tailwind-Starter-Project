import { el,mount } from "redom";
import { AddMedia } from "./addMedia";
import { AddCategory } from "./addCategory";
import { Gallery } from "./gallery";
import { Pagination } from "./pagination";
import { CategoryList } from "./categoryList";

import { Category, WithRequest } from "./type";
import { Loader } from "./loader";

export class MediaManager {
    public el:HTMLElement;
    public addMedia:AddMedia;
    public addCategory:AddCategory;
    public categortList:CategoryList;
    public gallery:Gallery;
    public pagination:Pagination;
    public imageOnSelect:Function;
    public loader:Loader;
    public withRequest:WithRequest;
    constructor(imageOnSelect:Function,withRequest:WithRequest,loader:Loader) {
        this.imageOnSelect = imageOnSelect;
        this.loader = loader;
        this.el = el('div',{class:'media-manger'});

        this.withRequest = withRequest;
        
        this.init()
    }

   


   async categoryOnClick(category:Category){

        try {

            
            const url = route('api.attach.index',{category:category.id,...this.withRequest});
            const {data} = await window.axios.get(url);
            this.gallery.onReRender(data)
            
        } catch (error) {
            
        }
        
    }

   

    async getCategories(){

        try {
    
            const url = route('api.attachCategory.index',{...this.withRequest});
            const {data} = await window.axios.get(url);

            this.categortList.update(data);
            this.addMedia.update(data)
          
        } catch (error) {
          console.error(error)  
        }
            
        }
    async fetchAttachments(){
        try {
    
            this.loader.show()
            
            const url = route('api.attach.index',{...this.withRequest});
            const {data} = await window.axios.get(url);

            this.gallery.update(data);

            this.loader.hide();
        } catch (error) {
          console.error(error)  
        }  
    }



init(){
    const media = new AddMedia((image:Image,isEdit:boolean)=>{
        
        gallery.push(image,isEdit)
    },this.withRequest);
    this.addMedia = media;
    const gallery = new Gallery((image:Image)=>{
        this.imageOnSelect(image);
    },this.addMedia);
   
    const addCat = new AddCategory((item:Category)=>{
        categoryList.push(item)
    },this.withRequest);
   
    this.addCategory = addCat;
    this.gallery = gallery;

    
    const categoryList  = new CategoryList((category:Category)=>{
        this.categoryOnClick(category);
    },this.addCategory);
   
   



    
 
    this.categortList = categoryList;
   
    
    
    mount(this.el,categoryList)
    mount(this.el,media);
    mount(this.el,addCat)
    mount(this.el,gallery)

    this.getCategories();
    this.fetchAttachments();

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
    update() {
        // this.el.textContent = data.name;
    }
}





