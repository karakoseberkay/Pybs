import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ProjectService } from '../../../demo/service/ProjectService';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Demo } from '../../../types/types';
import { InputNumber } from 'primereact/inputnumber';

const TeachersPage = () => {
    const [teachers, setTeachers] = useState<Demo.Teacher[]>([]);
    
    const [ teacherIdToDelete, setTeacherIdToDelete] = useState<number>();
    const [teacherToPost, setTeacherToPost] = useState<Demo.Teacher>();
    
    const [displayBasicPost, setDisplayPost] = useState(false);
    const [teacherToUpdate, setTeacherToUpdate] = useState<Demo.Teacher>();
    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayBasicUpdate, setDisplayUpdate] = useState(false);
    const [filters1, setFilters1] = useState<DataTableFilterMeta>({});
    const [loading1, setLoading1] = useState(true);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const PostDialogFooter = <Button type="button" label="OK" onClick={() => postTeacher()} icon="pi pi-check" severity="secondary" />;
    const UpdateDialogFooter = <Button type="button" label="OK" onClick={() => updateTeacher() } icon="pi pi-check" severity="secondary" />;
    const confirmationDialogFooter = (
        <>
            <Button type="button" label="Hayır" icon="pi pi-times" onClick={() => setDisplayConfirmation(false)} text />
            <Button type="button" label="Evet" icon="pi pi-check" onClick={deleteTeacher} text autoFocus />
        </>
    );
const [displayConfirmation, setDisplayConfirmation] = useState(false);
    const clearFilter1 = () => {
        initFilters1();
    };

function updateTeacher()
    {
        ProjectService.updateTeacher(teacherToUpdate!);
        
        setDisplayUpdate(false);
    }

    const onGlobalFilterChange1: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        (_filters1['global'] as any).value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    };

    function postTeacher(){

        console.log(teacherToPost)
        
        ProjectService.postTeacher(teacherToPost!).then(RefreshData);
        setDisplayPost(false); 
         
    
      }
    

    function handleDeleteClick(teacherToDelete:any){

        setTeacherIdToDelete(teacherToDelete);
        setDisplayConfirmation(true);
    }

    

    
    function handlePostClick(){
        var teacherToPost : Demo.Teacher = {
            id : 0,
            name: "",
            departmentId: 0
        };

         setTeacherToPost(teacherToPost);
         setDisplayPost(true);
    }

    


    function postTeacherValue(changeAction:any){
        setTeacherToPost({
            ...teacherToPost!, // Copy the old fields
            [changeAction.target.id] : changeAction.target.value
            
          });
    }
    
   

    
    function handleUpdateClick(teacher:Demo.Teacher){

        setTeacherToUpdate(teacher);

        setDisplayUpdate(true);
    }

    function updateTeacherValue(changeAction:any){
        setTeacherToUpdate({
            ...teacherToUpdate!, // Copy the old fields
            [changeAction.target.id]: changeAction.target.value
          });
    }

    const updateActionBodyTemplate = (teacherRow:Demo.Teacher) => {
        return <Button style={{margin :'1px'}} type="button" label="Güncelle" icon="pi pi-external-link" onClick={() => handleUpdateClick(teacherRow)}/>  
    }

    
    const deleteActionBodyTemplate = (row:Demo.Teacher) => {
        return <Button style={{margin :'1px'}} label="Sil" icon="pi pi-trash" severity="danger" onClick={() => handleDeleteClick(row.id) } />;
    }

    function deleteTeacher()
    {
        ProjectService.deleteTeacher(teacherIdToDelete);
        setDisplayConfirmation(false);
        
        
    }
    
    
    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between">
            <Button type="button" icon="pi pi-filter-slash" label="Filtreyi temizle" outlined onClick={clearFilter1} />
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Departman ara" />
            </span>
            
           

            <Dialog header="Confirmation" visible={displayConfirmation} onHide={() => deleteTeacher} style={{ width: '350px' }} modal footer={confirmationDialogFooter}>
            <div className="flex align-items-center justify-content-center">
            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
            <span>Silmek istediğinize emin misiniz?</span>
            </div>
            </Dialog>


            
                        
            <Dialog header="Veri EKleme Sihirbazı" visible={displayBasicPost} style={{ width: '35vw' , height: '35vw'}} modal footer={PostDialogFooter} onHide={() => setDisplayPost(false)}>
                          
                
                          <div className="card">
                              <h5>Öğretmen</h5>
                                 <div className="formgroup-inline">
                                     <div className="field">
                                          <label htmlFor="name" className="p-sr-only">
                                              ogretmenName
                                          </label>
                                          <InputText id="name" value={teacherToPost?.name} onChange={(e) => { postTeacherValue(e); }} type="text" placeholder="Hocanın Adı" />
                                      </div>
                                     
                                      <div className="field">
                                  <label htmlFor="departmentId" className="p-sr-only">
                                      departmentId
                                  </label>
                                  <InputText id="departmentId" value={teacherToPost?.departmentId+''} onChange={(e) => { postTeacherValue(e); }} type="number" placeholder="Departman Id" />
                              </div>
                              
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
           
            <Dialog header="Veri Güncelleme Sihirbazı" visible={displayBasicUpdate} style={{ width: '35vw' , height: '35vw'}} modal footer={UpdateDialogFooter} onHide={() => setDisplayUpdate(false)}>
                      <div className="card">
                          <h5>Öğrenci</h5>
                          <div className="formgroup-inline">
                             
                              <div className="field">
                                  <label htmlFor="name" className="p-sr-only">
                                      Firstname
                                  </label>
                                  <InputText id="name" value={teacherToUpdate?.name} onChange={(e) => { updateTeacherValue(e); }} type="text" placeholder="Öğrenci Adı" />
                              </div>
                              <div className="field">
                                  <label htmlFor="departmentId" className="p-sr-only">
                                      Department ID
                                  </label>
                                  <InputText id="departmentId" value={teacherToUpdate?.departmentId+''} onChange={(e) => { updateTeacherValue(e); }}  type="text" placeholder="Departman ID" />
                              </div>
                          </div>
                      </div>
            </Dialog>
        </div>

    

        



        );
        
    };
    function RefreshData() {

        ProjectService.getTeachers().then((data) => {
            setTeachers(data);
            setLoading1(false);
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
                    <h5>Öğrenciler</h5>
                    <DataTable
                        value={teachers}
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
                        <Column field="id" header="Id" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column field="name" header="Öğrenci Adı" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column field="departmentId" header="Departman ID" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />

                        <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={deleteActionBodyTemplate} />
                        <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={updateActionBodyTemplate} />
                    </DataTable>
                </div>
            </div>
        </div>
    );




};



export default TeachersPage;

