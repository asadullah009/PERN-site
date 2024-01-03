import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import UpdateDialog from "../View/UpdateDialog";

axios.defaults.withCredentials = true;
let first = true;

const Welcome = () => {
  const [user, setUser] = useState();
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  

  const refresh = async () => {
  
    const res = await axios.get("http://localhost:8080/userauth/refresh", {
      withCredentials: true,
    }).catch(err => {
      console.error(err);
    })
  
  const data = res.data;
  setUser(data.user);
}
  const sendRequest = async () => {
    try {
      const res = await axios.get("http://localhost:8080/userauth/user", {
        withCredentials: true,
      });
      const data = res.data;
      setUser(data.user);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if(first){
      first = false;
      sendRequest();
    }
    let intervel = setInterval(() =>{
      refresh();
    }, 20*1000)

    return ()=>clearInterval(intervel);

  }, []);

  const handleUpdate = () => {
    setUpdateDialogOpen(true);
  };

  const handleClose = () => {
    setUpdateDialogOpen(false);
  };
  

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100dvh',

      }}
    >
      <Card sx={{
        width: '60%',
      }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar alt="Profile Picture" src={user?.profilePicture} sx={{ width: 100, height: 100 }} />
          </Box>
          <Typography variant="h5" component="div" gutterBottom align="center">
            User Profile
          </Typography>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Typography variant="body2" color="textSecondary">Name:</Typography>
              <Typography variant="body1">{user?.name}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="textSecondary">Email:</Typography>
              <Typography variant="body1">{user?.email}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="body2" color="textSecondary">Age:</Typography>
              <Typography variant="body1">{user?.age}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="textSecondary">Gender:</Typography>
              <Typography variant="body1">{user?.gender}</Typography>
            </Grid>
            <Grid item sx={{ textAlign: 'center' }}>
              <Button variant="contained" color="primary" onClick={handleUpdate}>
                Update
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {
        updateDialogOpen && <UpdateDialog open={updateDialogOpen} handleClose={handleClose} />
      }
    </Box>
  );
};

export default Welcome;
