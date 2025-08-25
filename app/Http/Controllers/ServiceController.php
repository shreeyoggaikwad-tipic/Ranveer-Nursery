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
     * Display all services
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
     * Store a new service
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'benefits' => 'nullable|string',
            'photos' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $serviceData = $request->except(['photos']);

        // Handle single photos upload
        if ($request->hasFile('photos')) {
            $serviceData['photos'] = $request->file('photos')->store('services', 'public');
        }

        $service = Service::create($serviceData);

        return response()->json([
            'success' => true,
            'message' => 'Service created successfully',
            'data' => $service
        ], 201);
    }

    /**
     * Show a specific service
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
     * Update a service
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
            'photos' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $serviceData = $request->except(['photos']);

        // Replace old photos if new one uploaded
        if ($request->hasFile('photos')) {
            if ($service->photos) {
                Storage::disk('public')->delete($service->photos);
            }
            $serviceData['photos'] = $request->file('photos')->store('services', 'public');
        }

        $service->update($serviceData);

        return response()->json([
            'success' => true,
            'message' => 'Service updated successfully',
            'data' => $service
        ]);
    }

    /**
     * Delete a service
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

        // Delete associated photos
        if ($service->photos) {
            Storage::disk('public')->delete($service->photos);
        }

        $service->delete();

        return response()->json([
            'success' => true,
            'message' => 'Service deleted successfully'
        ]);
    }
}
