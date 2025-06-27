"use client";

import React, { useState } from "react";
import { TextField, Snackbar, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";
import useAuthAdminStore from "@/store/AuthAdminStore";

const AdminCreate = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { token } = useAuthAdminStore();

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${apiUrl}/admin/create`,
        { ...formData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSnackbar({
        open: true,
        message: "Admin created successfully",
        severity: "success",
      });
      // Delay navigation by 2 seconds
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 2000);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to create admin",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Custom styles for Material-UI components
  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#f97316', // orange-500
      },
      '&:hover fieldset': {
        borderColor: '#ea580c', // orange-600
      },
      '&.Mui-focused fieldset': {
        borderColor: '#f97316', // orange-500
      },
    },
    '& .MuiInputLabel-root': {
      color: '#000000',
      '&.Mui-focused': {
        color: '#f97316', // orange-500
      },
    },
    '& .MuiOutlinedInput-input': {
      color: '#000000',
    },
  };

  return (
    <div className="p-4 shadow-lg rounded-lg bg-white border border-gray-200">
      <h1
        className="mb-6 pl-2 text-lg font-semibold text-black"
        style={{
          borderLeft: '4px solid #f97316' // orange-500 border
        }}
      >
        Create New Admin
      </h1>

      <div className="flex gap-4">
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={textFieldStyle}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={textFieldStyle}
        />
      </div>

      <div className="flex gap-4">

        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={textFieldStyle}
        />
      </div>

      <div className="flex justify-center mt-6">
        <button
          className={`
            px-6 py-3 rounded-md cursor-pointer font-medium transition-all duration-200
            ${loading
            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
            : 'bg-orange-500 hover:bg-orange-600 text-black hover:shadow-lg transform hover:-translate-y-0.5'
          }
          `}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Admin"}
        </button>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          sx={{
            backgroundColor: snackbar.severity === 'success' ? '#f97316' : undefined,
            color: snackbar.severity === 'success' ? '#000000' : undefined,
            '& .MuiAlert-icon': {
              color: snackbar.severity === 'success' ? '#000000' : undefined,
            }
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminCreate;