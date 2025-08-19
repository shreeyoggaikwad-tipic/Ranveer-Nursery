<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class TestimonialController extends Controller
{
    /**
     * Display a listing of testimonials (Public + Admin)
     */
    public function index(): JsonResponse
    {
        $testimonials = Testimonial::latest()->get();
        
        return response()->json([
            'success' => true,
            'data' => $testimonials
        ]);
    }

    /**
     * Store a newly created testimonial (Admin only)
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'feedback' => 'required|string',
            'rating' => 'nullable|integer|min:1|max:5',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $testimonialData = $request->except('photo');
        
        // Set default rating if not provided
        if (!isset($testimonialData['rating'])) {
            $testimonialData['rating'] = 5;
        }
        
        // Handle photo upload
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('testimonials', 'public');
            $testimonialData['photo'] = $photoPath;
        }

        $testimonial = Testimonial::create($testimonialData);

        return response()->json([
            'success' => true,
            'message' => 'Testimonial created successfully',
            'data' => $testimonial
        ], 201);
    }

    /**
     * Display the specified testimonial (Public + Admin)
     */
    public function show(string $id): JsonResponse
    {
        $testimonial = Testimonial::find($id);
        
        if (!$testimonial) {
            return response()->json([
                'success' => false,
                'message' => 'Testimonial not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $testimonial
        ]);
    }

    /**
     * Update the specified testimonial (Admin only)
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $testimonial = Testimonial::find($id);
        
        if (!$testimonial) {
            return response()->json([
                'success' => false,
                'message' => 'Testimonial not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'feedback' => 'sometimes|required|string',
            'rating' => 'nullable|integer|min:1|max:5',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $testimonialData = $request->except('photo');
        
        // Handle new photo upload
        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($testimonial->photo) {
                Storage::disk('public')->delete($testimonial->photo);
            }
            
            $photoPath = $request->file('photo')->store('testimonials', 'public');
            $testimonialData['photo'] = $photoPath;
        }

        $testimonial->update($testimonialData);

        return response()->json([
            'success' => true,
            'message' => 'Testimonial updated successfully',
            'data' => $testimonial
        ]);
    }

    /**
     * Remove the specified testimonial (Admin only)
     */
    public function destroy(string $id): JsonResponse
    {
        $testimonial = Testimonial::find($id);
        
        if (!$testimonial) {
            return response()->json([
                'success' => false,
                'message' => 'Testimonial not found'
            ], 404);
        }

        // Delete associated photo
        if ($testimonial->photo) {
            Storage::disk('public')->delete($testimonial->photo);
        }

        $testimonial->delete();

        return response()->json([
            'success' => true,
            'message' => 'Testimonial deleted successfully'
        ]);
    }
}