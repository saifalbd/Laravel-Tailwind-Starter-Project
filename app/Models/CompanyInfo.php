<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyInfo extends Model
{
    use HasFactory;

    protected  $fillable = [
        'name',
        'tagline',
        'address',
        'mobile',
        'email',
        'logo_id',
        'facebook',
        'twitter',
        'linkedin',
        'instagram'
    ];


    public  function  sLogo()
    {
        return $this->belongsTo(Attachment::class, 'logo_s_id');
    }
    public  function  rLogo()
    {
        return $this->belongsTo(Attachment::class, 'logo_r_id');
    }
}
