import React, { useState, useCallback } from "react";
import axios from "axios";

const MultipleImageUploader = ({
  onChange,
  maxFiles = 5,
  initialImages = [],
}) => {
  const [files, setFiles] = useState(() =>
    initialImages.map((url) => ({
      url,
      status: "done",
      id: Math.random().toString(36).substr(2, 9),
    }))
  );
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = useCallback(
    async (e) => {
      const newFiles = Array.from(e.target.files);
      if (!newFiles.length) return;

      // Check file limit
      if (files.length + newFiles.length > maxFiles) {
        alert(`Maximum ${maxFiles} files allowed`);
        return;
      }

      setIsUploading(true);

      // Create preview items
      const newItems = newFiles.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
        status: "uploading",
        id: Math.random().toString(36).substr(2, 9),
      }));

      setFiles((prev) => [...prev, ...newItems]);

      try {
        // Upload all files in parallel
        const uploadPromises = newFiles.map((file) => {
          const formData = new FormData();
          formData.append("images", file); // Note plural 'images'
          return axios.post("/api/upload-multiple", formData);
        });

        const responses = await Promise.all(uploadPromises);
        const urls = responses.map((res) => res.data.url);

        // Update state with uploaded URLs
        setFiles((prev) =>
          prev.map((item) => {
            const index = newItems.findIndex((i) => i.id === item.id);
            return index !== -1
              ? { ...item, status: "done", url: urls[index] }
              : item;
          })
        );

        // Notify parent of all uploaded URLs
        onChange([
          ...files.filter((f) => f.status === "done").map((f) => f.url),
          ...urls,
        ]);
      } catch (error) {
        console.error("Upload failed:", error);
        setFiles((prev) =>
          prev.map((item) =>
            newItems.some((i) => i.id === item.id)
              ? { ...item, status: "error" }
              : item
          )
        );
      } finally {
        setIsUploading(false);
      }
    },
    [files, maxFiles, onChange]
  );

  const handleRemove = (id) => {
    const updatedFiles = files.filter((file) => file.id !== id);
    setFiles(updatedFiles);
    onChange(updatedFiles.filter((f) => f.status === "done").map((f) => f.url));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-gray-300"
          >
            {file.previewUrl || file.url ? (
              <img
                src={file.previewUrl || file.url}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="bg-gray-200 border-2 border-dashed rounded-full w-full h-full" />
            )}

            {file.status === "uploading" && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {file.status === "error" && (
              <div className="absolute inset-0 bg-red-500 bg-opacity-70 flex items-center justify-center">
                <span className="text-white text-xs text-center">Failed</span>
              </div>
            )}

            <button
              type="button"
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              onClick={() => handleRemove(file.id)}
            >
              ×
            </button>
          </div>
        ))}

        {files.length < maxFiles && (
          <label className="cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
              {isUploading ? (
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
        )}
      </div>

      <p className="text-sm text-gray-500">
        {files.length} of {maxFiles} files uploaded
      </p>
    </div>
  );
};

export default MultipleImageUploader;
