import React, { useState, useRef } from 'react'
import { makeStyles } from "@material-ui/core/styles"
//import { Card, Elevation, Eleveation } from "@blueprintjs/core"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"


import RecordComponent from "../Components/RecordComponent";

const useStyles = makeStyles(theme =>({
    control: {
        padding: theme.spacing(2)
    }
}))

function RecordContainer(props) {

    let classes = useStyles();

    const [isRecording, setIsRecording] = useState(false);

    const handleClick = () => {
        setIsRecording(true);
    }

    return (
        <div>
            <h5>Click to record your dance!</h5>

            <RecordComponent />

        </div>
    )
}

export default RecordContainer;