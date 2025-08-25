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
            'type' => 'required|in:home,apartment',
            'status' => 'required|in:completed,in-progress',
            'description' => 'nullable|string',
            'budget' => 'nullable|numeric|min:0',
            'duration' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $projectData = $request->except('image');
        
        if ($request->hasFile('image')) {
    $path = $request->file('image')->store('projects', 'public');
    $projectData['image'] = $path;
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
        'type' => 'sometimes|required|in:home,apartment',
        'status' => 'sometimes|required|in:completed,in-progress',
        'description' => 'nullable|string',
        'budget' => 'nullable|numeric|min:0',
        'duration' => 'nullable|string|max:255',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'errors' => $validator->errors()
        ], 422);
    }

    $projectData = $request->except('image');

    // Handle new image upload
    if ($request->hasFile('image')) {
        // Delete old image if exists
        if ($project->image) {
            Storage::disk('public')->delete($project->image);
        }

        $path = $request->file('image')->store('projects', 'public');
        $projectData['image'] = $path;
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
        if ($project->image) {
    Storage::disk('public')->delete($project->image);
}

        $project->delete();

        return response()->json([
            'success' => true,
            'message' => 'Project deleted successfully'
        ]);
    }
}