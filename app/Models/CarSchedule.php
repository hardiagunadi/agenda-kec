<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarSchedule extends Model
{
    use HasFactory, HasUlids;

    public $incrementing = false;
    public $timestamps = false;

    protected $keyType = 'string';

    protected $fillable = [
        'schedule',
        'car',
        'driver',
        'from',
        'customer',
        'phone',
        'organization',
        'is_reschedule',
    ];

    protected $casts = [
        'updated_at' => 'datetime',
        'start_at' => 'datetime',
        'end_at' => 'datetime',
    ];

    protected $attributes = [
        'car' => 'Belum Ditentukan',
        'driver' => 'Tanpa Pengemudi',
        'is_reschedule' => false,
    ];
}
