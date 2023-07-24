/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { DepartmentService } from '../../../demo/service/DepartmentService';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Demo } from '../../../types/types';


const DepartmentsPage = () => {
    


    const [deparments, setDepartments] = useState<Demo.Department[]>([]);
    const [departmentToUpdate, setDepartmentToUpdate] = useState<Demo.Department>();
    const [ departmentIdToDelete, setDepartmentIdToDelete] = useState<number>();
    const [departmentToPost, setDepartmentToPost] = useState<Demo.Department>();
    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayBasicUpdate, setDisplayUpdate] = useState(false);
    const [displayBasicPost, setDisplayPost] = useState(false);
    const PostDialogFooter = <Button type="button" label="OKKAY" onClick={() => postDepartment()} icon="pi pi-check" severity="secondary" />;
    const UpdateDialogFooter = <Button type="button" label="OK" onClick={() => updateDepartment() } icon="pi pi-check" severity="secondary" />;
    
    const [filters1, setFilters1] = useState<DataTableFilterMeta>({});
    const [loading1, setLoading1] = useState(true);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');


 
    

    const confirmationDialogFooter = (
        <>
           <Button type="button" label="Hayır" icon="pi pi-times" onClick={() => setDisplayConfirmation(false)} text />
            <Button type="button" label="Sil." icon="pi pi-check" onClick={deleteDepartment} text autoFocus />
        </>
    );
const [displayConfirmation, setDisplayConfirmation] = useState(false);
    const clearFilter1 = () => {
        initFilters1();
    };

    const onGlobalFilterChange1: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        (_filters1['global'] as any).value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    };


    
function updateDepartment()
{

    console.log(departmentToUpdate);
     DepartmentService.updateDepartment(departmentToUpdate!).then(RefreshData);
    
    setDisplayUpdate(false);
   
}


 function postDepartment(){

    console.log(departmentToPost)
    
    DepartmentService.postDepartments(departmentToPost!).then(RefreshData);
    setDisplayPost(false); 
     

  }


    
    function handleUpdateClick(department:Demo.Department){

        setDepartmentToUpdate(department);
        setDisplayUpdate(true);
    }

    function handleDeleteClick(departmentToDelete:any){

        setDepartmentIdToDelete(departmentToDelete);
        setDisplayConfirmation(true);
    }

    

    function handlePostClick(){
        var departmentToPost : Demo.Department = {
            departmentId : 0,
            departmentName: ""
        };

         setDepartmentToPost(departmentToPost);
         setDisplayPost(true);
    }


    function updateDepartmentValue(changeAction:any){
        setDepartmentToUpdate({
            ...departmentToUpdate!, // Copy the old fields
            [changeAction.target.id]: changeAction.target.value
          });
    }

    function postDepartmentValue(changeAction:any){
        setDepartmentToPost({
            ...departmentToPost!, // Copy the old fields
            [changeAction.target.id]: changeAction.target.value
          });
    }

    const updateActionBodyTemplate = (departmentRow:Demo.Department) => {
        return <Button style={{margin :'1px'}} type="button" label="Güncelle" icon="pi pi-external-link" onClick={() => handleUpdateClick(departmentRow)}/>  
    }
   
    const deleteActionBodyTemplate = (row:Demo.Department) => {
        return <Button style={{margin :'1px'}} label="Sil" icon="pi pi-trash" severity="danger" onClick={() => handleDeleteClick(row.departmentId) } />;
    }

    function deleteDepartment()
    {
        DepartmentService.deleteDepartment(departmentIdToDelete).then(RefreshData);
        setDisplayConfirmation(false);
        
        
    }
    

    
    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between">
               
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Departman ara" />
                </span>

             
                        
                <Dialog header="Veri EKleme Sihirbazı" visible={displayBasicPost} style={{ width: '35vw' , height: '35vw'}} modal footer={PostDialogFooter} onHide={() => setDisplayPost(false)}>
                          
                
                  <div className="card">
                      <h5>Departman</h5>
                         <div className="formgroup-inline">
                             <div className="field">
                                  <label htmlFor="name" className="p-sr-only">
                                      departmentName
                                  </label>
                                  <InputText id="departmentName" value={departmentToPost?.departmentName} onChange={(e) => { postDepartmentValue(e); }} type="text" placeholder="Departman Adı" />
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
                          <h5>Departman</h5>
                          <div className="formgroup-inline">
                          
                              <div className="field">
                                  <label htmlFor="name" className="p-sr-only">
                                      departmentName
                                  </label>
                                  <InputText id="departmentName" value={departmentToUpdate?.departmentName} onChange={(e) => { updateDepartmentValue(e); }} type="text" placeholder="Departman Adı" />
                              </div>
                              
                          </div>
                      </div>
            </Dialog>
                    
                
               
            </div>

        



        );
        
    };
    
    function RefreshData() {

        DepartmentService.getDepartments().then((data) => {
            setDepartments(data);
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
                    <h5>Departmanlar</h5>
                    <DataTable
                    
                        value={deparments}
                        paginator
                        className="p-datatable-gridlines"
                        showGridlines
                        rows={10}
                        dataKey="departmentId"
                        filters={filters1}
                        filterDisplay="menu"
                        loading={loading1}
                        responsiveLayout="scroll"
                        emptyMessage="No customers found."
                        header={header1}
                        
                    >
                        
                        <Column field="departmentId" header="Id"  style={{ minWidth: '12rem' }} />
                        <Column field="departmentName" header="Departman Adı"  style={{ minWidth: '12rem' }} />
                        <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={deleteActionBodyTemplate} />
                        <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={updateActionBodyTemplate} />
                    
                    </DataTable>
                    
                </div>
            </div>
        </div>
    );




};



export default DepartmentsPage;

