import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
} from "@mui/material";
import { BaseUrl } from "../../../constants/constants";

function PremiumAdmin() {
  const [packages, setPackages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    validity: "",
    description: "",
    color: "",
  });

  useEffect(() => {
    fetchPremiumPackages();
  }, []);

  const fetchPremiumPackages = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}/premium/packages/`
      );
      setPackages(response.data.results);
      console.log(response.data.results, "got");
    } catch (error) {
      console.error("Error fetching premium packages:", error);
    }
  };

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        `${BaseUrl}/premium/packages/`,
        formData
      );
      setPackages([...packages, response.data]);
      handleClose();
    } catch (error) {
      console.error("Error creating premium package:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${BaseUrl}/premium/packages/${formData.id}/`,
        formData
      );
      fetchPremiumPackages();
      handleClose();
    } catch (error) {
      console.error("Error updating premium package:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BaseUrl}/premium/packages/${id}/`);
      setPackages(packages.filter((data) => data.id !== id));
    } catch (error) {
      console.error("Error deleting premium data:", error);
    }
  };

  const handleEdit = (data) => {
    setFormData(data);
    handleOpen();
  };
  console.log(packages, "packages............................");

  return (
    <div style={{ marginLeft: "15rem" }}>
      <Container style={{ marginTop: "2rem" }}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Create New Package
        </Button>
        <TableContainer component={Paper} style={{ marginTop: "2rem" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Validity</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {packages.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{data.name}</TableCell>
                  <TableCell>{data.price}</TableCell>
                  <TableCell>{data.validity}</TableCell>
                  <TableCell>{data.description}</TableCell>
                  <TableCell>{data.color}</TableCell>
                  <TableCell >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(data)}
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(data.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>


<Modal open={modalOpen} onClose={handleClose}>
  <div style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    borderRadius: 8,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: 24,
    textAlign: 'center',
  }}>
    <h2 style={{ marginBottom: 16, fontSize: 18, fontWeight: 'bold' }}>{formData.id ? 'Edit Package' : 'Create New Package'}</h2>
    <TextField label="Name" fullWidth margin="normal" name="name" value={formData.name} onChange={handleChange} />
    <TextField label="Price" fullWidth margin="normal" name="price" value={formData.price} onChange={handleChange} />
    <TextField label="Validity" fullWidth margin="normal" name="validity" value={formData.validity} onChange={handleChange} />
    <TextField label="Description" fullWidth margin="normal" name="description" value={formData.description} onChange={handleChange} />
    <TextField label="Color" fullWidth margin="normal" name="color" value={formData.color} onChange={handleChange} />
    <Button variant="contained" color="primary" onClick={formData.id ? handleUpdate : handleCreate} style={{ marginTop: 16 }}>
      {formData.id ? 'Update' : 'Create'}
    </Button>
  </div>
</Modal>






      </Container>
    </div>
  );
}

export default PremiumAdmin;
