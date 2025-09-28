import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { signIn } from "../../api/auth";
import {
  Eye,
  EyeOff,
  User,
  Lock,
  LogIn,
  Sparkles,
  GraduationCap,
} from "lucide-react";

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setErrors({});

      await signIn(data.email, data.password);

      navigate("/profile");
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Floating Elements */}
        <div
          className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-32 right-32 w-3 h-3 bg-purple-400 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-32 w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-12 pb-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-xl">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-2">
            Zone01 Kisumu
          </h1>
          <p className="text-gray-600 text-lg">
            Welcome back to your learning journey
          </p>
        </div>
      </div>
      <div className="relative z-10 flex items-center justify-center px-4 pb-12">
        <Card className="w-full max-w-md">
          {/* Main Sign-in Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            <CardHeader className="text-center p-8 pb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl mb-4 shadow-lg">
                <LogIn className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Sign In
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Access your apprentice dashboard
              </p>
            </CardHeader>

            <CardContent className="p-8 pt-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(formData);
                }}
                className="space-y-6"
              >
                {/* Email Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-blue-500" />
                    Username or Email
                  </label>
                  <div className="relative group">
                    <Input
                      id="email"
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your username or email"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4 text-blue-500" />
                    Password
                  </label>
                  <div className="relative group">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Enter your password"
                      className={errors.password ? "border-red-500" : ""}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-center text-sm text-red-600 flex items-center justify-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      {errors.submit}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
                  disabled={isSubmitting}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Signing In...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Sign In
                      </>
                    )}
                  </div>
                </Button>

                {/* Sign Up Link */}
                <div className="text-center pt-4 border-t border-gray-100">
                  <p className="text-gray-600 text-sm">
                    Don't have an account?{" "}
                    <a
                      href="https://www.zone01kisumu.ke/how-to-apply"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline inline-flex items-center gap-1"
                    >
                      Apply Now
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </p>
                </div>
              </form>
            </CardContent>
          </div>
          {/* Additional Info Card */}
          <div className="mt-6 p-6 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-xl">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800">Secure Access</h3>
              <p className="text-sm text-gray-600">Your data is protected with enterprise-grade security</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
