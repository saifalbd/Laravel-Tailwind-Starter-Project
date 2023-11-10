<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $name = 'Admin';
        $email = 'admin@domain.com';
        $password = Hash::make(123456);
        $email_verified_at = now()->toDateString();
        $avatar_id = 1;

        User::create(compact('name','email','password','email_verified_at','avatar_id'));
    }
}
