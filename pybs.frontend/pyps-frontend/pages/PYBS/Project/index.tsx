import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ProjectService } from '../../../demo/service/ProjectService';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Demo } from '../../../types/types';
import { DepartmentService } from '../../../demo/service/DepartmentService';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

const ProjectsPage = () => {
    const [projects, setProjects] = useState<Demo.Project[]>([]);
    
    const [ projectIdToDelete, setProjectIdToDelete] = useState<number>();
    const [projectToPost, setProjectToPost] = useState<Demo.Project>();
    const [departments, setDepartments] = useState<Demo.Department[]>([]);
    const [displayBasicPost, setDisplayPost] = useState(false);
    const [projectToUpdate, setProjectToUpdate] = useState<Demo.Project>();
    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayBasicUpdate, setDisplayUpdate] = useState(false);
    const [filters1, setFilters1] = useState<DataTableFilterMeta>({});
    const [loading1, setLoading1] = useState(true);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const PostDialogFooter = <Button type="button" label="OK" onClick={() => postProject()} icon="pi pi-check" severity="secondary" />;
    const UpdateDialogFooter = <Button type="button" label="OK" onClick={() => updateProject() } icon="pi pi-check" severity="secondary" />;
    const confirmationDialogFooter = (
        <>
            <Button type="button" label="Hayır" icon="pi pi-times" onClick={() => setDisplayConfirmation(false)} text />
            <Button type="button" label="Evet" icon="pi pi-check" onClick={deleteProject} text autoFocus />
        </>
    );
const [displayConfirmation, setDisplayConfirmation] = useState(false);
    const clearFilter1 = () => {
        initFilters1();
    };


    const employeeOptions = departments.map((emp) => ({
        label: emp.departmentName,
        value: emp.departmentId,
      }));


function updateProject()
    {
        ProjectService.updateProject(projectToUpdate!);
        
        setDisplayUpdate(false);
    }

    const onGlobalFilterChange1: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        (_filters1['global'] as any).value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    };

    function postProject(){

        console.log(projectToPost)
        
        ProjectService.postProject(projectToPost!).then(RefreshData);
        setDisplayPost(false); 
         
    
      }
    

    function handleDeleteClick(projectToDelete:any){

        setProjectIdToDelete(projectToDelete);
        setDisplayConfirmation(true);
    }

    

    
    function handlePostClick(){
        var projectToPost : Demo.Project = {
        projectId: 0,
        projectName: "",
        departmentId: 0,
        projectDate: ""
        };

         setProjectToPost(projectToPost);
         setDisplayPost(true);
    }

    


    function postProjectValue(changeAction:any){
        setProjectToPost({
            ...projectToPost!, // Copy the old fields
            [changeAction.target.id] : changeAction.target.value
            
          });
    }
    
   

    
    function handleUpdateClick(project:Demo.Project){

        setProjectToUpdate(project);

        setDisplayUpdate(true);
    }

    function updateProjectValue(changeAction:any){
        setProjectToUpdate({
            ...projectToUpdate!, // Copy the old fields
            [changeAction.target.id]: changeAction.target.value
          });
    }

    const updateActionBodyTemplate = (projectRow:Demo.Project) => {
        return <Button style={{margin :'1px'}} type="button" label="Güncelle" icon="pi pi-external-link" onClick={() => handleUpdateClick(projectRow)}/>  
    }

    
    const deleteActionBodyTemplate = (row:Demo.Project) => {
        return <Button style={{margin :'1px'}} label="Sil" icon="pi pi-trash" severity="danger" onClick={() => handleDeleteClick(row.projectId) } />;
    }

    function deleteProject()
    {
        ProjectService.deleteProject(projectIdToDelete).then(RefreshData);
        setDisplayConfirmation(false);
        
        
    }
    
    
    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between">
            
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Departman ara" />
            </span>
            
           

            <Dialog header="Confirmation" visible={displayConfirmation} onHide={() => deleteProject} style={{ width: '350px' }} modal footer={confirmationDialogFooter}>
            <div className="flex align-items-center justify-content-center">
            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
            <span>Silmek istediğinize emin misiniz?</span>
            </div>
            </Dialog>


            
                        
            <Dialog header="Veri EKleme Sihirbazı" visible={displayBasicPost} style={{ width: '17vw' , height: '25vw'}} modal footer={PostDialogFooter} onHide={() => setDisplayPost(false)}>
                          
                
                          <div className="card">
                              <h5>Proje</h5>
                                 <div className="formgroup-inline">
                                     <div className="field">
                                          <label htmlFor="projectName" className="p-sr-only">
                                              projectName
                                          </label>
                                          <InputText id="projectName" value={projectToPost?.projectName} onChange={(e) => { postProjectValue(e); }} type="text" placeholder="Proje Adı" />
                                      </div>
                                     
                              
                                 </div>
                                 <div className="field">
                                  <label htmlFor="departmentId" className="p-sr-only">
                                  departmentId
                                  </label>
                                  <h5 style={{display:'-ms-inline-flexbox'}}>Department Id</h5>
                                    <Dropdown id="departmentId" value={projectToPost?.departmentId} options={employeeOptions} optionLabel="label" placeholder="Departman seçin" className="w-full md:w-14rem" onChange={(e) => postProjectValue(e)}/>
                                   </div>
                          </div>

                          
                    

                                  
                                </Dialog>
                               
                                <div className="grid">
                                    <div className="col-12">
        
                                        <Button style={{margin :'1px'}} type="button" label="Ekle"  icon="pi pi-external-link" onClick={handlePostClick} />
                                                                
                                       
                                         </div>
                                        </div>
        
            

            <Dialog header="Veri Silme Sihirbazı" visible={displayConfirmation} onHide={() => setDisplayConfirmation(false)} style={{ width: '350px' }} modal footer={confirmationDialogFooter}>
                    
                <div className="flex align-items-center justify-content-center">
               
                    <i className='pi pi-exclamation-triangle mr-3' style={{fontSize: '2rem'}}/>
                    <span> Bak silerim ?</span>
                                
                </div>
    
    
                    </Dialog>
           
            <Dialog header="Veri Güncelleme Sihirbazı" visible={displayBasicUpdate} style={{ width: '17vw' , height: '25vw'}} modal footer={UpdateDialogFooter} onHide={() => setDisplayUpdate(false)}>
                      <div className="card">
                          <h5>Öğrenci</h5>
                          <div className="formgroup-inline">
                             
                              <div className="field">
                                  <label htmlFor="name" className="p-sr-only">
                                      Firstname
                                  </label>
                                  <InputText id="name" value={projectToUpdate?.projectName} onChange={(e) => { updateProjectValue(e); }} type="text" placeholder="Öğrenci Adı" />
                              </div>

                            
                          </div>

                          <div className="field">
                                  <label htmlFor="departmentId" className="p-sr-only">
                                  departmentId
                                  </label>
                                  <h5 style={{display:'-ms-inline-flexbox'}}>Department Id</h5>
                                    <Dropdown id="departmentId" value={projectToPost?.departmentId} options={employeeOptions} optionLabel="label" placeholder="Departman seçin" className="w-full md:w-14rem" onChange={(e) => postProjectValue(e)}/>
                                   </div>
                      </div>
            </Dialog>
        </div>

    

        



        );
        
    };
    function RefreshData() {

        ProjectService.getProjects().then((data) => {
            setProjects(data);
            setLoading1(false);
        });

        DepartmentService.getDepartments()
        .then((data) => {
          setDepartments(data);
          setLoading1(false);
        })
        .catch((error) => {
          console.error('Error fetching departments:', error);
        });
    
        initFilters1();
    }
    

    useEffect(() => {

        RefreshData();

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const initFilters1 = () => {
        setFilters1({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS }
        });
        setGlobalFilterValue1('');
    };

    const header1 = renderHeader1();

    
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Projeler</h5>
                    <DataTable
                        value={projects}
                        paginator
                        className="p-datatable-gridlines"
                        showGridlines
                        rows={10}
                        dataKey="id"
                        filters={filters1}
                        filterDisplay="menu"
                        loading={loading1}
                        responsiveLayout="scroll"
                        emptyMessage="No customers found."
                        header={header1}
                    >
                        
                        <Column field="projectName" header="Proje Adı"  style={{ minWidth: '12rem' }} />
                        <Column field="departmentId" header="Departman ID"  style={{ minWidth: '12rem' }} />
                        <Column field="departmentName" header="Departman Adı"  style={{ minWidth: '12rem' }} />
                    
                        <Column headerStyle={{ width: '4rem', textAlign: 'center' }}  header="Sil"  bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={deleteActionBodyTemplate} />
                        <Column headerStyle={{ width: '4rem', textAlign: 'center' }}  header="Güncelle"  bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={updateActionBodyTemplate} />
                    </DataTable>
                </div>
            </div>
        </div>
    );




};



export default ProjectsPage;

