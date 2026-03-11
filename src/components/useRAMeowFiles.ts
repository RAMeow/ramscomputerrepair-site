import { useEffect, useRef, useState } from "react";

export type PortalFile = {
  key: string;
  size: number;
  uploaded: string;
};

export function useRAMeowFiles(isPortalRoute: boolean) {
  const [files, setFiles] = useState<PortalFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  async function loadFiles() {
    try {
      const res = await fetch("/api/list");
      const data = await res.json();
      setFiles(data.files || []);
    } catch (err) {
      console.error("Failed loading files", err);
    }
  }

  async function deleteFile(key: string) {
    if (!confirm(`Delete ${key}?`)) return;

    try {
      await fetch(`/api/delete/${encodeURIComponent(key)}`, {
        method: "DELETE",
      });

      await loadFiles();
    } catch (err) {
      console.error("Delete failed", err);
    }
  }

  function inferPreviewType(key: string) {
    const lower = key.toLowerCase();

    if (lower.endsWith(".png") || lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".webp"))
      return "image";

    if (lower.endsWith(".pdf"))
      return "pdf";

    return "other";
  }

  async function uploadSelectedFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setUploadProgress(0);

    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        setUploadProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    const promise = new Promise<void>((resolve, reject) => {
      xhr.onload = () => {
        setUploading(false);
        setUploadProgress(100);
        resolve();
      };

      xhr.onerror = () => {
        setUploading(false);
        reject();
      };
    });

    xhr.open("POST", "/api/upload");
    xhr.send(formData);

    await promise;
    await loadFiles();
  }

  const filteredFiles = files.filter((f) =>
    f.key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (isPortalRoute) {
      loadFiles();
    }
  }, [isPortalRoute]);

  return {
    files,
    uploading,
    uploadProgress,
    dragActive,
    selectedPreview,
    searchTerm,
    fileInputRef,
    filteredFiles,

    setDragActive,
    setSelectedPreview,
    setSearchTerm,

    uploadSelectedFile,
    deleteFile,
    inferPreviewType,
  };
}
