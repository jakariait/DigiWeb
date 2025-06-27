"use client";

import { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import useAuthAdminStore from "@/store/AuthAdminStore";

const columns = [
  { id: "serialNumber", label: "S.No.", minWidth: 50, align: "center" },
  { id: "fullName", label: "Name", minWidth: 100 },
  { id: "phoneNumber", label: "Phone Number", minWidth: 100 },
  { id: "emailAddress", label: "Email Address", minWidth: 100 },
  { id: "services", label: "Services", minWidth: 100 },
  { id: "message", label: "Message", minWidth: 270 },
  { id: "served", label: "Status", minWidth: 100, align: "center" },
  { id: "actions", label: "Actions", minWidth: 100, align: "center" },
];

const ContactTable = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { token } = useAuthAdminStore();

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [deleteTarget, setDeleteTarget] = useState(null); // holds contact to delete

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(`${apiUrl}/contacts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch contacts");
        const data = await res.json();
        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setContacts(sortedData);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchContacts();
  }, [apiUrl, token]);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleToggleServed = async (id) => {
    const contact = contacts.find((c) => c._id === id);
    if (!contact) return;

    const updated = { ...contact, served: !contact.served };

    try {
      const res = await fetch(`${apiUrl}/contacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updated),
      });

      if (!res.ok) throw new Error("Failed to update status");

      setContacts((prev) => prev.map((c) => (c._id === id ? updated : c)));
    } catch (err) {
      alert(err.message);
    }
  };

  const confirmDelete = async () => {
    if (!token || !deleteTarget) return;

    try {
      const res = await fetch(`${apiUrl}/contacts/${deleteTarget._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete contact");
      setContacts((prev) => prev.filter((c) => c._id !== deleteTarget._id));
      setDeleteTarget(null); // close dialog
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Paper
      sx={{
        p: { xs: 1, sm: 2, md: 3 }, // Responsive padding
        boxShadow: "0 10px 25px rgba(249, 115, 22, 0.1)", // orange-500 with alpha
        border: "1px solid #fed7aa", // orange-200
        m: { xs: 1, sm: 2 }, // Responsive margin
      }}
    >
      <h1 className="border-l-4 border-orange-500 mb-6 pl-2 text-lg font-semibold">
        Contact Request
      </h1>

      {loading ? (
        <div className="flex justify-center p-4">
          <CircularProgress />
        </div>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell
                      key={col.id}
                      align={col.align}
                      style={{ minWidth: col.minWidth }}
                    >
                      {col.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts.length > 0 ? (
                  contacts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((contact, i) => (
                      <TableRow key={contact._id} hover>
                        {columns.map((col) => {
                          const value =
                            col.id === "serialNumber"
                              ? page * rowsPerPage + i + 1
                              : contact[col.id];

                          if (col.id === "served") {
                            return (
                              <TableCell key={col.id} align="center">
                                <Button
                                  variant="contained"
                                  color={value ? "success" : "error"}
                                  onClick={() =>
                                    handleToggleServed(contact._id)
                                  }
                                >
                                  {value ? "Served" : "Pending"}
                                </Button>
                              </TableCell>
                            );
                          }

                          if (col.id === "actions") {
                            return (
                              <TableCell key={col.id} align="center">
                                <Button
                                  variant="outlined"
                                  color="error"
                                  onClick={() => setDeleteTarget(contact)}
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            );
                          }

                          return (
                            <TableCell key={col.id} align={col.align}>
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      No contacts available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 30, 50, 100]}
            component="div"
            count={contacts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this contact?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ContactTable;