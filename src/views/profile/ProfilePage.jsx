import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchUserProfile from "../../api/profile";
import prepareXPData, { getToken, bytesToMB } from "../../utils/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import ProfileHeader from "../../components/ProfileHeader";
import AuditRatioPieChart from "../../components/AuditRatioPieChart";
import XpProgressionLineGraph from "../../components/XpProgressionLineGraph";

export default function ProfilePage() {
  const navigate = useNavigate();

  // State for storing user data
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [audits, setAudits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user profile on mount
  useEffect(() => {
    async function loadUserProfile() {
      const token = getToken();
      if (!token) {
        // Redirect to login if no token
        navigate("/");
        return;
      }
      try {
        const userProfile = await fetchUserProfile(token);
        // Normalize user data from returned attrs and other fields
        const userData = {
          name: `${userProfile.user[0].attrs.firstName} ${userProfile.user[0].attrs.middleName} ${userProfile.user[0].attrs.lastName}`,
          email: userProfile.user[0].attrs.email,
          phone: userProfile.user[0].attrs.phone,
          auditRatio: userProfile.user[0].auditRatio.toFixed(2),
          login: userProfile.user[0].login,
          passFailRatio: userProfile.user,
        };
        setUser(userData);
        setTransactions(userProfile.transaction);
        setAudits(userProfile.audit);
      } catch (error) {
        console.error("Error fetching profile:", error);
        // On-error, redirect to login
        navigate("/");
      }
    }
    loadUserProfile();
    setIsLoading(false);
  }, [navigate]);

  const { points, totalXP } = prepareXPData(transactions, 500, 200);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
              <div
                className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-indigo-400 rounded-full animate-spin mx-auto"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "1.5s",
                }}
              ></div>
            </div>
            <p className="text-lg font-medium text-gray-700 animate-pulse">
              Loading your profile...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header with subtle pattern overlay */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        ></div>
        <div className="relative px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-2">
              01 Talent Developer Dashboard
            </h1>
            <p className="text-blue-100 text-lg">
              Track your module progress and achievements
            </p>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile header */}
          <div className="lg:col-span-4 transform hover:scale-[1.01] transition-all duration-300">
            <ProfileHeader user={user} />
          </div>

          {/* Audit Ratio Card */}
          <Card className="lg:col-span-2 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50/50 border-0 shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative pb-4">
              <CardTitle className="flex items-center gap-3 text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                Audit Ratio
              </CardTitle>
            </CardHeader>
            <CardContent className="relative text-center pb-8">
              <div className="space-y-4">
                <p className="text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                  {user.auditRatio}
                </p>
                <div className="space-y-2">
                  <p className="text-gray-600 font-medium">Performance Ratio</p>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${Math.min(
                          parseFloat(user.auditRatio) * 20,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Audits Done / Audits Received
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total XP Card */}
          <Card className="lg:col-span-2 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br from-white to-purple-50/50 border-0 shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative pb-4">
              <CardTitle className="flex items-center gap-3 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                Total XP
              </CardTitle>
            </CardHeader>
            <CardContent className="relative text-center pb-8">
              <div className="space-y-4">
                <p className="text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 bg-clip-text text-transparent tracking-tight">
                  {bytesToMB(totalXP)}
                  <span className="text-2xl font-semibold text-gray-400 ml-2">
                    MB
                  </span>
                </p>
                <div className="space-y-2">
                  <p className="text-gray-600 font-medium">Experience Points</p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            i < Math.min(Math.floor(totalXP / 10000), 5)
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-sm"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Cumulative Gained XP Points
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Projects Passed/Failed Chart */}
          <Card className="lg:col-span-2 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br from-white to-green-50/50 border-0 shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-3 text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                Projects Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="relative p-6">
              <div className="transform transition-all duration-500 group-hover:scale-105">
                <AuditRatioPieChart audits={audits} />
              </div>

              {/* Enhanced Legend */}
              <div className="flex justify-center items-center gap-6 mt-6">
                <div className="flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-full transition-all duration-300 hover:bg-blue-100">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-sm"></div>
                  <span className="text-sm font-medium text-blue-700">
                    Passed
                  </span>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-red-50 rounded-full transition-all duration-300 hover:bg-red-100">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-sm"></div>
                  <span className="text-sm font-medium text-red-700">
                    Failed
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* XP Progression Graph */}
          <Card className="lg:col-span-2 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br from-white to-indigo-50/50 border-0 shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative pb-4">
              <CardTitle className="flex items-center gap-3 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                XP Progression
              </CardTitle>
            </CardHeader>
            <CardContent className="relative p-6">
              <div className="transform transition-all duration-500 group-hover:scale-[1.02]">
                <XpProgressionLineGraph points={points} totalXP={totalXP} />
              </div>

              {/* Progress Indicator */}
              <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 font-medium">
                    Progress Trend
                  </span>
                  <div className="flex items-center gap-2 text-green-600">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 4.414 6.707 7.707a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-semibold">Trending Up</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 font-medium">Keep pushing forward! 🚀</p>
        </div>
      </div>
    </div>
  );
}
