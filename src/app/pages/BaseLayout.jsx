"use client";
import MenuBar from '../components/MenuBar';
import Header from '../components/Header';
import '../components/MenuBar.scss'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useState } from 'react';
import '../components/WeightEntry.scss';

function getFormattedDate() {
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth()
    var day = date.getDay()
    if (month < 10) {
        month = '0' + month
    }
    console.log(day)
    if (day < 10) {
        if (day === 0) {
            ++day
        }
        day = '0' + day
    }
    console.log(date)
    
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

    function buildWeightEntryBox({ weightEntry }) {
        return (
            <div className='weightEntryBox'>
                <li>{weightEntry.date}</li>
                <li> {weightEntry.weight}</li>
            </div>
        )
    }

    function buildTableHeaderRowBox() {
        return (
            <div>
                <li className='weightEntryTableHeaderDate'>Date</li>
                <li className='weightEntryTableHeaderWeight'>Weight</li>
            </div>
        )
    }

    return (
        <>
            <Header />
            <div className='weightPageContainer'>
                <div className='weightEntryTable'>
                    <ul>{buildTableHeaderRowBox}</ul>
                    <ul>
                        {weightEntryList.map((weightEntry) => (
                            buildWeightEntryBox({ weightEntry })
                        ))}
                    </ul>
                </div>
                <div className='weightEntryGraphContainer'>
                    <div className='weightEntryGraph'>
                        weightEntryGraph
                    </div>
                    
                </div>
            </div>
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