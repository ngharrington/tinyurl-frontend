import { React, useState } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import "./App.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";


function App() {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <div className="main">
      <div styles={{ marginLeft: "0px" }}>
        <h1>make a littly bitty baby url</h1>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Paper
              component="form"
              sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Make Tiny Urls"
                inputProps={{ "aria-label": "make tiny urls" }}
              />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained">Shorten Url</Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
