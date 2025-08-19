<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
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
            'icon' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $serviceData = $request->except('icon');
        
        // Handle icon upload
        if ($request->hasFile('icon')) {
            $iconPath = $request->file('icon')->store('services', 'public');
            $serviceData['icon'] = $iconPath;
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
            'icon' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $serviceData = $request->except('icon');
        
        // Handle new icon upload
        if ($request->hasFile('icon')) {
            // Delete old icon if exists
            if ($service->icon) {
                Storage::disk('public')->delete($service->icon);
            }
            
            $iconPath = $request->file('icon')->store('services', 'public');
            $serviceData['icon'] = $iconPath;
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

        $service->delete();

        return response()->json([
            'success' => true,
            'message' => 'Service deleted successfully'
        ]);
    }
}