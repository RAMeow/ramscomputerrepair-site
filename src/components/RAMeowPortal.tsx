import React from "react";

export type PortalFile = {
  key: string;
  size: number;
  uploaded: string;
};

export type PortalCard = {
  title: string;
  description: string;
  tag: string;
};

type RAMeowPortalProps = {
  siteConfig: {
    businessName: string;
    logoSrc: string;
  };
  portalCards: PortalCard[];
  files: PortalFile[];
  uploading: boolean;
  uploadProgress: number;
  dragActive: boolean;
  selectedPreview: string | null;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  setDragActive: (value: boolean) => void;
  setSelectedPreview: (value: string | null) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  filteredFiles: PortalFile[];
  inferPreviewType: (key: string) => "image" | "pdf" | "other";
  uploadSelectedFile: (file: File) => Promise<void>;
  deleteFile: (key: string) => Promise<void>;
};

function PortalNavCard({
  title,
  description,
  tag,
}: {
  title: string;
  description: string;
  tag: string;
}) {
  return (
    <div className="portal-nav-card">
      <div className="portal-nav-tag">{tag}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function RAMeowPortal({
  siteConfig,
  portalCards,
  files,
  uploading,
  uploadProgress,
  dragActive,
  selectedPreview,
  searchTerm,
  setSearchTerm,
  setDragActive,
  setSelectedPreview,
  fileInputRef,
  filteredFiles,
  inferPreviewType,
  uploadSelectedFile,
  deleteFile,
}: RAMeowPortalProps) {
  return (
    <main className="page" style={{ background: "transparent" }}>
      <section className="section-dark" style={{ minHeight: "100vh", paddingTop: 40 }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: 24,
            }}
          >
            <div className="logo-row">
              <img
                src={siteConfig.logoSrc}
                alt={siteConfig.businessName}
                className="logo"
              />
              <div>
                <span className="brand-name">{siteConfig.businessName}</span>
                <span className="sub-brand">RAMeow Secure Portal</span>
              </div>
            </div>

            <a href="/" className="button-ghost">
              Back to Main Site
            </a>
          </div>

          <div className="portal-shell">
            <div className="portal-panel">
              <p className="portal-kicker">/RAMeow</p>
              <h1 className="portal-title">Owner Portal</h1>
              <p className="portal-copy">
                This is the live RAMeow portal area. RAM&apos;S EYES ONLY! KEEP OUT!
              </p>

              <div style={{ marginTop: 24 }}>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={async (e) => {
                    e.preventDefault();
                    setDragActive(false);

                    const droppedFile = e.dataTransfer.files?.[0];
                    if (!droppedFile) return;

                    try {
                      await uploadSelectedFile(droppedFile);
                      alert("Upload successful.");
                    } catch {
                      alert("Upload failed.");
                    }
                  }}
                  style={{
                    border: dragActive
                      ? "2px solid #22d3ee"
                      : "2px dashed rgba(255,255,255,.2)",
                    background: dragActive
                      ? "rgba(34,211,238,.08)"
                      : "rgba(255,255,255,.03)",
                    borderRadius: 16,
                    padding: 24,
                    textAlign: "center",
                    marginBottom: 16,
                  }}
                >
                  <p style={{ margin: 0, fontWeight: 700 }}>
                    Drag and drop a file here
                  </p>
                  <p style={{ marginTop: 8, color: "#cbd5e1" }}>
                    or use the button below
                  </p>

                  <button
                    type="button"
                    className="button-primary"
                    style={{ marginTop: 12 }}
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? "Uploading..." : "Choose File"}
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: "none" }}
                    onChange={async (e) => {
                      const chosenFile = e.target.files?.[0];
                      if (!chosenFile) return;

                      try {
                        await uploadSelectedFile(chosenFile);
                        alert("Upload successful.");
                      } catch {
                        alert("Upload failed.");
                      } finally {
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                </div>

                {uploading && (
                  <div style={{ marginTop: 12 }}>
                    <div style={{ color: "#cbd5e1", marginBottom: 8 }}>
                      Uploading... {uploadProgress}%
                    </div>

                    <div
                      style={{
                        width: "100%",
                        height: 12,
                        borderRadius: 999,
                        background: "rgba(255,255,255,.12)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${uploadProgress}%`,
                          height: "100%",
                          background: "#22d3ee",
                          transition: "width .2s ease",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div style={{ marginTop: 32 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    flexWrap: "wrap",
                    marginBottom: 12,
                  }}
                >
                  <h2 style={{ margin: 0 }}>Files</h2>

                  <input
                    type="text"
                    placeholder="Search files..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      minWidth: 260,
                      padding: 12,
                      borderRadius: 12,
                      border: "1px solid rgba(255,255,255,.15)",
                      background: "#0f172a",
                      color: "white",
                    }}
                  />
                </div>

                {filteredFiles.length === 0 ? (
                  <p style={{ color: "#cbd5e1" }}>
                    {searchTerm ? "No matching files found." : "No files uploaded yet."}
                  </p>
                ) : (
                  <div style={{ display: "grid", gap: 12 }}>
                    {filteredFiles.map((file) => {
                      return (
                        <div
                          key={file.key}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 12,
                            padding: 14,
                            borderRadius: 12,
                            border: "1px solid rgba(255,255,255,.1)",
                            background: "rgba(255,255,255,.04)",
                          }}
                        >
                          <div style={{ minWidth: 0 }}>
                            <a
                              href={`/api/download/${encodeURIComponent(file.key)}`}
                              style={{
                                color: "#67e8f9",
                                textDecoration: "none",
                                fontWeight: 600,
                                wordBreak: "break-word",
                              }}
                            >
                              {file.key}
                            </a>

                            <div
                              style={{
                                color: "#94a3b8",
                                fontSize: 12,
                                marginTop: 6,
                              }}
                            >
                              {file.size > 1048576
                                ? `${(file.size / 1048576).toFixed(2)} MB`
                                : `${(file.size / 1024).toFixed(1)} KB`}{" "}
                              • {new Date(file.uploaded).toLocaleString()}
                            </div>
                          </div>

                          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                            {(inferPreviewType(file.key) === "image" ||
                              inferPreviewType(file.key) === "pdf") && (
                              <button
                                type="button"
                                onClick={() => setSelectedPreview(file.key)}
                                style={{
                                  border: 0,
                                  background: "#334155",
                                  color: "white",
                                  padding: "10px 14px",
                                  borderRadius: 10,
                                  fontWeight: 700,
                                  cursor: "pointer",
                                }}
                              >
                                Preview
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => deleteFile(file.key)}
                              style={{
                                border: 0,
                                background: "#ef4444",
                                color: "white",
                                padding: "10px 14px",
                                borderRadius: 10,
                                fontWeight: 700,
                                cursor: "pointer",
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {selectedPreview && (
                  <div
                    style={{
                      marginTop: 24,
                      padding: 20,
                      borderRadius: 16,
                      border: "1px solid rgba(255,255,255,.1)",
                      background: "rgba(255,255,255,.04)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 16,
                      }}
                    >
                      <h3 style={{ margin: 0 }}>Preview</h3>

                      <button
                        type="button"
                        onClick={() => setSelectedPreview(null)}
                        style={{
                          border: 0,
                          background: "#334155",
                          color: "white",
                          padding: "10px 14px",
                          borderRadius: 10,
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        Close
                      </button>
                    </div>

                    {inferPreviewType(selectedPreview) === "image" && (
                      <img
                        src={`/api/download/${encodeURIComponent(selectedPreview)}`}
                        alt={selectedPreview}
                        style={{ maxWidth: "100%", borderRadius: 12 }}
                      />
                    )}

                    {inferPreviewType(selectedPreview) === "pdf" && (
                      <iframe
                        src={`/api/download/${encodeURIComponent(selectedPreview)}`}
                        title={selectedPreview}
                        style={{
                          width: "100%",
                          height: 600,
                          border: "1px solid rgba(255,255,255,.1)",
                          borderRadius: 12,
                          background: "white",
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="portal-panel">
              <p className="portal-kicker">Dashboard</p>
              <h2 className="portal-title">Owner file vault</h2>

              <div className="portal-dashboard">
                <div className="portal-stat-grid">
                  <div className="portal-stat">
                    <strong>{files.length}</strong>
                    <span className="portal-file-meta">Saved files</span>
                  </div>

                  <div className="portal-stat">
                    <strong>{filteredFiles.length}</strong>
                    <span className="portal-file-meta">Visible files</span>
                  </div>

                  <div className="portal-stat">
                    <strong>{selectedPreview ? 1 : 0}</strong>
                    <span className="portal-file-meta">Preview open</span>
                  </div>
                </div>

                <div
  style={{
    marginTop: 20,
    padding: 18,
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,.1)",
    background: "rgba(255,255,255,.04)",
  }}
>
  <h3 style={{ marginTop: 0, marginBottom: 10 }}>Vault Summary</h3>
  <div style={{ display: "grid", gap: 10 }}>
    <div className="portal-note">
      Total files stored: <strong style={{ color: "#fff" }}>{files.length}</strong>
    </div>
    <div className="portal-note">
      Files matching search: <strong style={{ color: "#fff" }}>{filteredFiles.length}</strong>
    </div>
    <div className="portal-note">
      Preview status: <strong style={{ color: "#fff" }}>{selectedPreview ? "Open" : "Closed"}</strong>
    </div>
    <div className="portal-note">
      Upload status: <strong style={{ color: "#fff" }}>{uploading ? `Uploading ${uploadProgress}%` : "Idle"}</strong>
    </div>
  </div>
</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
