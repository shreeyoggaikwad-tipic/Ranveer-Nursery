<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ServiceController extends Controller
{
    /**
     * Display a listing of services (Public + Admin)
     */
    public function index(): JsonResponse
    {
        $services = Service::latest()->get();
        
        return response()->json([
            'success' => true,
            'data' => $services
        ]);
    }

    /**
     * Store a newly created service (Admin only)
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'benefits' => 'nullable|string',
            'photos' => 'nullable',
            'photos.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'icon' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $serviceData = $request->except(['photos']);

        // Handle photos upload (multiple)
        if ($request->hasFile('photos')) {
            $photoPaths = [];
            foreach ($request->file('photos') as $photo) {
                $photoPaths[] = $photo->store('services/photos', 'public');
            }
            $serviceData['photos'] = json_encode($photoPaths);
        }

        $service = Service::create($serviceData);

        return response()->json([
            'success' => true,
            'message' => 'Service created successfully',
            'data' => $service
        ], 201);
    }

    /**
     * Display the specified service (Public + Admin)
     */
    public function show(string $id): JsonResponse
    {
        $service = Service::find($id);
        
        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Service not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $service
        ]);
    }

    /**
     * Update the specified service (Admin only)
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $service = Service::find($id);
        
        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Service not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'benefits' => 'nullable|string',
            'photos' => 'nullable|array',
            'photos.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'icon' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $serviceData = $request->except(['photos']);

        // Handle new photos upload
        if ($request->hasFile('photos')) {
            // Delete old photos
            if ($service->photos) {
                foreach (json_decode($service->photos, true) as $oldPhoto) {
                    Storage::disk('public')->delete($oldPhoto);
                }
            }

            $photoPaths = [];
            foreach ($request->file('photos') as $photo) {
                $photoPaths[] = $photo->store('services/photos', 'public');
            }
            $serviceData['photos'] = json_encode($photoPaths);
        }

        $service->update($serviceData);

        return response()->json([
            'success' => true,
            'message' => 'Service updated successfully',
            'data' => $service
        ]);
    }

    /**
     * Remove the specified service (Admin only)
     */
    public function destroy(string $id): JsonResponse
{
    $service = Service::find($id);
    
    if (!$service) {
        return response()->json([
            'success' => false,
            'message' => 'Service not found'
        ], 404);
    }

    // Delete associated icon
    if ($service->icon) {
        Storage::disk('public')->delete($service->icon);
    }

    // Delete associated photos
    if ($service->photos && is_array($service->photos)) {
        foreach ($service->photos as $photo) {
            Storage::disk('public')->delete($photo);
        }
    }

    $service->delete();

    return response()->json([
        'success' => true,
        'message' => 'Service deleted successfully'
    ]);
}

}
