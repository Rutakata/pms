import { Link } from 'react-router-dom';


const UserType = () => {
    return <div>
        <Link to='/hotelregistration'>I'm hotel owner</Link>
        <br/>
        <Link to='/workersregistration'>I'm hotel worker</Link>
    </div>
}

export default UserType;