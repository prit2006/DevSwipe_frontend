import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/const";

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        pass: "",
        age: "",
        gender: "",
        skills: "",
        photoURL: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignup = async () => {
        try {
            setError("");
            setSuccess("");

            const payload = {
                ...formData,
                age: Number(formData.age),
                skills: formData.skills
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter(Boolean)
            };

            await axios.post(`${BASE_URL}/auth/signup`, payload);

            setSuccess("Signup successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            console.error(err);
            setError(err.response?.data || "Signup failed");
        }
    };

    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">Sign Up</h2>

                    <input
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        className="input input-bordered w-full my-1"
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        className="input input-bordered w-full my-1"
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="input input-bordered w-full my-1"
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="pass"
                        placeholder="Password"
                        className="input input-bordered w-full my-1"
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        className="input input-bordered w-full my-1"
                        onChange={handleChange}
                    />

                    <select
                        name="gender"
                        className="select select-bordered w-full my-1"
                        onChange={handleChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>


                    <input
                        type="text"
                        name="skills"
                        placeholder="Skills (comma separated)"
                        className="input input-bordered w-full my-1"
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="photoURL"
                        placeholder="Photo URL"
                        className="input input-bordered w-full my-1"
                        onChange={handleChange}
                    />

                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {success && <p className="text-green-500 text-center">{success}</p>}

                    <button className="btn btn-primary mt-3" onClick={handleSignup}>
                        Create Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
