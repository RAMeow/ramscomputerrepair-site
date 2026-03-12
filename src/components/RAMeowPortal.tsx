import { useMemo } from "react";
import { useRAMeowFiles } from "./useRAMeowFiles";

type PortalFile = {
  key: string;
  size: number;
  uploaded: string;
};

export default function RAMeowPortal() {
  const {
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
  } = useRAMeowFiles(true);

  function formatFileSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  }

  function handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    uploadSelectedFile(file).catch((err) => {
      console.error("Upload failed", err);
      alert("Upload failed.");
    });

    event.target.value = "";
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);

    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    uploadSelectedFile(file).catch((err) => {
      console.error("Upload failed", err);
      alert("Upload failed.");
    });
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(true);
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
  }

  const totalFiles = files.length;
  const visibleFiles = filteredFiles.length;

  const previewType = useMemo(() => {
    if (!selectedPreview) return "other";
    return inferPreviewType(selectedPreview.key);
  }, [selectedPreview, inferPreviewType]);

  const previewUrl = selectedPreview
    ? `/api/download?key=${encodeURIComponent(selectedPreview.key)}`
    : "";

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            Owner Portal
          </p>
          <h1 className="text-3xl font-bold">RAMeow Secure Portal</h1>
          <p className="mt-1 text-sm text-white/70">
            Manage uploaded files, previews, and portal storage.
          </p>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-white/60">Total Files</p>
            <p className="mt-2 text-2xl font-bold">{totalFiles}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-white/60">Visible Files</p>
            <p className="mt-2 text-2xl font-bold">{visibleFiles}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-white/60">Upload Status</p>
            <p className="mt-2 text-2xl font-bold">
              {uploading ? `${uploadProgress}%` : "Idle"}
            </p>
          </div>
        </div>

        <div className="mb-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`rounded-2xl border-2 border-dashed p-8 text-center transition ${
                dragActive
                  ? "border-cyan-300 bg-cyan-400/10"
                  : "border-white/15 bg-black/20"
              }`}
            >
              <p className="text-lg font-semibold">Drag & drop a file here</p>
              <p className="mt-2 text-sm text-white/60">
                Or choose a file manually to upload into the RAMeow portal.
              </p>

              <div className="mt-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-black transition hover:opacity-90"
                >
                  Choose File
                </button>
              </div>

              {uploading && (
                <div className="mt-4">
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full bg-cyan-300 transition-all"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="mt-2 text-sm text-white/70">
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <label className="mb-2 block text-sm text-white/70">
              Search files
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by filename..."
              className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none placeholder:text-white/35"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h2 className="mb-4 text-xl font-bold">Files</h2>

            {filteredFiles.length === 0 ? (
              <p className="text-white/60">No files found.</p>
            ) : (
              <div className="space-y-3">
                {filteredFiles.map((file: PortalFile) => {
                  const fileUrl = `/api/download?key=${encodeURIComponent(file.key)}`;

                  return (
                    <div
                      key={file.key}
                      className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 md:flex-row md:items-center md:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{file.key}</p>
                        <p className="text-sm text-white/60">
                          {formatFileSize(file.size)} • {file.uploaded}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedPreview(file)}
                          className="rounded-xl border border-cyan-300/30 bg-cyan-400/10 px-3 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/20"
                        >
                          Preview
                        </button>

                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/15"
                        >
                          Open File
                        </a>

                        <button
                          type="button"
                          onClick={() => deleteFile(file.key)}
                          className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-200 transition hover:bg-red-500/20"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h2 className="mb-4 text-xl font-bold">Preview</h2>

            {!selectedPreview ? (
              <p className="text-white/60">Select a file to preview.</p>
            ) : (
              <div className="space-y-3">
                <div>
                  <p className="break-all font-semibold">{selectedPreview.key}</p>
                  <p className="text-sm text-white/60">
                    {formatFileSize(selectedPreview.size)} •{" "}
                    {selectedPreview.uploaded}
                  </p>
                </div>

                {previewType === "image" && (
                  <img
                    src={previewUrl}
                    alt={selectedPreview.key}
                    className="max-h-[500px] w-full rounded-xl border border-white/10 object-contain"
                  />
                )}

                {previewType === "pdf" && (
                  <iframe
                    src={previewUrl}
                    title={selectedPreview.key}
                    className="h-[500px] w-full rounded-xl border border-white/10 bg-white"
                  />
                )}

                {previewType === "other" && (
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
                  >
                    Open File
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
