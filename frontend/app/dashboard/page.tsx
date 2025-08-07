'use client';
// pages/dashboard.tsx
import { useEffect, useState } from 'react';
import  {useAuthStore } from '@/store/authStore';
import { getFiles, uploadFile, deleteFile, downloadFile } from '@/services/file';

interface FileItem {
  _id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  s3Url: string;
  createdAt: string;
}

export default function Dashboard() {
  const user = useAuthStore((state:any) => state.user);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [uploading, setUploading] = useState(false);

  const fetchFiles = async () => {
    const res = await getFiles();
    setFiles(res.files);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    await uploadFile(formData);
    setUploading(false);
    fetchFiles();
  };

  const handleDelete = async (id: string) => {
    await deleteFile(id);
    fetchFiles();
  };

  const handleDownload = async (id: string, name: string) => {
    const blob = await downloadFile(id);
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name}</h1>

      <div className="mb-6">
        <label className="cursor-pointer inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          <input type="file" onChange={handleUpload} hidden />
          {uploading ? 'Uploading...' : 'Upload File'}
        </label>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Your Files</h2>
        {files.length === 0 ? (
          <p className="text-gray-500">No files uploaded yet.</p>
        ) : (
          <ul className="space-y-4">
            {files.map((file) => (
              <li
                key={file._id}
                className="border p-4 rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{file.fileName}</p>
                  <p className="text-sm text-gray-500">{(file.fileSize / 1024).toFixed(2)} KB</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownload(file._id, file.fileName)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleDelete(file._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
