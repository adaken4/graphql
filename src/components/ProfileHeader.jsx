import { Button } from "./ui/button";
import { signOut } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { LogOut, Mail, Phone, User, Shield, Calendar } from "lucide-react";

export default function ProfileHeader({ user }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <div className="col-span-4 mb-1">
      {/* Main Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 shadow-2xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* Decorative Shapes */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />

        {/* <div className="flex items-center space-x-6 p-6 rounded-xl bg-white shadow-md"> */}
        {/* Content */}
        <div className="relative flex items-center justify-between p-8">
          {/* Left Section - Profile Info */}
          <div className="flex items-center space-x-8">
            {/* Avatar Section */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm">
                  <img
                    src="src/assets/profile.jpg"
                    alt={user.login}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {/* <span className="absolute bottom-1 right-1 block h-4 w-4 rounded-full ring-2 ring-white bg-green-500"></span> */}
                {/* Status Indicator */}
                <div className="absolute -bottom-1 -right-1 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* User Information */}
            <div className="space-y-3">
              <div>
                <h2 className="text-4xl font-bold text-white mb-1 tracking-tight">
                  {user.name}
                </h2>
                <div className="flex items-center gap-2 text-blue-100">
                  <User className="w-4 h-4" />
                  <span className="text-lg font-medium">@{user.login}</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col gap-2 text-blue-100">
                <div className="flex items-center gap-3 group cursor-pointer">
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-tranform" />
                  <span className="text-sm hover:text-white transition-colors">
                    {user.email}
                  </span>
                </div>
                <div className="flex items-center gap-3 group cursor-pointer">
                  <Phone className="w-4 h-4 group-hover:scale-110 transition-tranform" />
                  <span className="text-sm hover:text-white transition-colors">
                    {user.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-4">
            {/* Quick Stats */}
            <div className="hidden md:flex items-center gap-6 mr-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {user.auditRatio}
                </div>
                <div className="text-xs text-blue-200 uppercase tracking-wider">
                  Audit Ratio
                </div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="flex items-center gap-1 text-white">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">Active</span>
                </div>
                <div className="text-xs text-blue-200 uppercase tracking-wider">
                  Status
                </div>
              </div>
            </div>

            {/* Sign Out Button */}
            <Button
              onClick={handleSignOut}
              className="group relative overflow-hidden bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-white/50 text-white font-semibold px-6 py-3 rounded-xl backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-2">
                <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                Sign Out
              </div>
            </Button>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-blue-100">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Last login: Today, 2:30 PM</span>
              </div>
              <div className="text-sm text-blue-200">
                Account created: Jan 2024
              </div>
            </div>
            
            {/* Achievement Badges */}
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-yellow-400/20 text-yellow-200 text-xs font-medium rounded-full border border-yellow-400/30">
                🏆 Top Performer
              </div>
              <div className="px-3 py-1 bg-green-400/20 text-green-200 text-xs font-medium rounded-full border border-green-400/30">
                ✅ Verified
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
