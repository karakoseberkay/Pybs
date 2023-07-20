import { Demo } from '../../types/types';

export const ProjectService = {

    getProjects() {
        return fetch('http://localhost:5284/api/project')
            .then((res) => res.json())
            .then((d) => d as Demo.Project[]);
    },

    deleteProject(id:any){
        return fetch('http://localhost:5284/api/project/'+id, {
            method: 'DELETE'
          })
             .catch((err) => {
                console.log(err.message);
             });
    },
    updateProject(project:Demo.Project){

        return fetch('http://localhost:5284/api/project/'+project.projectId, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project)
          });

    },
    postProject(project:Demo.Project) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project)
        };
       return fetch('http://localhost:5284/api/project', requestOptions)

    },
   
};
