import { Button } from '@mui/material'
import React from 'react'
import { deleteEntries, generateNew, getReadings } from '../sharedFunctions'

const Buttons = ({ setFunction }) => {
    return (
        <div className='my-10 px-10 flex justify-around'>
            {/* <Button variant='outlined' onClick={getReadings}>GET READINGS</Button> */}
            <Button variant='outlined' onClick={() => generateNew(setFunction)}>GET NEW READING</Button>
            <Button variant='outlined' onClick={() => deleteEntries(setFunction)}>RESET PLOT DATA</Button>
            
        </div>
    )
}

export default Buttons