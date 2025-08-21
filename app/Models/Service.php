<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $table = 'services';

    protected $fillable = [
        'title',
        'description',
        'benefits',
        'photos'
    ];

    protected $casts = [
        'photos' => 'array',
    ];

    protected $appends = ['photos_urls'];

    public function getPhotosUrlsAttribute()
{
    if (!$this->photos) {
        return [];
    }

    $photosArray = is_array($this->photos) ? $this->photos : json_decode($this->photos, true);

    if (!$photosArray) return [];

    return collect($photosArray)->map(function ($path) {
        return asset('storage/' . $path);
    })->toArray();
}

}
