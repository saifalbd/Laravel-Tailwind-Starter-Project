<?php

namespace Database\Seeders;

use App\Models\Attachment;
use App\Models\AttachmentCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AttachSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = ['User',"Logo"];
        foreach ($categories as $title) {
         AttachmentCategory::create(compact('title'));
        }

        $path = 'avatar.png';
        $disk = 'default';
        $category_id = 1;
        $is_default = 1;

        Attachment::create(compact('path','disk','category_id','is_default'));
    }
}
