'use client';
// pages/dashboard.tsx
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
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
  const { authState } = useAuthStore();
  const user = authState.user;
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
    <div className="max-w-6xl mx-auto px-6 py-18">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.username || 'User'}</h1>

      <div className="mb-6">
        <label className="cursor-pointer inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
          <input type="file" onChange={handleUpload} hidden />
          {uploading ? 'Uploading...' : 'Upload File'}
        </label>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Your Files</h2>
        {files.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No files uploaded yet.</p>
            <p className="text-gray-400 text-sm mt-2">Upload your first file to get started.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {files.map((file) => (
              <div
                key={file._id}
                className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{file.fileName}</p>
                    <p className="text-sm text-gray-500">{(file.fileSize / 1024).toFixed(2)} KB</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownload(file._id, file.fileName)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors text-sm"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleDelete(file._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
