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
    public function index1(): JsonResponse
{
    $inquiries = Inquiry::where('company_id', 1)
                        ->latest()
                        ->get();

    return response()->json([
        'success' => true,
        'data' => $inquiries
    ]);
}


    public function index2(): JsonResponse
{
    $inquiries = Inquiry::where('company_id', 2)
                        ->latest()
                        ->get();

    return response()->json([
        'success' => true,
        'data' => $inquiries
    ]);
}


public function index3(): JsonResponse
{
    $inquiries = Inquiry::where('company_id', 3)
                        ->latest()
                        ->get();

    return response()->json([
        'success' => true,
        'data' => $inquiries
    ]);
}


    /**
     * Store a newly created inquiry (Public - Contact Form Submission)
     */
    public function store1(Request $request): JsonResponse
{
    // Always set company_id to 1
    $request->merge(['company_id' => 1]);
 
    $validator = Validator::make($request->all(), [
        'name'        => 'required|string|max:255',
        'email'       => 'nullable|email|max:255',
        'phone'       => 'nullable|string|max:20',
        'message'     => 'required|string|max:5000',
        'company_id'  => 'required|integer'
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

public function store2(Request $request): JsonResponse
{
    // Always set company_id to 1
    $request->merge(['company_id' => 2]);
 
    $validator = Validator::make($request->all(), [
        'name'        => 'required|string|max:255',
        'email'       => 'nullable|email|max:255',
        'phone'       => 'nullable|string|max:20',
        'message'     => 'required|string|max:5000',
        'company_id'  => 'required|integer'
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

public function store3(Request $request): JsonResponse
{
    // Always set company_id to 1
    $request->merge(['company_id' => 3]);
 
    $validator = Validator::make($request->all(), [
        'name'        => 'required|string|max:255',
        'email'       => 'nullable|email|max:255',
        'phone'       => 'nullable|string|max:20',
        'message'     => 'required|string|max:5000',
        'company_id'  => 'required|integer'
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
public function export()
{
    $inquiries = \App\Models\Inquiry::all();

    $csvData = "Name,Email,Phone,Message\n";
    foreach ($inquiries as $inq) {
        $csvData .= "\"{$inq->name}\",\"{$inq->email}\",\"{$inq->phone}\",\"{$inq->message}\"\n";
    }

    return response($csvData)
        ->header('Content-Type', 'text/csv')
        ->header('Content-Disposition', 'attachment; filename="inquiries.csv"');
}

public function toggleRequestServed($id)
{
    $inquiry = Inquiry::findOrFail($id);
    $inquiry->request_served = !$inquiry->request_served;
    $inquiry->save();

    return response()->json([
        'success' => true,
        'request_served' => $inquiry->request_served
    ]);
}



}