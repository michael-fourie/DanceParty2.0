import React, { useState, useRef } from 'react'

//import { Card, Elevation, Eleveation } from "@blueprintjs/core"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"


import RecordComponent from "../Components/RecordComponent";

function RecordContainer(props) {

    

    const [isRecording, setIsRecording] = useState(false);

    const handleClick = () => {
        setIsRecording(true);
    }

    return (
        <Paper spacing={2}>
            <h5>Click to record your dance!</h5>

            <RecordComponent />

        </Paper>
    )
}

export default RecordContainer;