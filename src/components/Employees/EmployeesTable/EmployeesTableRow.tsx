type Props = {
    employeeName: string,
    employeeSurname: string,
    email: string,
    roles: {[key: string]: boolean}
}


const EmployeesTableRow = ({employeeName, employeeSurname, email, roles}: Props) => {
    const getRole = () => {
        if (roles.owner === true) {
            return 'owner';
        }else {
            return Object.keys(roles).find(role => roles[role]);
        }
    }

    const role = getRole()

    return <tr>
        <th>{employeeName} {employeeSurname}</th>
        <th>{email}</th>
        <th>{role}</th>
    </tr>
}

export default EmployeesTableRow;