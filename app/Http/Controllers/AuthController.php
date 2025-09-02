<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    //  Login
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        // create token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user'    => $user,
            'token'   => $token,
        ]);
    }

    //  Logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    // 👤 Get logged-in user
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    // Forgot Password
    public function forgotPassword(Request $request) 
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json(['message' => __($status)], 200);
        }

        return response()->json(['error' => __($status)], 400);
    }

    // Reset Password
    public function resetPassword(Request $request) 
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string|min:8|confirmed', // password_confirmation required
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => __($status)], 200)
            : response()->json(['error' => __($status)], 400);
    }

    /**
     * Get admin profile data
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAdminProfile(Request $request)
    {
        try {
            // Check if the authenticated user is an admin
            $user = $request->user();
            
            if (!$user || !$user->is_admin) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized. Admin access required.'
                ], 403);
            }

            // Return admin profile data (exclude sensitive fields)
            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'number' => $user->number,
                    'years_of_experience' => $user->years_of_experience,
                    'location' => $user->location,
                    'about' => $user->about,
                    'business_hours' => $user->business_hours,
                    'happy_clients' => $user->happy_clients,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at,
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch admin profile',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update admin profile data
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateAdminProfile(Request $request)
    {
        try {
            // Check if the authenticated user is an admin
            $user = $request->user();
            
            if (!$user || !$user->is_admin) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized. Admin access required.'
                ], 403);
            }

            // Validate the request data
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255|min:2',
                'email' => [
                    'required',
                    'email',
                    'max:255',
                    Rule::unique('users')->ignore($user->id),
                ],
                'number' => 'required|string|max:20|min:10',
                'years_of_experience' => 'required|integer|min:0|max:50',
                'location' => 'required|string|max:255',
                'about' => 'required|string|max:1000',
                'business_hours' => 'required|string|max:255',
                'happy_clients' => 'required|integer|min:0',
            ]);

            // Return validation errors if any
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Update admin profile
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'number' => $request->number,
                'years_of_experience' => $request->years_of_experience,
                'location' => $request->location,
                'about' => $request->about,
                'business_hours' => $request->business_hours,
                'happy_clients' => $request->happy_clients,
                'updated_at' => now(),
            ]);

            // Return updated admin data
            return response()->json([
                'success' => true,
                'message' => 'Admin profile updated successfully',
                'data' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'number' => $user->number,
                    'years_of_experience' => $user->years_of_experience,
                    'location' => $user->location,
                    'about' => $user->about,
                    'business_hours' => $user->business_hours,
                    'happy_clients' => $user->happy_clients,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at,
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update admin profile',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}