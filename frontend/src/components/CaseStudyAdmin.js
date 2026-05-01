"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Snackbar,
  Alert,
  DialogContentText,
} from "@mui/material";
import { Edit, Delete, DragIndicator } from "@mui/icons-material";
import useAuthAdminStore from "@/store/AuthAdminStore";
import { Editor } from "primereact/editor";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const DraggableTableRow = ({ study, handleEditClick, handleDeleteClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: study._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow ref={setNodeRef} style={style} {...attributes}>
      <TableCell>
        <div {...listeners} style={{ cursor: "grab" }}>
          <DragIndicator />
        </div>
      </TableCell>
      <TableCell>{study.title}</TableCell>
      <TableCell>{study.industry}</TableCell>
      <TableCell>{study.brandTitle}</TableCell>
      <TableCell>
        <IconButton onClick={() => handleEditClick(study.slug)}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => handleDeleteClick(study.slug)}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

const CaseStudyAdmin = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSlug, setCurrentSlug] = useState(null);
  const [formData, setFormData] = useState({
    brandTitle: "",
    brandWebsite: "",
    founder: "",
    businessStarted: "",
    industry: "",
    title: "",
    keyResults: "",
    description: "",
    brandLogo: null,
    caseStudyThumbnail: null,
  });
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [slugToDelete, setSlugToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const { token } = useAuthAdminStore();

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    if (token) {
      fetchCaseStudies();
    }
  }, [token]);

  const fetchCaseStudies = async () => {
    try {
      const response = await api.get(`/casestudy`);
      setCaseStudies(response.data.data);
    } catch (error) {
      console.error("Error fetching case studies:", error);
    }
  };

  const handleClickOpen = () => {
    setIsEditing(false);
    setFormData({
      brandTitle: "",
      brandWebsite: "",
      founder: "",
      businessStarted: "",
      industry: "",
      title: "",
      keyResults: "",
      description: "",
      brandLogo: null,
      caseStudyThumbnail: null,
    });
    setOpen(true);
  };

  const handleEditClick = async (slug) => {
    try {
      const response = await api.get(`/casestudy/${slug}`);
      const data = response.data.data;
      setFormData({
        brandTitle: data.brandTitle,
        brandWebsite: data.brandWebsite,
        founder: data.founder,
        businessStarted: data.businessStarted,
        industry: data.industry,
        title: data.title,
        keyResults: data.keyResults,
        description: data.description,
        brandLogo: null,
        caseStudyThumbnail: null,
      });
      setIsEditing(true);
      setCurrentSlug(slug);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching case study for edit:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    if (e && e.target && e.target.name === "description") {
      setFormData({ ...formData, description: e.htmlValue });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (key === "brandLogo" || key === "caseStudyThumbnail") {
        if (value) {
          submissionData.append(key, value);
        }
      } else {
        submissionData.append(key, value ?? "");
      }
    });

    try {
      if (isEditing) {
        await api.put(`/casestudy/${currentSlug}`, submissionData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSnackbarMessage("Case study updated successfully!");
      } else {
        await api.post("/casestudy", submissionData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSnackbarMessage("Case study created successfully!");
      }
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      fetchCaseStudies();
      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      setSnackbarMessage("Error submitting form.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDeleteClick = (slug) => {
    setSlugToDelete(slug);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (slugToDelete) {
      try {
        await api.delete(`/casestudy/${slugToDelete}`);
        fetchCaseStudies();
        setSnackbarMessage("Case study deleted successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error deleting case study:", error);
        setSnackbarMessage("Error deleting case study.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
    setDeleteConfirmOpen(false);
    setSlugToDelete(null);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setCaseStudies((items) => {
        const oldIndex = items.findIndex((item) => item._id === active.id);
        const newIndex = items.findIndex((item) => item._id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);

        const orderedIds = newItems.map((item) => item._id);
        api
          .put("/casestudy/reorder", { orderedIds })
          .then(() => {
            setSnackbarMessage("Case study order updated successfully!");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            fetchCaseStudies();
          })
          .catch(() => {
            setSnackbarMessage("Error updating case study order.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            // Optionally revert state on failure
            fetchCaseStudies();
          });

        return newItems;
      });
    }
  };

  return (
    <div className={"xl:container xl:mx-auto p-4"}>
      <Button variant="contained" onClick={handleClickOpen} sx={{ mb: 2 }}>
        Add New Case Study
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {isEditing ? "Edit Case Study" : "Add Case Study"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="brandTitle"
              label="Brand Title"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.brandTitle}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="brandWebsite"
              label="Brand Website"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.brandWebsite}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="founder"
              label="Founder"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.founder}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="businessStarted"
              label="Business Started"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.businessStarted}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="industry"
              label="Industry"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.industry}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="keyResults"
              label="Key Results"
              type="text"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={formData.keyResults}
              onChange={handleChange}
            />
            <Editor
              value={formData.description}
              onTextChange={(e) =>
                handleChange({
                  target: { name: "description" },
                  htmlValue: e.htmlValue,
                })
              }
              style={{ height: "320px" }}
            />

            <Button variant="contained" component="label" sx={{ mt: 2 }}>
              Upload Brand Logo
              <input
                type="file"
                name="brandLogo"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            {formData.brandLogo && <p>{formData.brandLogo.name}</p>}
            <Button variant="contained" component="label" sx={{ mt: 2, ml: 2 }}>
              Upload Case Study Thumbnail
              <input
                type="file"
                name="caseStudyThumbnail"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            {formData.caseStudyThumbnail && (
              <p>{formData.caseStudyThumbnail.name}</p>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this case study? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "5%" }} />
                <TableCell>Title</TableCell>
                <TableCell>Industry</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <SortableContext
              items={caseStudies.map((s) => s._id)}
              strategy={verticalListSortingStrategy}
            >
              <TableBody>
                {caseStudies.map((study) => (
                  <DraggableTableRow
                    key={study._id}
                    study={study}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                ))}
              </TableBody>
            </SortableContext>
          </Table>
        </TableContainer>
      </DndContext>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CaseStudyAdmin;
