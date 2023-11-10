<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttachmentCategory extends Model
{
    use HasFactory;

    protected $fillable = ['title','ratio'];


    public function medias(){
        return $this->hasMany(Attachment::class,'category_id');
    }
}
