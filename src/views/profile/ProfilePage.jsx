import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { signOut } from "../../api/auth";

export default function ProfilePage() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-green-50/30 p-4">
      <p className="m-4">Profile Page</p>
      <Button className="bg-red-500 hover:bg-red-600 m4" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
}
