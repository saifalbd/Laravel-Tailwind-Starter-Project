<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('attachment_categories', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('ratio')->default(1);
           
            $table->timestamps();
        });

        Schema::create('attachments', function (Blueprint $table) {
            $table->id();
            $table->string('disk');
            $table->string('path');
            $table->boolean('is_default')->default(0);
            $table->foreignId('category_id')->constrained('attachment_categories');
            $table->timestamps();
        });


        Schema::create('company_infos', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('tagline');
            $table->string('address');
            $table->string('mobile');
            $table->string('email');
            $table->foreignId('logo_id');
            $table->string('facebook')->nullable();
            $table->string('twitter')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('instagram')->nullable();
            $table->timestamps();
        });

        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->foreignId('avatar_id')->default(1);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_infos');
        Schema::dropIfExists('users');
        Schema::dropIfExists('attachments');
        Schema::dropIfExists('attachment_categories');
    }
};
