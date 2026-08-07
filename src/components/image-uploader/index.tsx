import { useCallback, useRef, useState } from "react";
import { supabaseClient } from "../../providers/supabase-client";

interface ImageUploaderProps {
  value?: string;
  onChange?: (url: string) => void;
  label?: string;
  field?: string; // sub-folder inside bucket, e.g. "events" | "articles"
}

export const ImageUploader = ({
  value,
  onChange,
  label = "Image",
  field = "uploads",
}: ImageUploaderProps) => {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(
    async (file: File) => {
      setError(null);
      if (!file.type.startsWith("image/")) {
        setError("Only image files are supported.");
        return;
      }

      setUploading(true);
      try {
        const ext = file.name.split(".").pop();
        const path = `${field}/${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}.${ext}`;

        const { error: uploadError } = await supabaseClient.storage
          .from("public-assets")
          .upload(path, file, { upsert: false });

        if (uploadError) throw uploadError;

        const { data } = supabaseClient.storage
          .from("public-assets")
          .getPublicUrl(path);

        onChange?.(data.publicUrl);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Upload failed.");
      } finally {
        setUploading(false);
      }
    },
    [field, onChange]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) uploadFile(file);
    },
    [uploadFile]
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) uploadFile(file);
    },
    [uploadFile]
  );

  return (
    <div style={{ marginBottom: 16 }}>
      <label className="form-label" style={{ display: "block", marginBottom: 6 }}>
        {label}
      </label>

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        style={{
          border: `2px dashed ${dragging ? "var(--accent)" : "var(--border)"}`,
          borderRadius: "var(--radius)",
          padding: "28px 16px",
          textAlign: "center",
          cursor: uploading ? "not-allowed" : "pointer",
          background: dragging ? "var(--accent-light)" : "var(--surface-2)",
          transition: "border-color 0.18s ease, background 0.18s ease",
          minHeight: 130,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        {uploading ? (
          <>
            <span style={{ fontSize: 28 }}>⏳</span>
            <p style={{ margin: 0, color: "#6b7280" }}>Uploading…</p>
          </>
        ) : value ? (
          <>
            <img
              src={value}
              alt="Uploaded preview"
              style={{
                maxHeight: 160,
                maxWidth: "100%",
                borderRadius: 6,
                objectFit: "contain",
              }}
            />
            <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>
              Click or drag a new image to replace
            </p>
          </>
        ) : (
          <>
            <span style={{ fontSize: 36 }}>🖼️</span>
            <p style={{ margin: 0, color: "#374151", fontWeight: 500 }}>
              Drag & drop an image here
            </p>
            <p style={{ margin: 0, fontSize: 12, color: "#9ca3af" }}>
              or click to browse — PNG, JPG, GIF, WebP
            </p>
          </>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={onInputChange}
      />

      {/* URL preview */}
      {value && (
        <p
          style={{
            margin: "6px 0 0",
            fontSize: 11,
            color: "#6b7280",
            wordBreak: "break-all",
          }}
        >
          Stored URL: {value}
        </p>
      )}

      {/* Error */}
      {error && (
        <p style={{ margin: "6px 0 0", color: "#dc2626", fontSize: 13 }}>
          ⚠ {error}
        </p>
      )}
    </div>
  );
};
