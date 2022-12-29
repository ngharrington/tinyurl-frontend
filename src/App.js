import { React, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import "./App.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Config from "./config/config.js";
import CopyDialog from "./components/CopyDialog.js";
import Alert from "@mui/material/Alert"

const GetApiUrl = () => {
  return Config.api_url;
};


function ErrorAlert(enable) {
  return (
    <div>
      {enable && <Alert severity="error">Enter a valid web url!</Alert>}
    </div>
  )
}

function App() {
  const [inputText, setInputText] = useState("");
  const [urlCode, setUrlCode] = useState("");
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickError = () => {
    setErrorOpen(true);
  };

  const handleClose = () => {
    setUrlCode("");
    setOpen(false);
    setInputText("");
  };

  let handleChange = (e) => {
    if (errorOpen) {
      setErrorOpen(false);
    }
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  let handleClick = (e) => {
    if (inputText === "") {
      return;
    }
    let isError = false;
    var data = {
      url: inputText,
    };
    fetch(GetApiUrl(), {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          throw Error(response.statusText);
        }
      })
      .catch(error => {
        isError = true;
        handleClickError();
      })
      .then(response => {
        var data;
        if (!isError) {
          data = response.json();
          return data;
        }
        data = "";
      })
      .catch(error => {
        isError = true;
        handleClickError();
      })
      .then(data => setUrlCode(data.Code))
      .then(() => {
        if (!isError){
          handleClickOpen()
        }
      })
      .catch(error => {
        handleClickError();
      })
      
  };

  return (
    <div className="main" style={{ paddingTop: "30px" }}>
      <div style={{ marginLeft: "5px", marginRight: "5px" }}>
        <h1 style={{ padding: "10px" }}>make a little bitty baby url</h1>
        <Grid
          container
          alignItems="stretch"
          style={{ display: "flex" }}
          spacing={2}
        >
          <Grid item xs={8}>
            <Paper component="form" elevation={4}>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="enter a url"
                label="enter your url"
                onChange={handleChange}
                value={inputText}
              />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" onClick={handleClick}>
              Shorten Url
            </Button>
          </Grid>
        </Grid>
      </div>
      <CopyDialog
        open={open}
        onClose={handleClose}
        code={urlCode}
        apiUrl={GetApiUrl()}
      />
      {ErrorAlert(errorOpen)};
    </div>
  );
}

export default App;
