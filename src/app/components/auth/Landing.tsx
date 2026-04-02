import { Link } from "react-router";
import { Sparkles, Shield, Package } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Logo & Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl mb-4 shadow-lg">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Laundry Management System
          </h1>
          <p className="text-lg text-gray-600">
            Complete solution for managing your laundry business
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Order Management</h3>
            <p className="text-sm text-gray-600">Track and manage all orders in one place</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Real-time Tracking</h3>
            <p className="text-sm text-gray-600">Keep customers updated on order status</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Secure & Reliable</h3>
            <p className="text-sm text-gray-600">Your data is safe and protected</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">Get Started</h2>
          <p className="text-gray-600 text-center mb-8">Choose how you'd like to continue</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Link
              to="/login"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all font-semibold text-center"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg transition-all font-semibold text-center"
            >
              Create Account
            </Link>
          </div>

          <p className="text-center text-sm text-gray-500">
            New to the platform? Create an account to get started
          </p>
        </div>
      </div>
    </div>
  );
}
