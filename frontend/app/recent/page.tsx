'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { getFiles } from '@/services/file';

interface FileItem {
  _id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  s3Url: string;
  createdAt: string;
}

export default function RecentPage() {
  const { authState } = useAuthStore();
  const user = authState.user;
  const [recentFiles, setRecentFiles] = useState<FileItem[]>([]);

  const fetchRecentFiles = async () => {
    try {
      const res = await getFiles();
      // Sort by creation date to get the most recent files first
      const sortedFiles = res.files.sort((a: FileItem, b: FileItem) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      // Take only the 10 most recent files
      setRecentFiles(sortedFiles.slice(0, 10));
    } catch (error) {
      console.error('Error fetching recent files:', error);
    }
  };

  useEffect(() => {
    fetchRecentFiles();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">Recent Uploads</h1>

      {recentFiles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No recent files found.</p>
          <p className="text-gray-400 text-sm mt-2">Upload some files to see them here.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {recentFiles.map((file) => (
            <div
              key={file._id}
              className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{file.fileName}</p>
                  <p className="text-sm text-gray-500">
                    {(file.fileSize / 1024).toFixed(2)} KB • {formatDate(file.createdAt)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {file.fileType}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
