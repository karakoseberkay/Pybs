import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { EmployeeService } from '../../../demo/service/EmployeeService';
import { DepartmentService } from '../../../demo/service/DepartmentService';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Demo } from '../../../types/types';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { ProjectService } from '../../../demo/service/ProjectService';
import { error } from 'console';

const StudentsPage = () => {
    const [EmployeeToPost, setEmployeeToPost] = useState<Demo.Employee>();    
    const [DepartmentId, setDepartmentId] = useState<Demo.Department>();
    const [displayBasicPost, setDisplayPost] = useState(false);
    const [Employies, setEmployies] = useState<Demo.Employee[]>([]);
    const [EmployeeToUpdate, setEmployeeToUpdate] = useState<Demo.Employee>();
    const [displayBasicUpdate, setDisplayUpdate] = useState(false);
    const [filters1, setFilters1] = useState<DataTableFilterMeta>({});
    const [loading1, setLoading1] = useState(true);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [postButtonLabel, setPostButtonLabel] = useState('Yeni personel ekle');
    const [departments, setDepartments] = useState<Demo.Department[]>([]);
    const [projects, setProjects] = useState<Demo.Project[]>([]);
     
    const PostDialogFooter = (
        <Button type="button" label={postButtonLabel} onClick={() => postEmployee()} icon="pi pi-check" severity="secondary" />
    );
    
    const UpdateDialogFooter = <Button type="button" label="OK" onClick={() => updateEmployee() } icon="pi pi-check" severity="secondary" />;
    const confirmationDialogFooter = (
        <>
            <Button type="button" label="Hayır" icon="pi pi-times" onClick={() => setDisplayConfirmation(false)} text />
            <Button type="button" label="Evet" icon="pi pi-check" onClick={deleteEmployee} text autoFocus />
        </>
    );
    
    const [isTCKNValid, setIsTCKNValid] = useState(true);

const [displayConfirmation, setDisplayConfirmation] = useState(false);
    const clearFilter1 = () => {
        initFilters1();
    };


    const employeeLevels = [
        { label: 'Stajyer', value: 'Stajyer' },
        { label: 'Çalışan', value: 'Çalışan' },
        { label: 'Yönetici', value: 'Yönetici' },
     

      ];
    


    function deleteEmployee(id:any)
    {
        EmployeeService.deleteEmployee(id).then(RefreshData)
        console.log('Deleting...');
    }

    function updateEmployee()
    {
        EmployeeService.updateEmployee(EmployeeToUpdate!).then(RefreshData);
        
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

    const employeeOptions = departments.map((emp) => ({
        label: emp.departmentName,
        value: emp.departmentId,
      }));

    
      const projectOptions = projects.map((emp) => ({
        label: emp.projectName,
        value: emp.projectId,
      }));


    function checkTCKNValidity(tckn: string): boolean {
        // Türkiye Cumhuriyeti kimlik numarası 11 haneli olmalıdır
        if (tckn.length !== 11) {
          return false;
        }
      
        // Kimlik numarası sadece rakamlardan oluşmalıdır
        if (!/^\d+$/.test(tckn)) {
          return false;
        }
      
        // İlk hane 0 olmamalıdır
        if (tckn[0] === '0') {
          return false;
        }
      
        // Kimlik numarasının son hanesi, diğer 10 hanenin doğru toplamının mod 10'u olmalıdır
        let total = 0;
        for (let i = 0; i < 10; i++) {
          total += parseInt(tckn[i], 10);
        }
        if (total % 10 !== parseInt(tckn[10], 10)) {
          return false;
        }
      /*
        // İlk 9 hane için ikişer ikişer toplamı, 10. haneyi vermelidir
        const isSumEqual = (a: number, b: number, c: number) => a + b === c;
        if (
          !isSumEqual(parseInt(tckn[0], 10), parseInt(tckn[2], 10), parseInt(tckn[4], 10)) ||
          !isSumEqual(parseInt(tckn[1], 10), parseInt(tckn[3], 10), parseInt(tckn[5], 10)) ||
          !isSumEqual(parseInt(tckn[6], 10), parseInt(tckn[8], 10), parseInt(tckn[10], 10))
        ) {
          return false;
        }
      
        // İlk 10 hane için ikişer ikişer toplamın 7 katı, 9. haneyi vermelidir
        const isTotalEqual = (a: number, b: number, c: number, d: number) => (a + b + c) * d === parseInt(tckn[9], 10);
        if (
          !isTotalEqual(parseInt(tckn[0], 10), parseInt(tckn[2], 10), parseInt(tckn[4], 10), 7) ||
          !isTotalEqual(parseInt(tckn[1], 10), parseInt(tckn[3], 10), parseInt(tckn[5], 10), 7) ||
          !isTotalEqual(parseInt(tckn[6], 10), parseInt(tckn[8], 10), parseInt(tckn[10], 10), 7)
        ) {
          return false;
        }*/
      
        return true;
      }
    
      function validateTCKN(tckn: string) {
        const isValid = checkTCKNValidity(tckn);
        setIsTCKNValid(isValid);
    }
    
    function postEmployeeValue(changeAction:any){
        if (changeAction.target.id === "employeeIdNumber") {
            validateTCKN(changeAction.target.value);
        }


          
          setEmployeeToPost({
            ...EmployeeToPost!, // Copy the old fields
        
            [changeAction.target.id] : changeAction.target.value,

            
                     
                       
          });
    }
    
      
    function handlePostClick(){

       

        var EmployeeToPost : Demo.Employee = {
           
            employeeId: 0,
        employeeName: "",
        employeeIdNumber: "",
        departmentId: 0,   
        employeeLevel:"",
        employeeExp: 0,
        offDay:"", 
        projectId: 0
             
        };

        setEmployeeToPost(EmployeeToPost);
        setPostButtonLabel('Yeni personel ekle');
        setDisplayPost(true);
    }

    function postEmployee(){
        const isValidTCKN = checkTCKNValidity(EmployeeToPost?.employeeIdNumber || '');

        if (!isValidTCKN) {
            // If TC no is invalid, set the button text to "Hatalı TC No"
            setPostButtonLabel('Hatalı TC No');
            return;
        }
       

        
        EmployeeService.postEmployee(EmployeeToPost!).then(RefreshData);
        setDisplayPost(false); 
         
    
      }


    function handleUpdateClick(employee:Demo.Employee){
       EmployeeService.getEmployeebyId(employee.employeeId)
       .then(employeeFromService => {

        setEmployeeToUpdate({...employeeFromService});

        setDisplayUpdate(true);
       }) 
        
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

   function setSelectedDepartmentForPost(e: DropdownChangeEvent): void {
    throw new Error('Function not implemented.');
}
   


    const renderHeader1 = () => {

        return (
            <div className="flex justify-content-between">
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
                                          <h5 style={{display:'-ms-inline-flexbox'}}>Çalışan Adı</h5>
                                          <InputText id="employeeName" value={EmployeeToPost?.employeeName} onChange={(e) => { postEmployeeValue(e); }} type="text" placeholder="Çalışanın Adı" />
                                      </div>
                                                                    
                                      <div className="field">
                                  <label htmlFor="departmentId" className="p-sr-only">
                                  departmentId
                                  </label>
                                  <h5 style={{display:'-ms-inline-flexbox'}}>Departman Adı</h5>
                                    <Dropdown id="departmentId" value={EmployeeToPost?.departmentId} options={employeeOptions} optionLabel="label" placeholder="Departman seçin" className="w-full md:w-14rem" onChange={(e) => postEmployeeValue(e)}/>
                                   </div>
                              
                              <div className="field">
                                  <label htmlFor="employeeIdNumber" className="p-sr-only">
                                      employeeIdNumber
                                  </label>
                                  <h5 style={{display:'-ms-inline-flexbox'}}>Çalışan TC no</h5>
                                  <InputText id="employeeIdNumber" value={EmployeeToPost?.employeeIdNumber} onChange={(e) => { postEmployeeValue(e); }} type="text" placeholder="Çalışan TC no" />
                                
                              </div>

                              <div className="field">
                                          <label htmlFor="employeeLevel" className="p-sr-only">
                                              EmployeeLevel
                                          </label>
                                          <h5 style={{display:'-ms-inline-flexbox'}}>Çalışan Kıdemi</h5>
                                          <Dropdown id="employeeLevel" value={EmployeeToPost?.employeeLevel} options={employeeLevels} placeholder="Çalışan Kıdemi Seçin" onChange={(e) => postEmployeeValue(e)} /> </div>

                                      <div className="field">
                                          <label htmlFor="employeeExp" className="p-sr-only">
                                              EmployeeExp
                                          </label>
                                          <h5 style={{display:'-ms-inline-flexbox'}}>Tecrübe(Yıl)</h5>
                                          <InputText id="employeeExp" value={EmployeeToPost?.employeeExp+''} onChange={(e) => { postEmployeeValue(e); }} type="number" placeholder="Çalışanın Tecrübe yılı" />
                                      </div>

                                     

                                      <div className="field">
                                  <label htmlFor="projectId" className="p-sr-only">
                                  projectId
                                  </label>
                                  <h5 style={{display:'-ms-inline-flexbox'}}>Proje Kodu</h5>
                                    <Dropdown id="projectId" value={EmployeeToPost?.projectId} options={projectOptions} optionLabel="label" placeholder="Proje Kodu" className="w-full md:w-14rem" onChange={(e) => postEmployeeValue(e)}/>
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
               
                <Dialog header="Veri Güncelleme Sihirbazı" visible={displayBasicUpdate} style={{ width: '17vw' , height: '35vw'}} modal footer={UpdateDialogFooter} onHide={() => setDisplayUpdate(false)}>
                          <div className="card">
                              <h5>Çalışan İsmi</h5>
                              <div className="formgroup-inline">
                                 
                                  <div className="field">
                                      <label htmlFor="employeeName" className="p-sr-only">
                                      İsim
                                      </label>
                                      <InputText id="employeeName" value={EmployeeToUpdate?.employeeName} onChange={(e) => { updateEmployeeValue(e); }} type="text" placeholder="Çalışan İsmi" />
                                 
                                      </div>
                                      <div className="field">
                                  <label htmlFor="departmentName" className="p-sr-only">
                                  Departman Adı
                                  </label>
                                  <h5 style={{display:'-ms-inline-flexbox'}}>Departman Adı</h5>
                                    <Dropdown id="departmentName" value={EmployeeToUpdate?.departmentId} options={employeeOptions} optionLabel="label" placeholder="Departman seçin" className="w-full md:w-14rem" onChange={(e) => updateEmployeeValue(e)}/>
                                   </div>

                                   
                                   <div className="field">
                                  <label htmlFor="projectName" className="p-sr-only">
                                  Proje Kodu
                                  </label>
                                  <h5 style={{display:'-ms-inline-flexbox'}}>Proje Kodu</h5>
                                    <Dropdown id="projectName" value={EmployeeToUpdate?.projectId} options={projectOptions} optionLabel="label" placeholder="Proje seçin" className="w-full md:w-14rem" onChange={(e) => updateEmployeeValue(e)}/>
                                   </div>


                                   <div className="field">
                                          <label htmlFor="employeeLevel" className="p-sr-only">
                                              EmployeeLevel
                                          </label>
                                          <h5 style={{display:'-ms-inline-flexbox'}}>Çalışan Tecrübe(Yıl)</h5>
                                          <Dropdown id="employeeLevel" value={EmployeeToUpdate?.employeeLevel} options={employeeLevels} placeholder="Employee Level Seçin" onChange={(e) => updateEmployeeValue(e)} /> </div>

                                    
                                 
                                
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

        DepartmentService.getDepartments()
        .then((data) => {
          setDepartments(data);
          setLoading1(false);
        })
        .catch((error) => {
          console.error('Error fetching departments:', error);
        });

        ProjectService.getProjects()
        .then((data) => {

            setProjects(data);
            setLoading1(false);

        })
        .catch((error) => {


            console.error('Error ferching projects:', error)


        });

    
        initFilters1();
    }
    








    useEffect(() => {

      console.log("useeffect")
       
        RefreshData();

    }, []); 
  
 
  

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
                    <h5>Çalışanlar</h5>
        
      
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
                       

                        <Column field="employeeName" header="Çalışan İsmi"  style={{ minWidth: '12rem' }} />
                        <Column field="departmentName" header="Departman Adı" style={{ minWidth: '12rem' }} />
                        <Column field="employeeIdNumber" header="Çalışan TC no"  style={{ minWidth: '12rem' }} />
                        <Column field="employeeLevel" header="Çalışan Kıdem"  style={{ minWidth: '12rem' }} />
                        <Column field="employeeExp" header="Tecrübe(Yıl)"  style={{ minWidth: '12rem' }} />
                        <Column field="offDay" header="İzin Durumu"  style={{ minWidth: '12rem' }} body={actionBodyTemplateOffDay}/>
                        <Column field="projectName" header="Proje Kodu"  style={{ minWidth: '12rem' }} />
                        <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={deleteActionBodyTemplate} />
                        <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={updateActionBodyTemplate} />
                    </DataTable>
                    </div>
            </div>
        </div>
   
   
   
   );

   




};



export default StudentsPage;

