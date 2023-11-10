<?php

namespace App\Http\Controllers;

use App\Models\AttachmentCategory;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AttachmentCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = AttachmentCategory::query();


       
        
        $items = $query->get();

        return $items->map(function($item){
            $item->active = false;
            return $item;
        });
    }

   

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'=>['required','string'], //Rule::unique('attachment_categories')
            'ratio'=>['required'],
        ]);

      $cat =  AttachmentCategory::create($request->toArray());

        return response()->json($cat);
    }

   

   

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AttachmentCategory $category)
    {
        $request->validate([
            'title'=>['required','string',Rule::unique('attachment_categories')->whereNot('id',$category->id)],
            'ratio'=>['required','string'],
        ]);

        
        $category->update($request->toArray());

        return response()->json($category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AttachmentCategory $category)
    {

        if(!$category->medias()->count()){
            $category->delete();
        }
        
    }
}
