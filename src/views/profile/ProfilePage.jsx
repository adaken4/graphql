import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { signOut } from "../../api/auth";
import fetchUserProfile from "../../api/profile";
import { getToken, bytesToMB } from "../../utils/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";

export default function ProfilePage() {
  const navigate = useNavigate();

  // State for storing user data
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);

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
        };
        setUser(userData);
        setTransactions(userProfile.transaction);
      } catch (error) {
        console.error("Error fetching profile:", error);
        // On-error, redirect to login
        navigate("/");
      }
    }
    loadUserProfile();
  }, [navigate]);

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  const { points, totalXP } = prepareXPData(transactions, 500, 200);

  if (!user)
    return (
      <div className="flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );

  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-gray-200">
      {/* Profile header */}
      <div className="col-span-4 mb-8">
        <div className="flex items-center space-x-6 p-6 rounded-xl bg-white shadow-md">
          <div className="relative">
            <img
              src=""
              alt={user.login}
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg bg-gray-300"
            />
            {/* Optional: Add an online status indicator */}
            <span className="absolute bottom-1 right-1 block h-4 w-4 rounded-full ring-2 ring-white bg-green-500"></span>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {user.name}
            </h2>
            <p className="text-lg text-gray-600 mt-1">{user.email}</p>
            <p className="text-sm text-gray-500 mt-1">{user.phone}</p>
          </div>
          <Button
            className="bg-red-500 hover:bg-red-600 transition-colors duration-200"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      </div>

      <Card className="col-span-2 bg-white rounded-xl shadow-md p-6 transition-transform hover:scale-[1.02] text-center">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-xl font-semibold text-gray-800">
            Audit Ratio
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-5xl font-extrabold text-blue-600">
            {user.auditRatio}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Total Audits Done / Total Audits Received
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-2 bg-white rounded-xl shadow-md p-6 transition-transform hover:scale-[1.02] text-center">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-xl font-semibold text-gray-800">
            Total XP
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-5xl font-extrabold text-blue-600">
            {bytesToMB(totalXP)} MB
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Cumulative Gained XP Points
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-2 bg-white rounded-xl shadow-md p-6 transition-transform hover:scale-[1.02]">
        <CardHeader>
          <CardTitle>Projects Pass/Fail</CardTitle>
        </CardHeader>
        <CardContent className="p-4">Placeholder</CardContent>
      </Card>

      <Card className="col-span-2 bg-white rounded-xl shadow-md p-6 transition-transform hover:scale-[1.02]">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-xl font-semibold text-gray-800">
            XP Progression
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <p className="mb-4 font-semibold text-gray-800">
            Total XP:{" "}
            <span className="text-blue-600">{bytesToMB(totalXP)} MB</span>
          </p>
          <svg viewBox="0 0 500 200" className="w-full h-40">
            <line
              x1={0}
              y1={200}
              x2={500}
              y2={200}
              stroke="#333"
              strokeWidth={1}
            />
            <line x1={0} y1={0} x2={0} y2={200} stroke="#333" strokeWidth={1} />
            <text x={250} y={195} fill="#666" fontSize={12} textAnchor="middle">
              Created At (Time)
            </text>
            <text
              x={-100}
              y={15}
              fill="#666"
              fontSize={12}
              textAnchor="middle"
              transform="rotate(-90)"
            >
              Cumulative Amount
            </text>
            <polyline
              fill="none"
              stroke="#4299e1" /* Updated color */
              strokeWidth="4" /* Thicker line */
              strokeLinecap="round" /* Rounded line ends */
              strokeLinejoin="round" /* Rounded line corners */
              points={points.map(([x, y]) => `${x},${y}`).join(" ")}
            />
          </svg>
        </CardContent>
      </Card>
    </div>
  );
}

function prepareXPData(transactions, width, height) {
  if (!transactions || transactions.length === 0) {
    return { points: [], totalXP: 0 };
  }
  // sort by date
  const sorted = [...transactions].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  let cumulative = 0;
  const withCumulative = sorted.map((t) => {
    cumulative += t.amount;
    return { ...t, cumulative };
  });

  const totalXP = withCumulative.length
    ? withCumulative[withCumulative.length - 1].cumulative
    : 0;

  const maxXP = totalXP;
  const minDate = new Date(withCumulative[0].createdAt);
  const maxDate = new Date(withCumulative[withCumulative.length - 1].createdAt);

  const points = withCumulative.map((t) => {
    const x =
      ((new Date(t.createdAt) - minDate) / (maxDate - minDate || 1)) * width;
    const y = height - (t.cumulative / maxXP) * height;
    return [x, y];
  });

  return { points, totalXP };
}
