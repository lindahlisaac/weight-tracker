"use client";
import MenuBar from '../components/MenuBar';
import Header from '../components/Header';
import '../components/MenuBar.scss'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useState } from 'react';
import WeightEntryList from '../components/WeightEntryList';
import WeightEntry from '../components/WeightEntry';

function getFormattedDate() {
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth()
    var day = date.getDay()
    if (month < 10) {
        month = '0' + month
    }
    if (day < 10) {
        day = '0' + day
    }

    return year + '-' + month + '-' + day
}

const weightEntry = {
    weight: '',
    date: '',
    id: ''
}

const BaseLayout = () => {

    const [weightInput, setWeightInput] = useState()
    const [weightEntryList, setWeightEntryList] = useState([])
    const [entryId, setEntryId] = useState(0)

    function addToList({ weightInput }) {
        weightEntry.weight = weightInput
        weightEntry.date = getFormattedDate()
        console.log(weightEntry)
        let tempList = weightEntryList.slice()
        tempList.push({ weight: weightEntry.weight, date: weightEntry.date, id: entryId})
        setWeightEntryList(tempList)
        setEntryId(entryId + 1)
        console.log(weightEntryList)
    }

    return (
        <>
            <Header />
            <ul>
                {weightEntryList.map((weightEntry) => (
                    <div>
                        <li key={weightEntry.id}>{weightEntry.weight}     {weightEntry.date}</li>
                    </div>
                ))}
            </ul>
            <div style={{ position: "relative", backgroundColor: "black" }}>
                <div className='menuBar'>
                    <TextField id='weight-input-field' className='weightInputField' value={weightInput} onChange={(e) => setWeightInput(e.target.value)} />
                    <Button className='addWeightButton' onClick={() => {
                        addToList({ weightInput })
                    }}>Add Weight Entry</Button>
                </div>
            </div>
        </>
    );

}

export default BaseLayout;