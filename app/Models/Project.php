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
}
