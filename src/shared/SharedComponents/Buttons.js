import { Button } from '@mui/material'
import React from 'react'
import { deleteEntries, generateNew, getReadings } from '../sharedFunctions'

const Buttons = ({ setFunction }) => {
    return (
        <div className='my-10 flex justify-around'>
            <Button variant='outlined' onClick={getReadings}>GET READINGS</Button>
            <Button variant='outlined' onClick={() => generateNew(setFunction)}>GENERATE NEW</Button>
            <Button variant='outlined' onClick={() => deleteEntries(setFunction)}>RESET TABLE</Button>
        </div>
    )
}

export default Buttons