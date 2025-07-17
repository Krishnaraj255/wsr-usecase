import { Employee as DataEmployee } from "../../data/employee/employee"

const get = async () => {
    const employeeObject = await DataEmployee.get();
    const employeeList = employeeObject.flatMap(name => name.employeeNames);
    return employeeList
}


export const Employee = {
    get 
} 