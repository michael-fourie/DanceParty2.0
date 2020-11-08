import React, { useEffect, useState } from 'react'
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { RotateWithOffset } from '@tensorflow/tfjs'


function ResultDisplay(props) {

    let { pos, time } = props;

    const [data, setData] = useState();
    useEffect(() => {
        
    })


    
    return(
        <TableContainer component={Paper}>
            <Table  size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Pose</TableCell>
                        <TableCell>Time Stamp</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((dat, index) => {
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {dat.pose}
                            </TableCell>
                            <TableCell>
                                {dat.timeStamp}
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}