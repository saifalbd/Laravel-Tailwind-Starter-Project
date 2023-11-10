<?php

namespace App\Http\Controllers;

use App\Models\CompanyInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class SettingController extends Controller
{


    public function systemPage(){
        $info = CompanyInfo::query()->first();
        if(!$info){
            $info = new \stdClass();
            $info->name = '';
            $info->address = '';
            $info->mobile = '';
            $info->email = '';
            $info->tagline = '';
            $info->facebook = '';
            $info->twitter="";
            $info->linkedin ='';
            $info->instagram ='';
            $info->logo_id = null;

        }
        $s = $info;



        return Inertia::render('Setting/SystemPage',compact('s'));
    }
    public function systemStore(Request $request){
        
        $request->validate([
            'name'=>['required','string'],
'tagline'=>['required','string'],
'address'=>['required','string'],
'mobile'=>['required','string'],
'email'=>['required','email'],
'logo_id'=>['required','numeric'],
'facebook'=>['nullable','string'],
'twitter'=>['nullable','string'],
'linkedin'=>['nullable','string'],
'instagram'=>['nullable','string'],
        ]);
        $info = CompanyInfo::query()->first();
        $data = $request->only(['name',
            'tagline',
            'address',
            'mobile',
            'email','logo_id','facebook',
            'twitter',
            'linkedin',
            'instagram']);
        if($info){
            $info->update($data);
        }else{
            CompanyInfo::create($data);
        }

        Cache::delete('comInfo');

        return to_route('setting.system',['success'=>'Success Update Your Informations']);
        
    

    }
}
