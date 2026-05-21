import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  FaStar,
  FaEdit,
  FaTrash,
  FaTimes,
  FaGalacticSenate,
} from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import ImageUploader from "../../ImageUploader";

const ReviewManagement = () => {
  const { getReviews, createReview, updateReview, deleteReview } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [currentReview, setCurrentReview] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const deleteReviewData = async (id) => {
    const response = await deleteReview(id);
    if (response.status === 200) {
      fetchReviews();
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await getReviews();
      setReviews(response.data.reviews || []);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  const handleOpenDialog = (review = null) => {
    setCurrentReview(
      review || {
        name: "",
        rating: 0,
        title: "",
        comment: "",
      }
    );
    setImageFile(null);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", currentReview.name);
    formData.append("rating", currentReview.rating);
    formData.append("title", currentReview.title);
    formData.append("comment", currentReview.comment);
    if (imageFile) {
      formData.append("file", imageFile); // Append file directly
    }

    try {
      if (currentReview?._id) {
        await updateReview(currentReview._id, formData);
      } else {
        await createReview(formData);
      }
      fetchReviews();
      handleCloseDialog();
    } catch (error) {
      console.error("Operation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentReview(null);
    setImageFile(null);
  };

  // Star Rating Component
  const StarRating = ({ rating, onChange, readOnly = false }) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => !readOnly && onChange(i + 1)}
          className={`text-${rating > i ? "yellow-400" : "gray-300"} text-xl`}
          disabled={readOnly}
        >
          <FaStar />
        </button>
      ))}
    </div>
  );
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Review Management</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          onClick={() => handleOpenDialog()}
        >
          Add New Review
        </button>
      </div>

      {/* Reviews Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">User</th>
              <th className="py-3 px-4 text-left">Rating</th>
              <th className="py-3 px-4 text-left">Comment</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    {review.image && (
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                      />
                    )}
                    <div>
                      <div className="font-medium">{review.name}</div>
                      <div className="text-gray-500 text-sm">
                        {review.title}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <StarRating rating={review.rating} readOnly />
                </td>
                <td className="py-3 px-4 max-w-xs">
                  <div className="line-clamp-2">{review.comment}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleOpenDialog(review)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => deleteReviewData(review._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Responsive Create/Edit Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md mx-4 shadow-2xl overflow-y-auto max-h-[95vh]">
            <div className="flex justify-between items-center p-4 sticky top-0 bg-white z-10 border-b">
              <h2 className="text-xl font-bold">
                {currentReview?._id ? "Edit Review" : "Add New Review"}
              </h2>
              <button
                onClick={handleCloseDialog}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">Name *</label>
                  <input
                    type="text"
                    value={currentReview?.name || ""}
                    onChange={(e) =>
                      setCurrentReview({
                        ...currentReview,
                        name: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Title *</label>
                  <input
                    type="text"
                    value={currentReview?.title || ""}
                    onChange={(e) =>
                      setCurrentReview({
                        ...currentReview,
                        title: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium">Review Image</label>
                <ImageUploader
                  onFileSelect={setImageFile}
                  initialImage={currentReview?.image}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">Rating *</label>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <StarRating
                      rating={currentReview?.rating || 0}
                      onChange={(rating) =>
                        setCurrentReview({
                          ...currentReview,
                          rating,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 font-medium">Comment *</label>
                  <textarea
                    value={currentReview?.comment || ""}
                    onChange={(e) =>
                      setCurrentReview({
                        ...currentReview,
                        comment: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-lg min-h-[100px]"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  className={`px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 ${
                    loading ? "hidden" : ""
                  }`}
                  onClick={handleCloseDialog}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {loading ? (
                    <FiLoader className="animate-spin" />
                  ) : currentReview?._id ? (
                    "Update"
                  ) : (
                    "Create"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewManagement;
