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
  const [selectedPreview, setSelectedPreview] = useState<PortalFile | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function loadFiles() {
    try {
      const res = await fetch("/api/files", {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Failed to load files: ${res.status}`);
      }

      const data = await res.json();
      setFiles(Array.isArray(data.files) ? data.files : []);
    } catch (err) {
      console.error("Failed loading files", err);
      setFiles([]);
    }
  }

  async function deleteFile(key: string) {
    if (!confirm(`Delete ${key}?`)) return;

    try {
      const res = await fetch("/api/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key }),
      });

      if (!res.ok) {
        throw new Error(`Delete failed: ${res.status}`);
      }

      await loadFiles();

      setSelectedPreview((current) => {
        if (current?.key === key) return null;
        return current;
      });
    } catch (err) {
      console.error("Delete failed", err);
    }
  }

  function inferPreviewType(key: string) {
    const lower = key.toLowerCase();

    if (
      lower.endsWith(".png") ||
      lower.endsWith(".jpg") ||
      lower.endsWith(".jpeg") ||
      lower.endsWith(".webp") ||
      lower.endsWith(".gif")
    ) {
      return "image";
    }

    if (lower.endsWith(".pdf")) {
      return "pdf";
    }

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

        if (xhr.status >= 200 && xhr.status < 300) {
          setUploadProgress(100);
          resolve();
        } else {
          reject(new Error(`Upload failed: ${xhr.status}`));
        }
      };

      xhr.onerror = () => {
        setUploading(false);
        reject(new Error("Upload failed due to a network error."));
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
    loadFiles,
  };
}
