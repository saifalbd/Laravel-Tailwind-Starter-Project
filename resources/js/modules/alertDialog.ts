import { el, unmount,mount } from "redom"
import { icons } from "./fileMannager/icons";

type Box = {
    isBox?:boolean
    type?:'Succcess' | 'Warning' | 'Error' | 'Validation Error',
    align?:'center' | 'right',
    dismiss?:boolean
    timeOut?:number;
    text:string
}

export const alertDialog = (o:Box)=>{
    let isBox = true;
    let align:'center'|'right' = 'center';
    let type = 'Success';
    let dismiss = false;
    let timeOut = 3000;
    if(o.hasOwnProperty('isBox')){isBox = o.isBox;}
    if(o.hasOwnProperty('type')){type = o.type;}
    if(o.hasOwnProperty('dismiss')){dismiss= o.dismiss;}
    if(o.hasOwnProperty('timeOut')){timeOut= o.timeOut;}
    if(o.hasOwnProperty('align')){align= o.align;}
   
    
    let cls = 'success';
    if(type=='Succcess'){
        cls ='success';
    }else if(type=='Error' || type=='Validation Error'){
        cls ='error';  
    }else if(type=='Warning'){
        cls ='warn';   
    }
    const icon = cls=='success'?icons.success():icons.alert();

    const close = el('button',{},[
        icons.close(),
        el('span','Close')
    ]);

   const dom =  el('div',{class:`alert-box ${cls} ${align} ${isBox?'box':''}`},[
        el('div',{class:'alert'},[
            el('div',{class:'left-box'},icon),
            el('div',{class:'middle-box'},
            [
                el('div',{class:'title'},type),
                el('p',o.text)
            ]
            ),
            el('div',{class:'right-box'},close),
        ])
    ]);

    if(align=='center'){
        dom.classList.add('animate__bounceInDown');
       
   
        
    }else{
        dom.classList.add('animate__bounceInUp');
    }
    if(dismiss){setTimeout(()=>unmount(document.body,dom),timeOut)}

    close.addEventListener('click',()=>{
        unmount(document.body,dom)
    })

    mount(document.body,dom)


}