<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OfficialSchedule extends Model
{
    use HasFactory, HasUlids;

    public $incrementing = false;
    public $timestamps = false;

    protected $keyType = 'string';

    protected $fillable = [
        'schedule',
        'official',
        'is_formal',
        'delegation',
    ];

    protected $casts = [
        'updated_at' => 'datetime',
        'start_at' => 'datetime',
        'time' => 'datetime',
    ];

    protected $attributes = [
        'is_formal' => true,
    ];
}
