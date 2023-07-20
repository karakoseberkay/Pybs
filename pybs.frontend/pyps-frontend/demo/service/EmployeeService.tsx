import { Demo } from '../../types/types';

export const EmployeeService = {

    getStudents() {
        return fetch('http://localhost:5284/api/employee')
            .then((res) => res.json())
            .then((d) => d as Demo.Student[]);
    },

    deleteStudent(id:any){
        return fetch('http://localhost:5284/api/employee/'+id, {
            method: 'DELETE'
          })
             .catch((err) => {
                console.log(err.message);
             });
    },

    updateStudent(student:Demo.Student){

        return fetch('http://localhost:5284/api/employee/'+student.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student)
          });

    },

    postStudent(student:Demo.Student) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student)
        };
       return fetch('http://localhost:5284/api/employee', requestOptions)

    },
};
