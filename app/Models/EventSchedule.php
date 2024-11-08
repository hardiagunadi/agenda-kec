<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventSchedule extends Model
{
    use HasFactory, HasUlids;

    public $incrementing = false;
    public $timestamps = false;

    protected $keyType = 'string';

    protected $fillable = [
        'schedule',
        'customer',
        'phone',
        'organization',
        'participants',
        'is_reschedule',
    ];

    protected $casts = [
        'updated_at' => 'datetime',
        'start_at' => 'datetime',
        'end_at' => 'datetime',
    ];

    protected $attributes = [
        'participants' => 0,
        'is_reschedule' => false,
    ];
}
