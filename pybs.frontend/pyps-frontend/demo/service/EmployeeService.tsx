import { Demo } from '../../types/types';

export const EmployeeService = {

    getEmployies() {
        return fetch('http://localhost:5284/api/employee')
            .then((res) => res.json())
            .then((d) => d as Demo.Employee[]);
    },

    getEmployeeById(id:any) {
        return fetch('http://localhost:5284/api/employee/'+id)
            .then((res) => res.json())
            .then((d) => d as Demo.Employee);
    },

    deleteEmployee(id:any){
        return fetch('http://localhost:5284/api/employee/'+id, {
            method: 'DELETE'
          })
             .catch((err) => {
                console.log(err.message);
             });
    },

    updateEmployee(employee:Demo.Employee){

        return fetch('http://localhost:5284/api/employee/'+employee.employeeId, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employee)
          });

    },

    postEmployee(employee:Demo.Employee) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employee)
        };
       return fetch('http://localhost:5284/api/employee', requestOptions)

    },
};
