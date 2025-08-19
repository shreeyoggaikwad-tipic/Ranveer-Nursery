<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    /**
     * Display a listing of projects (Public + Admin)
     */
    public function index(Request $request): JsonResponse
    {
        $query = Project::query();
        
        // Filter by status if provided
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        // Filter by type if provided
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }
        
        $projects = $query->latest()->get();
        
        return response()->json([
            'success' => true,
            'data' => $projects
        ]);
    }

    /**
     * Store a newly created project (Admin only)
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'type' => 'required|in:home,apartment,other',
            'status' => 'required|in:completed,in-progress',
            'description' => 'nullable|string',
            'budget' => 'nullable|numeric|min:0',
            'duration' => 'nullable|string|max:255',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $projectData = $request->except('images');
        
        // Handle image uploads
        if ($request->hasFile('images')) {
            $imagePaths = [];
            foreach ($request->file('images') as $image) {
                $path = $image->store('projects', 'public');
                $imagePaths[] = $path;
            }
            $projectData['images'] = $imagePaths;
        }

        $project = Project::create($projectData);

        return response()->json([
            'success' => true,
            'message' => 'Project created successfully',
            'data' => $project
        ], 201);
    }

    /**
     * Display the specified project (Public + Admin)
     */
    public function show(string $id): JsonResponse
    {
        $project = Project::find($id);
        
        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Project not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $project
        ]);
    }

    /**
     * Update the specified project (Admin only)
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $project = Project::find($id);
        
        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Project not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'location' => 'nullable|string|max:255',
            'type' => 'sometimes|required|in:home,apartment,other',
            'status' => 'sometimes|required|in:completed,in-progress',
            'description' => 'nullable|string',
            'budget' => 'nullable|numeric|min:0',
            'duration' => 'nullable|string|max:255',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $projectData = $request->except('images');
        
        // Handle new image uploads
        if ($request->hasFile('images')) {
            // Delete old images if needed
            if ($project->images) {
                foreach ($project->images as $oldImage) {
                    Storage::disk('public')->delete($oldImage);
                }
            }
            
            $imagePaths = [];
            foreach ($request->file('images') as $image) {
                $path = $image->store('projects', 'public');
                $imagePaths[] = $path;
            }
            $projectData['images'] = $imagePaths;
        }

        $project->update($projectData);

        return response()->json([
            'success' => true,
            'message' => 'Project updated successfully',
            'data' => $project
        ]);
    }

    /**
     * Remove the specified project (Admin only)
     */
    public function destroy(string $id): JsonResponse
    {
        $project = Project::find($id);
        
        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Project not found'
            ], 404);
        }

        // Delete associated images
        if ($project->images) {
            foreach ($project->images as $image) {
                Storage::disk('public')->delete($image);
            }
        }

        $project->delete();

        return response()->json([
            'success' => true,
            'message' => 'Project deleted successfully'
        ]);
    }
}