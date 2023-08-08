


/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Demo } from '../../../types/types';

/* eslint-disable @next/next/no-img-element */
import { EmployeeService } from '../../../demo/service/EmployeeService';



import { FileUpload } from 'primereact/fileupload';


const DepartmentsPage = () => {
    


    const [deparments, setDepartments] = useState<Demo.Employee[]>([]);
    const [departmentToUpdate, setDepartmentToUpdate] = useState<Demo.Department>();
    const [ departmentIdToDelete, setDepartmentIdToDelete] = useState<number>();
    const [departmentToPost, setDepartmentToPost] = useState<Demo.Department>();
    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayBasicUpdate, setDisplayUpdate] = useState(false);
    const [displayBasicPost, setDisplayPost] = useState(false);
      const [employees, setEmployees] = useState<Demo.Employee[]>([]);
    
    const [filters1, setFilters1] = useState<DataTableFilterMeta>({});
    const [loading1, setLoading1] = useState(true);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');


 
    

    const confirmationDialogFooter = (
        <>
           <Button type="button" label="Hayır" icon="pi pi-times" onClick={() => setDisplayConfirmation(false)} text />
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


    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
    const [files, setFiles] = useState<Demo.Employee[]>([]);

    useEffect(() => {
        if (selectedEmployeeId) {
            EmployeeService.getFileById(selectedEmployeeId).then((employee) => {
                // Dosyaları alınan personelin dosyalarıyla güncelle
                setFiles([employee]);
            });
        }
    }, [selectedEmployeeId]);

    const fileTemplate = (rowData: Demo.Employee) => {
        return (
            <FileUpload
                mode="basic"
                name="demo[]"
                chooseLabel="Dosya Seç"
                auto
                customUpload
                uploadHandler={(e) => handleFileUpload(e, rowData.employeeId)}
            />
        );
    };

    const handleFileUpload = (event: any, employeeId: number) => {
        const file = event.files[0];

        // Dosyayı gönderme işlemini yapabilirsiniz, burada çağrılan fonksiyonu tamamlayın

        // Örnek bir fetch işlemi:
        EmployeeService.postFile(employeeId, file).then(() => {
            // Dosyayı yükledikten sonra güncel dosyaları yeniden al
            setSelectedEmployeeId(employeeId);
        });
    };







    function handleDeleteClick(departmentToDelete:any){

        setDepartmentIdToDelete(departmentToDelete);
        setDisplayConfirmation(true);
    }

    


    function updateDepartmentValue(changeAction:any){
        setDepartmentToUpdate({
            ...departmentToUpdate!, // Copy the old fields
            [changeAction.target.id]: changeAction.target.value
          });
    }

    const deleteActionBodyTemplate = (row:Demo.Department) => {
        return <Button style={{margin :'1px'}} label="Sil" icon="pi pi-trash" severity="danger" onClick={() => handleDeleteClick(row.departmentId) } />;
    }


    
    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between">
               
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Departman ara" />
                </span>




                <Dialog header="Veri Silme Sihirbazı" visible={displayConfirmation} onHide={() => setDisplayConfirmation(false)} style={{ width: '350px' }} modal footer={confirmationDialogFooter}>
                    
                <div className="flex align-items-center justify-content-center">
                     <i className='pi pi-exclamation-triangle mr-3' style={{fontSize: '2rem'}}/>
                     <span> Bak silerim ?</span>
                                
                </div>


                </Dialog>


                
               
            </div>

        



        );
        
    };
    
    function RefreshData() {
        // Örnek olarak tüm çalışanları getiren bir servis fonksiyonunu çağırdığımızı varsayalım
        EmployeeService.getEmployies().then((data) => {
            setEmployees(data); // Verileri tüm çalışanlar listesini güncelle
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
                        
                       <Column field="departmentName" header="Departman Adı"  style={{ minWidth: '12rem' }} />
                        <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={deleteActionBodyTemplate} />
                  
                        <Column header="Dosya Yükle" body={fileTemplate} />
                    </DataTable>
                    
                </div>
            </div>
        </div>
    );










};



export default DepartmentsPage;

