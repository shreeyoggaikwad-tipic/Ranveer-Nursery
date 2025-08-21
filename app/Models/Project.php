<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $table = 'projects';

    protected $fillable = [
        'name',
        'location',
        'type',
        'status',
        'description',
        'images',
        'budget',
        'duration',
    ];

    protected $casts = [
        'images' => 'array',
    ];

    // 👇 This will add "image_urls" field automatically
    protected $appends = ['image_urls'];

    public function getImageUrlsAttribute()
    {
        if (!$this->images) {
            return [];
        }

        return collect($this->images)->map(function ($path) {
            return asset('storage/' . $path);
        })->toArray();
    }
}
