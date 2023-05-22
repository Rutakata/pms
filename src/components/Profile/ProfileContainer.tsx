import { useState, ChangeEvent } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useAppDispatch } from "../../hooks";
import { clearUserData } from "../../store/userReducer";
import Profile from "./Profile";
import { clearHotelData } from "../../store/hotelReducer";


const ProfileContainer = () => {
    const { currentUser, logOut } = useAuth();
    const dispatch = useAppDispatch();

    const handleLogOut = () => {
        if (logOut) {
            dispatch(clearUserData());
            dispatch(clearHotelData());
            logOut();
        }
    }

    if (currentUser !== null && logOut !== null) {
        return <Profile currentUser={currentUser} 
                        handleLogOut={handleLogOut} />
    }else {
        return <div>Loading...</div>
    }
    
}

export default ProfileContainer;