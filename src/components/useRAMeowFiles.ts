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
      const res = await fetch("/api/files", {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Failed to load files: ${res.status}`);
      }

      const data = await res.json();
      setFiles(Array.isArray(data.files) ? data.files : []);
    } catch (error) {
      console.error("Failed loading files:", error);
      setFiles([]);
    }
  }

  async function uploadSelectedFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setUploadProgress(0);

    const xhr = new XMLHttpRequest();

    const uploadPromise = new Promise<void>((resolve, reject) => {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          setUploadProgress(Math.round((event.loaded / event.total) * 100));
        }
      };

      xhr.onload = async () => {
        setUploading(false);

        if (xhr.status >= 200 && xhr.status < 300) {
          setUploadProgress(100);
          await loadFiles();
          resolve();
        } else {
          reject(new Error(`Upload failed: ${xhr.status}`));
        }
      };

      xhr.onerror = () => {
        setUploading(false);
        reject(new Error("Upload failed due to network error"));
      };
    });

    xhr.open("POST", "/api/upload");
    xhr.send(formData);

    return uploadPromise;
  }

  async function deleteFile(key: string) {
    const confirmed = window.confirm(`Delete "${key}"?`);
    if (!confirmed) return;

    try {
      const res = await fetch("/api/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || `Delete failed: ${res.status}`);
      }

      if (selectedPreview === key) {
        setSelectedPreview(null);
      }

      await loadFiles();
    } catch (error) {
      console.error("Delete failed:", error);
      alert(error instanceof Error ? error.message : "Delete failed.");
    }
  }

  async function renameFile(oldKey: string, newKey: string) {
    const trimmedNewKey = newKey.trim();

    if (!trimmedNewKey) {
      alert("Please enter a new filename.");
      return false;
    }

    if (trimmedNewKey === oldKey) {
      return true;
    }

    try {
      const res = await fetch("/api/rename", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldKey,
          newKey: trimmedNewKey,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || `Rename failed: ${res.status}`);
      }

      if (selectedPreview === oldKey) {
        setSelectedPreview(trimmedNewKey);
      }

      await loadFiles();
      return true;
    } catch (error) {
      console.error("Rename failed:", error);
      alert(error instanceof Error ? error.message : "Rename failed.");
      return false;
    }
  }

  function inferPreviewType(key: string): "image" | "pdf" | "other" {
    const lower = key.toLowerCase();

    if (
      lower.endsWith(".png") ||
      lower.endsWith(".jpg") ||
      lower.endsWith(".jpeg") ||
      lower.endsWith(".webp") ||
      lower.endsWith(".gif") ||
      lower.endsWith(".bmp") ||
      lower.endsWith(".svg")
    ) {
      return "image";
    }

    if (lower.endsWith(".pdf")) {
      return "pdf";
    }

    return "other";
  }

  const filteredFiles = files.filter((file) => {
    const fileName = file.key.split("/").pop()?.toLowerCase() || file.key.toLowerCase();
    return fileName.includes(searchTerm.toLowerCase());
  });

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
    loadFiles,
    uploadSelectedFile,
    deleteFile,
    renameFile,
    inferPreviewType,
  };
}
