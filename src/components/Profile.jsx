import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user) return <div>Loading...</div>;

  // no need to handle array case
  return (
    <div>
      <EditProfile user={user} />
    </div>
  );
};

export default Profile;
