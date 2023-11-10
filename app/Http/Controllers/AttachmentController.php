<?php

namespace App\Http\Controllers;

use App\Http\Resources\AttachResource;
use App\Models\Attachment;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Auth\Access\Response;

class AttachmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $request->validate([
            'category'=>['sometimes','nullable','numeric']
        ]);

        $category_id = $request->category;
     

        $items = Attachment::query()->when($category_id,fn($q)=>$q->where('category_id',$category_id))->get();

        $collection = AttachResource::collection($items);
        return response()->json($collection);
    }



    public function uploadImg(UploadedFile $file){
        $model = 'model';
        $type = $file->getClientMimeType();
        $ex = $file->getClientOriginalExtension();
        $disk = 'public';
        $slug = $model;
        $uid = now()->timestamp;
        $name = $uid.'.'.$ex;
        $path  ='img/'.$slug;
     $path = Storage::disk($disk)->putFileAs($path,$file,$name);
     return $path;
    }
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'category'=>['required','numeric'],
            'attach'=>['required','image']
        ]);

        $category_id = $request->category;
        $file = $request->file('attach');
       $path = $this->uploadImg($file);
       $disk = 'public';
       $model = 'model';
       $model_id = $request->get('model_id',null);
       $model_type = $request->get('model_type',null);

       $img = Attachment::create(compact('disk','path','model','category_id','model_type','model_id'));

       $item = new AttachResource($img);
       return response()->json($item);
    

    }

    /**
     * Display the specified resource.
     */
    public function show(Attachment $attachment)
    {
        return $attachment;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Attachment $attachment)
    {
        $request->validate([
            'category'=>['required','numeric'],
            'attach'=>['nullable','image']
        ]);

        $category_id = $request->category;
        $data = compact('category_id');

        if($request->hasFile('attach')){
            $file = $request->file('attach');
            Storage::disk($attachment->disk)->delete($attachment->path);
            $path = $this->uploadImg($file);
            $data = array_merge($data,compact('path'));
         
        }

    
        $attachment->update($data);
       

        $item = new AttachResource($attachment);

        return response()->json($item);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attachment $attachment)
    {
        if($attachment->users()->limit(1)->count()){
            return Response::deny("Attachment Can't Remove those Attachment Use on Some Users");
        }else if($attachment->instructors()->limit(1)->count()){
            return Response::deny("Attachment Can't Remove those Attachment Use on Some Instructors");
        }else if($attachment->courses()->limit(1)->count()){
            return Response::deny("Attachment Can't Remove those Attachment Use on Some Courses");
        }else if($attachment->products()->limit(1)->count()){
            return Response::deny("Attachment Can't Remove those Attachment Use on Some Products");
        }else if($attachment->students()->limit(1)->count()){
            return Response::deny("Attachment Can't Remove those Attachment Use on Some Students");
        }else if($attachment->posts()->limit(1)->count()){
            return Response::deny("Attachment Can't Remove those Attachment Use on Some Posts");
        }else{
            $attachment->deleteWithAttach();
        }
       
    }
}
