<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Facades\File;

class CompressPlants extends Command
{
    protected $signature = 'plants:compress';
    protected $description = 'Compress and resize all plant images';

    public function handle()
    {
        $inputDir = public_path('plants');
        $outputDir = public_path('compressed');

        if (!File::exists($outputDir)) {
            File::makeDirectory($outputDir, 0755, true);
        }

        $files = File::files($inputDir);

        foreach ($files as $file) {
            $img = Image::make($file->getPathname())
                ->resize(500, null, function ($constraint) {
                    $constraint->aspectRatio();
                })
                ->encode('jpg', 70);

            $filename = pathinfo($file->getFilename(), PATHINFO_FILENAME) . '.jpg';
            $img->save($outputDir . '/' . $filename);

            $this->info("✅ Compressed: " . $filename);
        }

        $this->info("🎉 All plant images compressed successfully!");
    }
}
