import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { EmployeeService } from '../../../demo/service/EmployeeService';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Demo } from '../../../types/types';
import { InputNumber } from 'primereact/inputnumber';
import { debug } from 'console';

const StudentsPage = () => {
    const [teacherToPost, setTeacherToPost] = useState<Demo.Teacher>();    
    const [displayBasicPost, setDisplayPost] = useState(false);
    const [Students, setStudents] = useState<Demo.Student[]>([]);
    const [studentToUpdate, setStudentToUpdate] = useState<Demo.Student>();
    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayBasicUpdate, setDisplayUpdate] = useState(false);
    const [filters1, setFilters1] = useState<DataTableFilterMeta>({});
    const [loading1, setLoading1] = useState(true);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const PostDialogFooter = <Button type="button" label="OK" onClick={() => postTeacher()} icon="pi pi-check" severity="secondary" />;
    const UpdateDialogFooter = <Button type="button" label="OK" onClick={() => updateStudent() } icon="pi pi-check" severity="secondary" />;
    const confirmationDialogFooter = (
        <>
            <Button type="button" label="Hayır" icon="pi pi-times" onClick={() => setDisplayConfirmation(false)} text />
            <Button type="button" label="Evet" icon="pi pi-check" onClick={deleteStudent} text autoFocus />
        </>
    );
const [displayConfirmation, setDisplayConfirmation] = useState(false);
    const clearFilter1 = () => {
        initFilters1();
    };


    function deleteStudent(id:any)
    {
        EmployeeService.deleteStudent(id)
        console.log('Deleting...');
    }

    function updateStudent()
    {
        EmployeeService.updateStudent(studentToUpdate!);
        
        setDisplayUpdate(false);
    }
    const onGlobalFilterChange1: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        (_filters1['global'] as any).value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    };
    
    const deleteActionBodyTemplate = (row:any) => {
        return <Button style={{margin :'1px'}} label="Sil" icon="pi pi-trash" severity="danger" onClick={() => deleteStudent(row.id) } />;
    }


    function postTeacherValue(changeAction:any){
        setTeacherToPost({
            ...teacherToPost!, // Copy the old fields
            [changeAction.target.id] : changeAction.target.value
            
          });
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

    function postTeacher(){

        console.log(teacherToPost)
        
        EmployeeService.postStudent(teacherToPost!).then(RefreshData);
        setDisplayPost(false); 
         
    
      }


    function handleUpdateClick(student:Demo.Student){

        setStudentToUpdate(student);

        setDisplayUpdate(true);
    }

    function updateStudentValue(changeAction:any){
        setStudentToUpdate({
            ...studentToUpdate!, // Copy the old fields
            [changeAction.target.id]: changeAction.target.value
          });
    }

    const updateActionBodyTemplate = (studentRow:Demo.Student) => {
        return <Button style={{margin :'1px'}} type="button" label="Güncelle" icon="pi pi-external-link" onClick={() => handleUpdateClick(studentRow)}/>  
    }
   



    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Filtreyi temizle" outlined onClick={clearFilter1} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Departman ara" />
                </span>
                
               

                <Dialog header="Confirmation" visible={displayConfirmation} onHide={() => deleteStudent} style={{ width: '350px' }} modal footer={confirmationDialogFooter}>
                <div className="flex align-items-center justify-content-center">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                <span>Silmek istediğinize emin misiniz?</span>
                </div>
                </Dialog>


                
                        
                <Dialog header="Veri EKleme Sihirbazı" visible={displayBasicPost} style={{ width: '35vw' , height: '35vw'}} modal footer={PostDialogFooter} onHide={() => setDisplayBasic(false)}>
                          
                
                <div className="card">
                              <h5>Student</h5>
                                 <div className="formgroup-inline">
                                     <div className="field">
                                          <label htmlFor="name" className="p-sr-only">
                                              studentName
                                          </label>
                                          <InputText id="name" value={teacherToPost?.name} onChange={(e) => { postTeacherValue(e); }} type="text" placeholder="Öğrencinin Adı" />
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
                
                   
                    <div className="formgroup-inline">
                        <div className="field">
                            <label htmlFor="firstname1" className="p-sr-only">
                                DepartmentId
                            </label>
                            <InputText id="firstname1" type="text" placeholder="Departman Id" />
                        </div>
                       
                        
                    
                    </div>
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
                                      <InputText id="name" value={studentToUpdate?.name} onChange={(e) => { updateStudentValue(e); }} type="text" placeholder="Öğrenci Adı" />
                                  </div>
                                  <div className="field">
                                      <label htmlFor="departmentId" className="p-sr-only">
                                          Department ID
                                      </label>
                                      <InputText id="departmentId" value={studentToUpdate?.departmentId+''} onChange={(e) => { updateStudentValue(e); }}  type="text" placeholder="Departman ID" />
                                  </div>
                              </div>
                          </div>
                </Dialog>
            </div>

        



        );
        
    };
    
    function RefreshData() {

        EmployeeService.getStudents().then((data) => {
            setStudents(data);
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
                        value={Students}
                        paginator
                        className="p-datatable-gridlines"
                        showGridlines
                        rows={10}
                        dataKey="id"
                        filters={filters1}
                        filterDisplay="menu"
                        loading={loading1}
                        responsiveLayout="scroll"
                        emptyMessage="Dükkanda adam kalmadı."
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



export default StudentsPage;

