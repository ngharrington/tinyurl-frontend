import { React, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import "./App.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Config from './config/config.js'
import CopyDialog from './components/CopyDialog.js'

const GetApiUrl = () => {
  return Config.api_url;
}


function App() {
  const [inputText, setInputText] = useState("");
  const [urlCode, setUrlCode] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setUrlCode("");
    setOpen(false);
    setInputText("");
  };

  let handleChange = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  }

  let handleClick = (e) => {
    if (inputText === "") {
      return
    }
    var raw = inputText;
    var data = {
      "url": raw 
    };
    fetch(GetApiUrl() + "/tiny", {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => setUrlCode(data.Code));
    handleClickOpen();
  }

  return (
    <div className="main" style={{paddingTop: "30px"}}>
      <div style={{ marginLeft: "5px", marginRight: "5px" }}>
        <h1 style={{ padding: "10px" }}>make a little bitty baby url</h1>
        <Grid container alignItems="stretch" style={{ display: "flex" }} spacing={2}>
          <Grid item xs={8}>
            <Paper
              component="form"
              elevation={4}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Make Tiny Urls"
                label="enter your url"
                onChange={handleChange}
                value={inputText}
              />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" onClick={handleClick}>Shorten Url</Button>
          </Grid>
        </Grid>
      </div>
      <CopyDialog
        open={open}
        onClose={handleClose}
        code={urlCode}
        apiUrl={GetApiUrl() + "/gtiny"}
      />
    </div>
  );
}

export default App;
