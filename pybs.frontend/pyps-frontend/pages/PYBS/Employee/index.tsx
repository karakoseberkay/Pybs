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
    const [EmployeeToPost, setEmployeeToPost] = useState<Demo.Employee>();    
    const [displayBasicPost, setDisplayPost] = useState(false);
    const [Employies, setEmployies] = useState<Demo.Employee[]>([]);
    const [EmployeeToUpdate, setEmployeeToUpdate] = useState<Demo.Employee>();
    const [displayBasicUpdate, setDisplayUpdate] = useState(false);
    const [filters1, setFilters1] = useState<DataTableFilterMeta>({});
    const [loading1, setLoading1] = useState(true);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const PostDialogFooter = <Button type="button" label="OK" onClick={() => postEmployee()} icon="pi pi-check" severity="secondary" />;
    const UpdateDialogFooter = <Button type="button" label="OK" onClick={() => updateEmployee() } icon="pi pi-check" severity="secondary" />;
    const confirmationDialogFooter = (
        <>
            <Button type="button" label="Hayır" icon="pi pi-times" onClick={() => setDisplayConfirmation(false)} text />
            <Button type="button" label="Evet" icon="pi pi-check" onClick={deleteEmployee} text autoFocus />
        </>
    );
const [displayConfirmation, setDisplayConfirmation] = useState(false);
    const clearFilter1 = () => {
        initFilters1();
    };


    function deleteEmployee(id:any)
    {
        EmployeeService.deleteEmployee(id).then(RefreshData)
        console.log('Deleting...');
    }

    function updateEmployee()
    {
        EmployeeService.updateEmployee(EmployeeToUpdate!);
        
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
        return <Button style={{margin :'1px'}} label="Sil" icon="pi pi-trash" severity="danger" onClick={() => deleteEmployee(row.employeeId) } />;
    }


    function postEmployeeValue(changeAction:any){
        setEmployeeToPost({
            ...EmployeeToPost!, // Copy the old fields
            [changeAction.target.id] : changeAction.target.value
            
          });
    }
    
      
    function handlePostClick(){
        var EmployeeToPost : Demo.Employee = {
            employeeId: 0,
        employeeName: "",
        departmentId: 0,
        employeeIdNumber: 0,
        employeeLevel:"",
        employeeExp: 0,
        offDay:"", 
        projectId: 0
             
        };

         setEmployeeToPost(EmployeeToPost);
         setDisplayPost(true);
    }

    function postEmployee(){

        console.log(EmployeeToPost)
        
        EmployeeService.postEmployee(EmployeeToPost!).then(RefreshData);
        setDisplayPost(false); 
         
    
      }


    function handleUpdateClick(Employee:Demo.Employee){

        setEmployeeToUpdate(Employee);

        setDisplayUpdate(true);
    }

    function updateEmployeeValue(changeAction:any){
        setEmployeeToUpdate({
            ...EmployeeToUpdate!, // Copy the old fields
            [changeAction.target.id]: changeAction.target.value
          });
    }

    const updateActionBodyTemplate = (EmployeeRow:Demo.Employee) => {
        return <Button style={{margin :'1px'}} type="button" label="Güncelle" icon="pi pi-external-link" onClick={() => handleUpdateClick(EmployeeRow)}/>  
    }
   
   const actionBodyTemplateOffDay =(EmployeeRow:Demo.Employee) =>{
    return <Button style={{margin :'1px', background:'rgba(135 145 156)',border:'rgba(135 145 156)'}} type="button" label="Belge Ekle" icon="pi pi-external-link" onClick={() => handleUpdateClick(EmployeeRow)}/>  
   }


    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Filtreyi temizle" outlined onClick={clearFilter1} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Departman ara" />
                </span>
                
               

                <Dialog header="Confirmation" visible={displayConfirmation} onHide={() => deleteEmployee} style={{ width: '350px' }} modal footer={confirmationDialogFooter}>
                <div className="flex align-items-center justify-content-center">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                <span>Silmek istediğinize emin misiniz?</span>
                </div>
                </Dialog>


                
                        
                <Dialog header="Veri Ekleme Sihirbazı" visible={displayBasicPost} style={{ width: '30vw' , height: '31vw', padding:'0.5rem'}} modal footer={PostDialogFooter} onHide={() => setDisplayPost(false)}>
                          
                
                <div className="card" >
                              
                                 <div className="formgroup-inline"   style={{ paddingLeft:'1.5rem'}}  >
                                     <div className="field">
                                          <label htmlFor="name" className="p-sr-only">
                                              EmployeeName
                                          </label>
                                          <h5 style={{display:'-ms-inline-flexbox'}}>Employee Name</h5>
                                          <InputText id="employeeName" value={EmployeeToPost?.employeeName} onChange={(e) => { postEmployeeValue(e); }} type="text" placeholder="Çalışanın Adı" />
                                      </div>
                                                                    
                                      <div className="field">
                                  <label htmlFor="departmentId" className="p-sr-only">
                                      departmentId
                                  </label>
                                  <h5 style={{display:'-ms-inline-flexbox'}}>Department Id</h5>
                                  <InputNumber id="departmentId" value={EmployeeToPost?.departmentId} onChange={(e) => { postEmployeeValue(e); }} type="text" placeholder="Departman Id" />
                                
                              </div>

                              <div className="field">
                                          <label htmlFor="employeeLevel" className="p-sr-only">
                                              EmployeeLevel
                                          </label>
                                          <h5 style={{display:'-ms-inline-flexbox'}}>Employee Level</h5>
                                          <InputText id="employeeLevel" value={EmployeeToPost?.employeeLevel} onChange={(e) => { postEmployeeValue(e); }} type="text" placeholder="Çalışanın mevkisi" />
                                      </div>

                                      <div className="field">
                                          <label htmlFor="employeeExp" className="p-sr-only">
                                              EmployeeExp
                                          </label>
                                          <h5 style={{display:'-ms-inline-flexbox'}}>Employee Exp</h5>
                                          <InputNumber id="employeeExp" value={EmployeeToPost?.employeeExp} onChange={(e) => { postEmployeeValue(e); }} type="text" placeholder="Çalışanın tecrübe yılı" />
                                      </div>

                                      <div className="field">
                                          <label htmlFor="offDay" className="p-sr-only">
                                          offDay
                                          </label>
                                          <h5 style={{display:'-ms-inline-flexbox'}}>Off Day</h5>
                                          <InputText id="offDay" value={EmployeeToPost?.offDay} onChange={(e) => { postEmployeeValue(e); }} type="text" placeholder="Çalışanın izin belgesi" />
                                      </div>

                                      <div className="field">
                                          <label htmlFor="projectId" className="p-sr-only">
                                          projectId
                                          </label>
                                          <h5 style={{display:'-ms-inline-flexbox'}}>Project Id</h5>
                                          <InputNumber id="projectId" value={EmployeeToPost?.projectId} onChange={(e) => { postEmployeeValue(e); }} type="text" placeholder="Çalışanın Adı" />
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
                            <label htmlFor="employeeId" className="p-sr-only">
                            employeeId
                            </label>
                            <InputText id="employeeId" type="text" placeholder="employeeId" />
                        </div>
                       
                        
                    
                    </div>
                </div>
                </Dialog>
               
                <Dialog header="Veri Güncelleme Sihirbazı" visible={displayBasicUpdate} style={{ width: '35vw' , height: '35vw'}} modal footer={UpdateDialogFooter} onHide={() => setDisplayUpdate(false)}>
                          <div className="card">
                              <h5>Employee</h5>
                              <div className="formgroup-inline">
                                 
                                  <div className="field">
                                      <label htmlFor="name" className="p-sr-only">
                                          Firstname
                                      </label>
                                      <InputText id="name" value={EmployeeToUpdate?.employeeName} onChange={(e) => { updateEmployeeValue(e); }} type="text" placeholder="Öğrenci Adı" />
                                  </div>
                                  <div className="field">
                                      <label htmlFor="departmentId" className="p-sr-only">
                                          Department ID
                                      </label>
                                      <InputText id="departmentId" value={EmployeeToUpdate?.departmentId+''} onChange={(e) => { updateEmployeeValue(e); }}  type="text" placeholder="Departman ID" />
                                  </div>
                              </div>
                          </div>
                </Dialog>
            </div>

        



        );
        
    };
    
    function RefreshData() {

        EmployeeService.getEmployies().then((data) => {
            setEmployies(data);
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
                    <h5>Employies</h5>
                    <DataTable
                        value={Employies}
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
            
                        <Column field="employeeName" header="Employee Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column field="departmentId" header="Department" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column field="employeeLevel" header="Employee Level" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column field="employeeExp" header="Employee Exp" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column field="offDay" header="Off Day" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} body={actionBodyTemplateOffDay}/>
                        <Column field="projectId" header="Project Id" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={deleteActionBodyTemplate} />
                        <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={updateActionBodyTemplate} />
                    </DataTable>
                </div>
            </div>
        </div>
   
   
   
   
   
   );




};



export default StudentsPage;

