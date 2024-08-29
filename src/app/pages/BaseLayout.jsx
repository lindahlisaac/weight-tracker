"use client";
import MenuBar from '../components/MenuBar';
import Header from '../components/Header';
import '../components/MenuBar.scss'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import {useState} from 'react';
import WeightEntryList from '../components/WeightEntryList';
import WeightEntry from '../components/WeightEntry';

const weightEntry = {
    weight: '170',
    date: ''
}

const BaseLayout = () => {

    const [weightInput, setWeightInput] = useState()
    const [weightEntryList, setWeightEntryList] = useState([
       
    ])
  
    function addWeightEntry(weight, date) {

        console.log({weight})
        let newWeightEntryList
        weightEntryList.push({weight, date})
        newWeightEntryList = [...weightEntryList].slice()
        setWeightEntryList(newWeightEntryList)
        console.log(newWeightEntryList)
    }

    return (
        <>
            <Header/>
            <ul>{weightEntryList.map((weightEntry) => {
                // console.log(weightEntry)
                return (
                    <WeightEntry weight={weightEntry.weight} date={weightEntry.date}/>
                )
                })}
            </ul>
            <div style={{position: "relative", backgroundColor: "black"}}>
                <div className='menuBar'>
                    <TextField id='weight-input-field' className='weightInputField' value={weightInput} onChange={(e) => setWeightInput(e.target.value, new Date().getDate.toDateString)}/>
                    <Button className='addWeightButton' onClick={() => {
                        // addWeightEntry({weightInput})
                        console.log(document.getElementById("weight-input-field").value)
                        addWeightEntry(new WeightEntry(document.getElementById("weight-input-field").value, new Date().toDateString)) 
                        }}>Add Weight Entry</Button>
                </div>
            </div>
        </>
    );
 
}
 
export default BaseLayout;