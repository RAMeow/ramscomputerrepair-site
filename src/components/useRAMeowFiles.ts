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
      const res = await fetch("/api/files");
      const data = await res.json();
      setFiles(data.files || []);
    } catch (err) {
      console.error("Failed loading files", err);
    }
  }

  async function deleteFile(key: string) {
    if (!confirm(`Delete ${key}?`)) return;
async function renameFile(oldKey: string) {
  const currentName = oldKey.split("/").pop() || oldKey;
  const newName = window.prompt("Enter new file name:", currentName);

  if (!newName || newName.trim() === "" || newName === currentName) return;

  const prefix = oldKey.includes("/") ? oldKey.slice(0, oldKey.lastIndexOf("/") + 1) : "";
  const safeNewName = newName.replace(/[^\w.\- ]+/g, "_");
  const newKey = `${prefix}${safeNewName}`;

  try {
    const res = await fetch("/api/rename", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldKey, newKey }),
    });

    if (!res.ok) {
      throw new Error("Rename failed");
    }

    if (selectedPreview === oldKey) {
      setSelectedPreview(newKey);
    }

    await loadFiles();
  } catch (err) {
    console.error("Rename failed", err);
    alert("Rename failed.");
  }
}
    try {
      await fetch("/api/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key }),
      });

      await loadFiles();
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
      lower.endsWith(".webp")
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
    renameFile,
    inferPreviewType,
  };
}
