import { AxiosError, AxiosResponse } from "axios";
// import moment from "moment";
import Swal from 'sweetalert2'



export function format(str:string,format:string){
    // return moment(str).format(format)
}

export const removeById = (id:any,collection:Array<Record<string,any>>)=>{
    const index = collection.findIndex(e=>e.id==id);
    if(index>-1){
        collection.splice(index,1)
    }
}

export const  validationError = (error:AxiosError)=>{
    const {response} = error as AxiosError<AxiosResponse>;
    if((response as any).status !=422) return null;

    const { errors } = (response as any).data as any;
    const ul = document.createElement('ul');
    for (const key in errors) {
        let li = document.createElement('li');
        li.textContent = errors[key][0];
        ul.appendChild(li)
    }
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: ul,
       
      })
}

export const removeConfirm = async(title:string)=>{
    const {isConfirmed} = await (Swal as any).fire({
        title: 'Are you sure?',
        text:title,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      })
      return Promise.resolve(isConfirmed);
}

export const confirmDialog = async(title:string)=>{
    const {isConfirmed} = await (Swal as any).fire({
        title: 'Are you sure?',
        text:title,
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Yes, Do it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      })
      return Promise.resolve(isConfirmed);
}