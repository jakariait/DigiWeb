"use client"; // If using App Router

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
  Box,
  TextField,
  Grid,
} from "@mui/material";
import axios from "axios";
import useAuthAdminStore from "@/store/AuthAdminStore"; // Assuming this path is correct for your project
import Link from "next/link"; // ✅ Next.js Link

const AdminList = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { token } = useAuthAdminStore();

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState(null);

  // Edit dialog states
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [editFormErrors, setEditFormErrors] = useState({});
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/admin/getall`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmins(response.data.admins);
    } catch (error) {
      console.error("Failed to fetch admins:", error); // It's good practice to log the actual error
      showSnackbar("error", "Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (adminId) => {
    setSelectedAdminId(adminId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedAdminId) return;
    try {
      await axios.delete(`${apiUrl}/admin/${selectedAdminId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showSnackbar("success", "Admin deleted successfully");
      fetchAdmins(); // Refresh the list
    } catch (error) {
      console.error("Failed to delete admin:", error);
      showSnackbar("error", "Failed to delete admin");
    } finally {
      setOpenDeleteDialog(false);
      setSelectedAdminId(null);
    }
  };

  // Edit dialog handlers
  const handleEditClick = (admin) => {
    setEditingAdmin(admin);
    setEditFormData({
      name: admin.name,
      email: admin.email,
      password: "", // Keep password empty for security; only set if user types a new one
    });
    setEditFormErrors({});
    setOpenEditDialog(true);
  };

  const handleEditFormChange = (field) => (event) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));

    // Clear error for this field when user starts typing
    if (editFormErrors[field]) {
      setEditFormErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateEditForm = () => {
    const errors = {};
    const emailRegex = /\S+@\S+\.\S+/;

    if (!editFormData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!editFormData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(editFormData.email)) {
      errors.email = "Email is invalid";
    }

    // Check if email is already taken by another admin (excluding the current admin being edited)
    if (editingAdmin && editingAdmin._id) {
      const emailExists = admins.some(
        (admin) =>
          admin.email === editFormData.email && admin._id !== editingAdmin._id,
      );
      if (emailExists) {
        errors.email = "Email is already taken by another admin";
      }
    }

    setEditFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEditSubmit = async () => {
    if (!validateEditForm()) {
      return;
    }

    setEditLoading(true);
    try {
      const updateData = {
        name: editFormData.name,
        email: editFormData.email,
      };

      // Only include password in the update if it's provided (and not just whitespace)
      if (editFormData.password.trim()) {
        updateData.password = editFormData.password;
      }

      await axios.put(`${apiUrl}/admin/${editingAdmin._id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showSnackbar("success", "Admin updated successfully");
      setOpenEditDialog(false);
      fetchAdmins(); // Refresh the list
    } catch (error) {
      console.error("Failed to update admin:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to update admin. Please try again.";
      showSnackbar("error", errorMessage);
    } finally {
      setEditLoading(false);
    }
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setEditingAdmin(null);
    setEditFormData({ name: "", email: "", password: "" });
    setEditFormErrors({});
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const showSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="calc(100vh - 200px)" // Example height, adjust as needed
      >
        <CircularProgress sx={{ color: "#f97316" }} size={60} />
      </Box>
    );
  }

  return (
    <Paper
      sx={{
        p: { xs: 1, sm: 2, md: 3 }, // Responsive padding
        boxShadow: "0 10px 25px rgba(249, 115, 22, 0.1)", // orange-500 with alpha
        border: "1px solid #fed7aa", // orange-200
        m: { xs: 1, sm: 2 }, // Responsive margin
      }}
    >
      <h1
        className="mb-6 pl-2 text-lg font-semibold text-black"
        style={{
          borderLeft: "4px solid #f97316", // orange-500 border
        }}
      >
        View and Create Admins
      </h1>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Button
          component={Link}
          href="/admin/dashboard/create-admin"
          variant="contained"
          sx={{
            backgroundColor: "#f97316", // orange-500
            color: "#000000", // black
            fontWeight: "medium",
            px: 3,
            py: 1.5,
            borderRadius: "6px",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "#ea580c", // orange-600
              boxShadow: "0 4px 15px rgba(249, 115, 22, 0.2)", // Lighter shadow on hover
              transform: "translateY(-2px)",
            },
          }}
        >
          Create Admin
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SL</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.length === 0 && !loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                  No admins found.
                </TableCell>
              </TableRow>
            ) : (
              admins.map((admin, index) => (
                <TableRow key={admin._id}>
                  <TableCell sx={{ fontWeight: "medium" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "medium" }}>
                    {admin.name}
                  </TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
                    {new Date(admin.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    {/* Centered actions */}
                    <Box display="flex" gap={1} justifyContent="center">
                      <Button
                        variant="outlined"
                        onClick={() => handleEditClick(admin)}
                        size="small"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => handleDeleteClick(admin._id)}
                        size="small"
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleEditDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Admin</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {" "}
          {/* Added padding top */}
          <Grid container spacing={3} sx={{ pt: 3 }}>
            {" "}
            {/* Consistent padding top */}
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                value={editFormData.name}
                onChange={handleEditFormChange("name")}
                error={!!editFormErrors.name}
                helperText={editFormErrors.name}
                disabled={editLoading}
                autoFocus // Autofocus on the first field
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={editFormData.email}
                onChange={handleEditFormChange("email")}
                error={!!editFormErrors.email}
                helperText={editFormErrors.email}
                disabled={editLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="New Password (optional)"
                type="password"
                fullWidth
                value={editFormData.password}
                onChange={handleEditFormChange("password")}
                error={!!editFormErrors.password}
                helperText={
                  editFormErrors.password ||
                  "Leave empty to keep current password"
                }
                disabled={editLoading}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ padding: "16px 24px" }}>
          <Button
            onClick={handleEditDialogClose}
            disabled={editLoading}
            sx={{
              color: "#6b7280", // coolGray-500
              "&:hover": {
                backgroundColor: "#f3f4f6", // coolGray-100
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditSubmit}
            disabled={editLoading}
            sx={{
              backgroundColor: "#f97316", // orange-500
              color: "#000000", // black for better contrast on orange
              "&:hover": {
                backgroundColor: "#ea580c", // orange-600
              },
              "&:disabled": {
                backgroundColor: "#d1d5db", // coolGray-300
                color: "#9ca3af", // coolGray-400
              },
            }}
            variant="contained"
          >
            {editLoading ? (
              <>
                <CircularProgress size={16} sx={{ mr: 1, color: "#9ca3af" }} />
                Updating...
              </>
            ) : (
              "Update Admin"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="delete-dialog-description"
            sx={{ color: "#000000" }}
          >
            {" "}
            {/* ensure text color */}
            Are you sure you want to delete this admin? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "16px 24px" }}>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            sx={{
              color: "#6b7280", // coolGray-500
              "&:hover": {
                backgroundColor: "#f3f4f6", // coolGray-100
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            sx={{
              backgroundColor: "#dc2626", // red-600
              color: "#ffffff", // white
              "&:hover": {
                backgroundColor: "#b91c1c", // red-700
              },
            }}
            variant="contained"
            autoFocus // Autofocus on the delete button in delete dialog
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{
            width: "100%",
            color: snackbarSeverity === "success" ? "#000000" : "#ffffff", // Black text for success (orange bg), white for others
            backgroundColor:
              snackbarSeverity === "success"
                ? "#f97316" // orange-500 for success
                : snackbarSeverity === "error"
                  ? "#dc2626" // red-600 for error
                  : snackbarSeverity === "warning"
                    ? "#f59e0b" // amber-500 for warning
                    : "#10b981", // emerald-500 for info (default)
            "& .MuiAlert-icon": {
              color: snackbarSeverity === "success" ? "#000000" : "#ffffff", // Match icon color to text
            },
          }}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default AdminList;