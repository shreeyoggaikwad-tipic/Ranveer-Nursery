<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class InquiryController extends Controller
{
    /**
     * Display a listing of inquiries (Admin only)
     */
    public function index(): JsonResponse
    {
        $inquiries = Inquiry::latest()->get();
        
        return response()->json([
            'success' => true,
            'data' => $inquiries
        ]);
    }

    /**
     * Store a newly created inquiry (Public - Contact Form Submission)
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string|max:5000'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Ensure at least email or phone is provided
        if (!$request->email && !$request->phone) {
            return response()->json([
                'success' => false,
                'message' => 'Please provide either email or phone number for contact.'
            ], 422);
        }

        $inquiry = Inquiry::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Thank you for your inquiry! We will contact you soon.',
            'data' => $inquiry
        ], 201);
    }

    /**
     * Display the specified inquiry (Admin only)
     */
    public function show(string $id): JsonResponse
    {
        $inquiry = Inquiry::find($id);
        
        if (!$inquiry) {
            return response()->json([
                'success' => false,
                'message' => 'Inquiry not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $inquiry
        ]);
    }

    /**
     * Remove the specified inquiry (Admin only)
     */
    public function destroy(string $id): JsonResponse
    {
        $inquiry = Inquiry::find($id);
        
        if (!$inquiry) {
            return response()->json([
                'success' => false,
                'message' => 'Inquiry not found'
            ], 404);
        }

        $inquiry->delete();

        return response()->json([
            'success' => true,
            'message' => 'Inquiry deleted successfully'
        ]);
    }

    /**
     * Export inquiries to CSV (Admin only)
     */
    public function export(): \Symfony\Component\HttpFoundation\StreamedResponse
{
    $inquiries = Inquiry::latest()->get();

    $filename = 'inquiries_' . date('Y-m-d_H-i-s') . '.csv';

    $headers = [
        "Content-type" => "text/csv",
        "Content-Disposition" => "attachment; filename=$filename",
        "Pragma" => "no-cache",
        "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
        "Expires" => "0"
    ];

    $callback = function() use ($inquiries) {
        $handle = fopen('php://output', 'w');
        fputcsv($handle, ['ID', 'Name', 'Email', 'Phone', 'Message', 'Submitted At']);

        foreach ($inquiries as $inquiry) {
            fputcsv($handle, [
                $inquiry->id,
                $inquiry->name,
                $inquiry->email ?? 'N/A',
                $inquiry->phone ?? 'N/A',
                $inquiry->message,
                $inquiry->created_at->format('Y-m-d H:i:s')
            ]);
        }
        fclose($handle);
    };

    return response()->stream($callback, 200, $headers);
}

}