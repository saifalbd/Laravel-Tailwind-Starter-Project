<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Attachment extends Model
{
    protected $fillable = ['disk', 'path', 'is_default', 'category_id'];
    protected $appends = ['url', 'ratio'];

    protected $with = ['category'];


    public function category()
    {
        return $this->belongsTo(AttachmentCategory::class, 'category_id');
    }



    public static function remove($avatar)
    {
        if ($avatar && !$avatar->is_default) {
            $avatar->delete();
        }
    }



    public static function add(UploadedFile $file, string $model): Attachment
    {
        $model = Str::lower(class_basename($model));
        $ex = $file->getClientOriginalExtension();
        $disk = 'public';
        $slug = $model;
        $uid = now()->timestamp;
        $name = $uid . '.' . $ex;
        $path  = $model . '-' . $slug;
        $path = Storage::disk($disk)->putFileAs($path, $file, $name);

        $category_id = 1;
        return static::create(compact('disk', 'path', 'category_id'));
    }


    public function getRatioAttribute()
    {
        return $this->category->ratio;
    }

    public function getUrlAttribute()
    {
        $disk = Storage::disk($this->disk);
        return $disk->url($this->path);
    }




    public function deleteWithAttach()
    {
        $disk = $this->disk;
        Storage::disk($disk)->delete($this->path);
        $this->delete();
    }


    /*---------------------------------------------ATTACHMENT ARE USESES---------------------------------------------------*/

    public function users()
    {
        return $this->hasMany(User::class, 'avatar_id');
    }
    public function instructors()
    {
        return $this->hasMany(Instructor::class, 'avatar_id');
    }

    public function posts()
    {
        return $this->hasMany(Post::class, 'avatar_id');
    }
    public function courses()
    {
        return $this->hasMany(Course::class, 'avatar_id');
    }
    public function products()
    {
        return $this->hasMany(Product::class, 'avatar_id');
    }
    public function students()
    {
        return $this->hasMany(Student::class, 'avatar_id');
    }
}
