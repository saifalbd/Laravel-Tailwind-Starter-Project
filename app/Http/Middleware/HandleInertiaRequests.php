<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Route;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'layout.admin';

    

    public function rootView(Request $request)
    {
        $prefix = $request->route()->getPrefix();
     
        
        if($request->routeIs(['login'])){
       
            return 'layout.entrance';
        }
        else if (Str::startsWith($prefix,['/admin','admin/','admin'])) {
            return 'layout.admin';
         }
        return parent::rootView($request);
    }


    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        if($user){
            $user->load('avatar');
        }
      
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
            'noImgUrl'=>asset('assets/img/no-image-available.jpg'),
            'currentRouteName'=> Route::currentRouteName(),
            'ziggy' => fn () => [
                // ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
