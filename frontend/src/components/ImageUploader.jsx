import { useState, useRef } from "react";
import { FaUpload, FaTimes } from "react-icons/fa";

const ImageUploader = ({ onFileSelect, initialImage }) => {
  const [previewUrl, setPreviewUrl] = useState(initialImage || null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onFileSelect(file)
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
      onFileSelect(file);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="mb-4">
      <label className="block mb-2">Profile Image *</label>

      {previewUrl ? (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
          >
            <FaTimes />
          </button>
        </div>
      ) : (
        <div
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer"
          onClick={() => fileInputRef.current.click()}
        >
          <FaUpload className="mx-auto text-2xl text-gray-400 mb-2" />
          <p className="text-gray-500">Click to upload image</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            required
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
