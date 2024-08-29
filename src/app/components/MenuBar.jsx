"use client";
import React from 'react';
import {useState} from 'react';
import './MenuBar.scss'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';


function MenuBar() {

  const [weightInput, setWeightInput] = useState()
  const [weightEntryList, setWeightEntryList] = useState([])

  function addWeightEntry() {
    let newWeightEntryList
    weightEntryList.push(weightInput)
    newWeightEntryList = [...weightEntryList].slice
    console.log(weightEntryList)
  }

  return (
    <div style={{position: "relative", backgroundColor: "black"}}>
      <div className='menuBar'>
      <TextField className='weightInputField' value={weightInput} onChange={e => setWeightInput(e.target.value)}/>
      <Button className='addWeightButton' onClick={() => {
        addWeightEntry({weightInput});}}>Add Weight Entry</Button>
      </div>
    </div>
  )
}

export default MenuBar