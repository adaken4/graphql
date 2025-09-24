import { Button } from "./ui/button";
import { signOut } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function ProfileHeader({ user }) {
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut();
    navigate("/");
  };
  return (
    <div className="col-span-4 mb-1">
      <div className="flex items-center space-x-6 p-6 rounded-xl bg-white shadow-md">
        <div className="relative">
          <img
            src="src/assets/profile.jpg"
            alt={user.login}
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg bg-gray-300"
          />
          <span className="absolute bottom-1 right-1 block h-4 w-4 rounded-full ring-2 ring-white bg-green-500"></span>
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-extrabold text-gray-900">{user.name}</h2>
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
  );
}
