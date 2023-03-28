import { useAuth } from "../../contexts/AuthContext";
import Profile from "./Profile";


const ProfileContainer = () => {
    const { currentUser, logOut } = useAuth();

    if (currentUser !== null && logOut !== null) {
        return <Profile currentUser={currentUser} logOut={logOut} />
    }else {
        return <div>Loading...</div>
    }
    
}

export default ProfileContainer;