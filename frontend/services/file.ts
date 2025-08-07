// services/file.ts
import API from '@/lib/axios';

export const uploadFile = async (formData: FormData) => {
  const res = await API.post('/files/upload', formData);
  return res.data;
};

export const getFiles = async () => {
  const res = await API.get('/files');
  return res.data;
};

export const deleteFile = async (fileId: string) => {
  const res = await API.delete(`/files/${fileId}`);
  return res.data;
};

export const downloadFile = async (fileId: string) => {
  const res = await API.get(`/files/download/${fileId}`, {
    responseType: 'blob',
  });
  return res.data;
};
