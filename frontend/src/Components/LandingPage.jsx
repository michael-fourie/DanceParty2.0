import React, { useState, useEffect } from 'react';


import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";



function LandingPage(props) {


    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">DanceParty</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default LandingPage;