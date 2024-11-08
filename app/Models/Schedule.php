<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory, HasUlids;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'type',
        'description',
        'from',
        'to',
        'note',
        'user',
        'place',
        'start_at',
        'end_at',
        'status',
    ];

    protected $casts = [
        'updated_at' => 'datetime',
        'start_at' => 'datetime',
        'end_at' => 'datetime',
    ];

    protected $attributes = [
        'status' => 1,
        'description' => '',
        'note' => '',
    ];
}
