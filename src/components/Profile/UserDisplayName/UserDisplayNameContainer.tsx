import { useEffect } from 'react';
import { User } from 'firebase/auth';
import { useState, ChangeEvent } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import UserDisplayName from './UserDisplayName';


type Props = {
    currentUser: User
}

const UserDisplayNameContainer = ({currentUser}: Props) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('');
    const { setName } = useAuth();

    useEffect(() => {
        if (currentUser.displayName) {
            setUserName(currentUser.displayName);
        }
    }, [currentUser.displayName])

    const updateUsername = () => {
        if (setName) {
            setName(userName);
            setEditMode(!editMode);
        }
    }

    const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    }

    const handleEditMode = () => {
        setEditMode(!editMode);
    }

    return <UserDisplayName currentUser={currentUser} 
                            editMode={editMode}
                            userName={userName}
                            handleUserName={handleUserName}
                            handleEditMode={handleEditMode}
                            updateUsername={updateUsername} />
}

export default UserDisplayNameContainer;