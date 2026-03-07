import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProject } from "../utils/projectSlice";

function CreateProject() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    header: "",
    description: "",
    githubURL: "",
    deployURL: "",
    techStack: "",
    isPublic: true,
  });

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    setImages(files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("header", formData.header);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("githubURL", formData.githubURL);
      formDataToSend.append("deployURL", formData.deployURL);
      formDataToSend.append("isPublic", formData.isPublic);

      formData.techStack
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean)
        .forEach((tech) => formDataToSend.append("techStack", tech));

      images.forEach((img) => {
        formDataToSend.append("images", img);
      });

      const res = await axios.post(
        `${BASE_URL}/project/create`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      dispatch(addProject(res.data.project));
      navigate("/projects/my");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-blue-400 mb-8">
        🚀 Create New Project
      </h1>

      {error && (
        <div className="mb-6 p-4 bg-red-600 bg-opacity-20 border border-red-600 rounded-lg text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Header */}
        <input
          type="text"
          name="header"
          value={formData.header}
          onChange={handleChange}
          placeholder="Project Name"
          required
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg"
        />

        {/* Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Project Description"
          required
          rows="5"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg"
        />

        {/* GitHub URL */}
        <input
          type="url"
          name="githubURL"
          value={formData.githubURL}
          onChange={handleChange}
          placeholder="GitHub URL"
          required
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg"
        />

        {/* Deploy URL */}
        <input
          type="url"
          name="deployURL"
          value={formData.deployURL}
          onChange={handleChange}
          placeholder="Live Demo URL"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg"
        />

        {/* Tech Stack */}
        <input
          type="text"
          name="techStack"
          value={formData.techStack}
          onChange={handleChange}
          placeholder="React, Node, MongoDB"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg"
        />

        {/* Upload Images */}
        <div>
          <label className="text-gray-300 font-semibold">
            Project Screenshots
          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full mt-2 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg"
          />
        </div>

        {/* Image Preview */}
        {previewImages.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {previewImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="preview"
                className="rounded-lg h-24 object-cover"
              />
            ))}
          </div>
        )}

        {/* Public */}
        <div className="flex gap-3 items-center">
          <input
            type="checkbox"
            name="isPublic"
            checked={formData.isPublic}
            onChange={handleChange}
          />
          <label>Make project public</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 rounded-lg"
        >
          {loading ? "Creating..." : "🚀 Create Project"}
        </button>
      </form>
    </div>
  );
}

export default CreateProject;

// import React, { useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/const";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addProject } from "../utils/projectSlice";

// function CreateProject() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [formData, setFormData] = useState({
//     header: "",
//     description: "",
//     githubURL: "",
//     deployURL: "",
//     websiteImages: "",
//     techStack: "",
//     isPublic: true,
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       // Convert comma-separated strings to arrays
//       const payload = {
//         ...formData,
//         websiteImages: formData.websiteImages
//           ? formData.websiteImages.split(",").map((img) => img.trim())
//           : [],
//         techStack: formData.techStack
//           ? formData.techStack.split(",").map((tech) => tech.trim())
//           : [],
//       };

//       const res = await axios.post(`${BASE_URL}/project/create`, payload, {
//         withCredentials: true,
//       });

//       dispatch(addProject(res.data.project));
//       navigate("/projects/my");
//     } catch (err) {
//       setError(err.response?.data?.error || "Failed to create project");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-blue-400 mb-8">
//         🚀 Create New Project
//       </h1>

//       {error && (
//         <div className="mb-6 p-4 bg-red-600 bg-opacity-20 border border-red-600 rounded-lg text-red-400">
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Header */}
//         <div>
//           <label className="block text-gray-300 mb-2 font-semibold">
//             Project Name *
//           </label>
//           <input
//             type="text"
//             name="header"
//             value={formData.header}
//             onChange={handleChange}
//             required
//             placeholder="E-commerce Platform"
//             className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-gray-300 mb-2 font-semibold">
//             Description *
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//             rows="5"
//             placeholder="A full-stack e-commerce platform with payment integration..."
//             className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* GitHub URL */}
//         <div>
//           <label className="block text-gray-300 mb-2 font-semibold">
//             GitHub URL *
//           </label>
//           <input
//             type="url"
//             name="githubURL"
//             value={formData.githubURL}
//             onChange={handleChange}
//             required
//             placeholder="https://github.com/username/project"
//             className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Deploy URL */}
//         <div>
//           <label className="block text-gray-300 mb-2 font-semibold">
//             Live Demo URL (Optional)
//           </label>
//           <input
//             type="url"
//             name="deployURL"
//             value={formData.deployURL}
//             onChange={handleChange}
//             placeholder="https://myproject.vercel.app"
//             className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Tech Stack */}
//         <div>
//           <label className="block text-gray-300 mb-2 font-semibold">
//             Tech Stack (comma-separated)
//           </label>
//           <input
//             type="text"
//             name="techStack"
//             value={formData.techStack}
//             onChange={handleChange}
//             placeholder="React, Node.js, MongoDB, Express, Tailwind CSS"
//             className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <p className="text-sm text-gray-500 mt-1">
//             Separate technologies with commas
//           </p>
//         </div>

//         {/* Website Images */}
//         <div>
//           <label className="block text-gray-300 mb-2 font-semibold">
//             Screenshot URLs (comma-separated, optional)
//           </label>
//           <textarea
//             name="websiteImages"
//             value={formData.websiteImages}
//             onChange={handleChange}
//             rows="3"
//             placeholder="https://i.imgur.com/abc.png, https://i.imgur.com/xyz.png"
//             className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <p className="text-sm text-gray-500 mt-1">
//             Add screenshot URLs separated by commas
//           </p>
//         </div>

//         {/* Public Toggle */}
//         <div className="flex items-center gap-3">
//           <input
//             type="checkbox"
//             name="isPublic"
//             checked={formData.isPublic}
//             onChange={handleChange}
//             className="w-5 h-5 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
//           />
//           <label className="text-gray-300 font-semibold">
//             Make this project public (visible to connections)
//           </label>
//         </div>

//         {/* Buttons */}
//         <div className="flex gap-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className="flex-1 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? "Creating..." : "🚀 Create Project"}
//           </button>
//           <button
//             type="button"
//             onClick={() => navigate("/projects")}
//             className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default CreateProject;