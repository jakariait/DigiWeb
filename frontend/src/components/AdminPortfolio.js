"use client";

import React, { useEffect, useState, useRef } from "react";
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
  Typography,
} from "@mui/material";
import axios from "axios";
import useAuthAdminStore from "@/store/AuthAdminStore";
import ImageComponent from "@/components/ImageComponent";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableTableRow = ({ portfolio, index, apiUrl, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: portfolio._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isDragging ? "#f5f5f5" : "inherit",
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell sx={{ fontWeight: "medium", cursor: "grab", width: 50 }}>
        <Box {...attributes} {...listeners} sx={{ cursor: "grab", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography sx={{ color: "#6b7280" }}>☰</Typography>
        </Box>
      </TableCell>
      <TableCell sx={{ fontWeight: "medium" }}>{index + 1}</TableCell>
      <TableCell>
        <Box
          sx={{
            width: 80,
            height: 60,
            position: "relative",
            overflow: "hidden",
            borderRadius: 1,
          }}
        >
          <ImageComponent
            imageName={portfolio.portfolioImg}
            altName={portfolio.name}
            skeletonHeight={60}
            className="w-full h-full object-cover"
          />
        </Box>
      </TableCell>
      <TableCell sx={{ fontWeight: "medium" }}>{portfolio.name}</TableCell>
      <TableCell>
        <a
          href={portfolio.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#f97316",
            textDecoration: "none",
          }}
        >
          {portfolio.link}
        </a>
      </TableCell>
      <TableCell align="center">
        <Box display="flex" gap={1} justifyContent="center">
          <Button
            variant="outlined"
            onClick={() => onEdit(portfolio)}
            size="small"
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            onClick={() => onDelete(portfolio._id)}
            size="small"
            sx={{
              color: "#dc2626",
              borderColor: "#dc2626",
              "&:hover": {
                backgroundColor: "#fee2e2",
                borderColor: "#b91c1c",
              },
            }}
          >
            Delete
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
};

const AdminPortfolio = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { token } = useAuthAdminStore();

  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    name: "",
    link: "",
    portfolioImg: null,
  });
  const [createFormErrors, setCreateFormErrors] = useState({});
  const [createLoading, setCreateLoading] = useState(false);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    link: "",
    portfolioImg: null,
  });
  const [editFormErrors, setEditFormErrors] = useState({});
  const [editLoading, setEditLoading] = useState(false);

  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/portfolio`);
      if (response.data.status === "success") {
        setPortfolios(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch portfolios:", error);
      showSnackbar("error", "Failed to fetch portfolios");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (portfolioId) => {
    setSelectedPortfolioId(portfolioId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedPortfolioId) return;
    setDeleteLoading(true);
    try {
      await axios.delete(`${apiUrl}/portfolio/${selectedPortfolioId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showSnackbar("success", "Portfolio deleted successfully");
      fetchPortfolios();
    } catch (error) {
      console.error("Failed to delete portfolio:", error);
      showSnackbar("error", "Failed to delete portfolio");
    } finally {
      setOpenDeleteDialog(false);
      setSelectedPortfolioId(null);
      setDeleteLoading(false);
    }
  };

  const handleCreateClick = () => {
    setCreateFormData({ name: "", link: "", portfolioImg: null });
    setCreateFormErrors({});
    setOpenCreateDialog(true);
  };

  const handleCreateFormChange = (field) => (event) => {
    if (field === "portfolioImg") {
      const file = event.target.files[0];
      if (file) {
        setCreateFormData((prev) => ({ ...prev, portfolioImg: file }));
        setCreateFormErrors((prev) => ({ ...prev, portfolioImg: "" }));
      }
    } else {
      setCreateFormData((prev) => ({ ...prev, [field]: event.target.value }));
      if (createFormErrors[field]) {
        setCreateFormErrors((prev) => ({ ...prev, [field]: "" }));
      }
    }
  };

  const validateCreateForm = () => {
    const errors = {};

    if (!createFormData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!createFormData.link.trim()) {
      errors.link = "Link is required";
    }

    if (!createFormData.portfolioImg) {
      errors.portfolioImg = "Image is required";
    }

    setCreateFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateSubmit = async () => {
    if (!validateCreateForm()) {
      return;
    }

    setCreateLoading(true);
    try {
      const formData = new FormData();
      formData.append("portfolioImg", createFormData.portfolioImg);
      formData.append("name", createFormData.name);
      formData.append("link", createFormData.link);

      await axios.post(`${apiUrl}/portfolio`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      showSnackbar("success", "Portfolio created successfully");
      setOpenCreateDialog(false);
      fetchPortfolios();
    } catch (error) {
      console.error("Failed to create portfolio:", error);
      showSnackbar("error", "Failed to create portfolio");
    } finally {
      setCreateLoading(false);
    }
  };

  const handleCreateDialogClose = () => {
    setOpenCreateDialog(false);
    setCreateFormData({ name: "", link: "", portfolioImg: null });
    setCreateFormErrors({});
  };

  const handleEditClick = (portfolio) => {
    setEditingPortfolio(portfolio);
    setEditFormData({
      name: portfolio.name,
      link: portfolio.link,
      portfolioImg: null,
    });
    setEditFormErrors({});
    setOpenEditDialog(true);
  };

  const handleEditFormChange = (field) => (event) => {
    if (field === "portfolioImg") {
      const file = event.target.files[0];
      if (file) {
        setEditFormData((prev) => ({ ...prev, portfolioImg: file }));
        setEditFormErrors((prev) => ({ ...prev, portfolioImg: "" }));
      }
    } else {
      setEditFormData((prev) => ({ ...prev, [field]: event.target.value }));
      if (editFormErrors[field]) {
        setEditFormErrors((prev) => ({ ...prev, [field]: "" }));
      }
    }
  };

  const validateEditForm = () => {
    const errors = {};

    if (!editFormData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!editFormData.link.trim()) {
      errors.link = "Link is required";
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
      const formData = new FormData();
      if (editFormData.portfolioImg) {
        formData.append("portfolioImg", editFormData.portfolioImg);
      }
      formData.append("name", editFormData.name);
      formData.append("link", editFormData.link);

      await axios.put(`${apiUrl}/portfolio/${editingPortfolio._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      showSnackbar("success", "Portfolio updated successfully");
      setOpenEditDialog(false);
      fetchPortfolios();
    } catch (error) {
      console.error("Failed to update portfolio:", error);
      showSnackbar("error", "Failed to update portfolio");
    } finally {
      setEditLoading(false);
    }
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setEditingPortfolio(null);
    setEditFormData({ name: "", link: "", portfolioImg: null });
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

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = portfolios.findIndex((p) => p._id === active.id);
      const newIndex = portfolios.findIndex((p) => p._id === over.id);

      const newPortfolios = arrayMove(portfolios, oldIndex, newIndex);
      setPortfolios(newPortfolios);

      try {
        const portfolioIds = newPortfolios.map((p) => p._id);
        
        const response = await axios.put(
          `${apiUrl}/portfolio/reorder`,
          { portfolioIds },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        showSnackbar("success", "Portfolio order saved");
      } catch (error) {
        console.error("Failed to save portfolio order:", error.response?.data || error);
        showSnackbar("error", "Failed to save portfolio order");
        fetchPortfolios();
      }
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="calc(100vh - 200px)"
      >
        <CircularProgress sx={{ color: "#f97316" }} size={60} />
      </Box>
    );
  }

  return (
    <Paper
      sx={{
        p: { xs: 1, sm: 2, md: 3 },
        boxShadow: "0 10px 25px rgba(249, 115, 22, 0.1)",
        border: "1px solid #fed7aa",
        m: { xs: 1, sm: 2 },
      }}
    >
      <h1
        className="mb-6 pl-2 text-lg font-semibold text-black"
        style={{
          borderLeft: "4px solid #f97316",
        }}
      >
        Manage Portfolio
      </h1>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Button
          onClick={handleCreateClick}
          variant="contained"
          sx={{
            backgroundColor: "#f97316",
            color: "#000000",
            fontWeight: "medium",
            px: 3,
            py: 1.5,
            borderRadius: "6px",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "#ea580c",
              boxShadow: "0 4px 15px rgba(249, 115, 22, 0.2)",
              transform: "translateY(-2px)",
            },
          }}
        >
          Add Portfolio
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 50 }}></TableCell>
              <TableCell>SL</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Link</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {portfolios.length === 0 && !loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                  No portfolios found.
                </TableCell>
              </TableRow>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={portfolios.map((p) => p._id)}
                  strategy={verticalListSortingStrategy}
                >
                  {portfolios.map((portfolio, index) => (
                    <SortableTableRow
                      key={portfolio._id}
                      portfolio={portfolio}
                      index={index}
                      apiUrl={apiUrl}
                      onEdit={handleEditClick}
                      onDelete={handleDeleteClick}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Dialog */}
      <Dialog
        open={openCreateDialog}
        onClose={handleCreateDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Portfolio</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={3} sx={{ pt: 3 }}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                value={createFormData.name}
                onChange={handleCreateFormChange("name")}
                error={!!createFormErrors.name}
                helperText={createFormErrors.name}
                disabled={createLoading}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Link"
                fullWidth
                value={createFormData.link}
                onChange={handleCreateFormChange("link")}
                error={!!createFormErrors.link}
                helperText={createFormErrors.link}
                disabled={createLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{
                  py: 2,
                  borderColor: createFormErrors.portfolioImg
                    ? "#dc2626"
                    : "#d1d5db",
                  color: createFormData.portfolioImg ? "#000000" : "#6b7280",
                }}
              >
                {createFormData.portfolioImg
                  ? createFormData.portfolioImg.name
                  : "Upload Image"}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  ref={fileInputRef}
                  onChange={handleCreateFormChange("portfolioImg")}
                />
              </Button>
              {createFormErrors.portfolioImg && (
                <Typography
                  variant="caption"
                  sx={{ color: "#dc2626", display: "block", mt: 1 }}
                >
                  {createFormErrors.portfolioImg}
                </Typography>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ padding: "16px 24px" }}>
          <Button
            onClick={handleCreateDialogClose}
            disabled={createLoading}
            sx={{
              color: "#6b7280",
              "&:hover": {
                backgroundColor: "#f3f4f6",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateSubmit}
            disabled={createLoading}
            sx={{
              backgroundColor: "#f97316",
              color: "#000000",
              "&:hover": {
                backgroundColor: "#ea580c",
              },
              "&:disabled": {
                backgroundColor: "#d1d5db",
                color: "#9ca3af",
              },
            }}
            variant="contained"
          >
            {createLoading ? (
              <>
                <CircularProgress size={16} sx={{ mr: 1, color: "#9ca3af" }} />
                Creating...
              </>
            ) : (
              "Add Portfolio"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleEditDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Portfolio</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={3} sx={{ pt: 3 }}>
            <Grid item xs={12}>
              <Box
                sx={{
                  width: 120,
                  height: 80,
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 1,
                  mb: 2,
                }}
              >
                <ImageComponent
                  imageName={editingPortfolio?.portfolioImg}
                  altName={editingPortfolio?.name}
                  skeletonHeight={80}
                  className="w-full h-full object-cover"
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                value={editFormData.name}
                onChange={handleEditFormChange("name")}
                error={!!editFormErrors.name}
                helperText={editFormErrors.name}
                disabled={editLoading}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Link"
                fullWidth
                value={editFormData.link}
                onChange={handleEditFormChange("link")}
                error={!!editFormErrors.link}
                helperText={editFormErrors.link}
                disabled={editLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{
                  py: 2,
                  borderColor: "#d1d5db",
                  color: editFormData.portfolioImg ? "#000000" : "#6b7280",
                }}
              >
                {editFormData.portfolioImg
                  ? editFormData.portfolioImg.name
                  : "Change Image (optional)"}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  ref={editFileInputRef}
                  onChange={handleEditFormChange("portfolioImg")}
                />
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ padding: "16px 24px" }}>
          <Button
            onClick={handleEditDialogClose}
            disabled={editLoading}
            sx={{
              color: "#6b7280",
              "&:hover": {
                backgroundColor: "#f3f4f6",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditSubmit}
            disabled={editLoading}
            sx={{
              backgroundColor: "#f97316",
              color: "#000000",
              "&:hover": {
                backgroundColor: "#ea580c",
              },
              "&:disabled": {
                backgroundColor: "#d1d5db",
                color: "#9ca3af",
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
              "Update Portfolio"
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
          <DialogContentText id="delete-dialog-description" sx={{ color: "#000000" }}>
            Are you sure you want to delete this portfolio? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "16px 24px" }}>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            disabled={deleteLoading}
            sx={{
              color: "#6b7280",
              "&:hover": {
                backgroundColor: "#f3f4f6",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            disabled={deleteLoading}
            sx={{
              backgroundColor: "#dc2626",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#b91c1c",
              },
            }}
            variant="contained"
          >
            {deleteLoading ? (
              <>
                <CircularProgress size={16} sx={{ mr: 1, color: "#ffffff" }} />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
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
            color: snackbarSeverity === "success" ? "#000000" : "#ffffff",
            backgroundColor:
              snackbarSeverity === "success"
                ? "#f97316"
                : snackbarSeverity === "error"
                  ? "#dc2626"
                  : snackbarSeverity === "warning"
                    ? "#f59e0b"
                    : "#10b981",
            "& .MuiAlert-icon": {
              color: snackbarSeverity === "success" ? "#000000" : "#ffffff",
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

export default AdminPortfolio;