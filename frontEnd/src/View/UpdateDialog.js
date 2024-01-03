import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import DialogTitle from '@mui/material/DialogTitle';
import { Axios } from "axios";


const UpdateDialog = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const sendRequest = async () => {
    const res = await Axios
      .post("http://localhost:8080/userauth//Update/:id", {
        name: formData.name,
        email: formData.email,
        password: formData.age,
        gender: formData.gender
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data.message)
    return data;
  };
  const handleSubmit = () => {
    sendRequest();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          Update the User Details
        </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="age"
                label="Age"
                value={formData.age}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="gender"
                label="Gender"
                value={formData.gender}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Button variant="contained" color="primary" type="submit">
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialog;
