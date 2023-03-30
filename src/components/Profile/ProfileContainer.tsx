import { useAuth } from "../../contexts/AuthContext";
import { useAppDispatch } from "../../hooks";
import { clearUserData } from "../../store/userReducer";
import Profile from "./Profile";


const ProfileContainer = () => {
    const { currentUser, logOut } = useAuth();
    const dispatch = useAppDispatch();

    const leaveAccount = () => {
        if (logOut ) {
            dispatch(clearUserData);
            logOut();
        }
    }

    if (currentUser !== null && logOut !== null) {
        return <Profile currentUser={currentUser} logOut={leaveAccount} />
    }else {
        return <div>Loading...</div>
    }
    
}

export default ProfileContainer;