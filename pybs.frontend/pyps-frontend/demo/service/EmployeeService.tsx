

import { Demo } from '../../types/types';
import nextConfig from '../../next.config';

const API_URL = `http://${nextConfig.API_URL}/api`;

export const EmployeeService = {
  getEmployies() {
    return fetch(`${API_URL}/employee`)
      .then((res) => res.json())
      .then((d) => d as Demo.Employee[]);
  },
  getEmployeebyId(id: any) {
    return fetch(`${API_URL}/employee/${id}`)
      .then((res) => res.json())
      .then((d) => d as Demo.Employee);
  },
  deleteEmployee(id: any) {
    return fetch(`${API_URL}/employee/${id}`, {
      method: 'DELETE',
    }).catch((err) => {
      console.log(err.message);
    });
  },
  updateEmployee(employee: Demo.Employee) {
    return fetch(`${API_URL}/employee/${employee.employeeId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee),
    });
  },
  postEmployee(employee: Demo.Employee) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee),
    };
    return fetch(`${API_URL}/employee`, requestOptions);
  },
  postFile(employeeId: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return fetch(`${API_URL}/fileupload/upload/${employeeId}`, {
      method: 'POST',
      body: formData,
    });
  },
  getFiles() {
    return fetch(`${API_URL}/fileupload/upload`).then((res) => res.json());
  },
  getFileById(employeeId: number): Promise<Demo.Employee> {
    return fetch(`${API_URL}/fileupload/upload/${employeeId}`)
      .then((res) => res.json())
      .then((d) => d as Demo.Employee);
  },

getDocumentContent(employeeId: number) {
  return fetch(`${API_URL}/fileupload/get/${employeeId}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Document content fetch failed');
      }
      return res.blob(); // Response'u binary olarak al
    })
    .then((blob) => URL.createObjectURL(blob)) // Binary içeriği URL'e dönüştür
    .catch((err) => {
      console.error('Error fetching document content:', err);
      throw new Error('Error fetching document content');
    });
}

};
