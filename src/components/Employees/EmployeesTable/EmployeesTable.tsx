import { Table } from "react-bootstrap";
import { Employee } from "../../../store/employeesReducer";
import EmployeesTableRow from "./EmployeesTableRow";


type Props = {
    employees: Employee[]
}

const EmployeesTable = ({ employees }: Props) => {
    return <Table striped bordered hover className="mt-4">
        <thead>
            <tr>
                <th>Name/Surname</th>
                <th>Email Address</th>
                <th>Role</th>
            </tr>
        </thead>
        <tbody>
            {
                employees.map(employee => <EmployeesTableRow employeeName='Test' 
                                                             employeeSurname="Surname" 
                                                             email={employee.email}
                                                             roles={employee.roles} />)
            }
        </tbody>
    </Table>
}

export default EmployeesTable;