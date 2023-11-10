<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Tightenco\Ziggy\Ziggy;

class UtilityController extends Controller
{

    public function ziggy(){
        return (new Ziggy());
    }
    
    public function clearCaches()
    {
        /**
         * remove chche
         */
        Artisan::call('cache:clear');
        Artisan::call('route:clear');
        Artisan::call('config:clear');
        Artisan::call('view:clear');

        

        /*add Cache*/

        if(config('app.app_online')){
            Artisan::call('config:cache');
            Artisan::call('route:cache');
            Artisan::call('view:cache');
        }
       


        return redirect()->back();
    }

}
