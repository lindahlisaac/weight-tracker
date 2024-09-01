"use client";
import MenuBar from '../components/MenuBar';
import Header from '../components/Header';
import '../components/MenuBar.scss'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useState } from 'react';
import '../components/WeightEntry.scss';
import * as React from 'react';
import { Chart } from "react-google-charts";

function getFormattedDateFull() {
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth()
    var day = date.getDay()
    if (month < 10) {
        month = '0' + month
    }
    if (day < 10) {
        if (day === 0) {
            ++day
        }
        day = '0' + day
    }
    console.log(date)
    
    return year + '-' + month + '-' + day
}

function getFormattedDateGraph() {
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth()
    var day = date.getDay()
    if (month < 10) {
        month = '0' + month
    }
    if (day < 10) {
        if (day === 0) {
            ++day
        }
        day = '0' + day
    }
    console.log(date)
    
    // return year + '-' + month + '-' + day
    return month + day
}

const weightEntry = {
    weight: '',
    date: '',
    id: ''
}

export const data = [
    ["Year", "Sales", "Expenses"],
    ["2004", 1000, 400],
    ["2005", 1170, 460],
    ["2006", 660, 1120],
    ["2007", 1030, 540],
  ];

  export const initData = [
    ["Date", "Weight"],
    ["20240830", 125]
  ]

  export const graphDataArray = [
    ["Date", "Weight"],
  ]

export const options = {
    title: "Weight Progress",
    curveType: "function",
    legend: { position: "bottom" },
};

const BaseLayout = () => {

    const [weightInput, setWeightInput] = useState()
    const [entryId, setEntryId] = useState(0)
    const [weightEntryList, setWeightEntryList] = useState(initData)
    const [graphArray, setGraphArray] = useState([["Date", "Weight"],['08-30', 145]])

    function addToList({ weightInput }) {
        // build list for the table
        weightEntry.weight = weightInput
        weightEntry.date = getFormattedDateFull()
        console.log(weightEntry)
        let tempList = weightEntryList.slice()
        tempList.push({ weight: weightEntry.weight, date: weightEntry.date, id: entryId})
        setWeightEntryList(tempList)
        setEntryId(entryId + 1)
        console.log(weightEntryList)
    }

    function updateGraphArray( { weightInput } ) {
        //build "2D" array for the graph
        weightEntry.weight = weightInput
        weightEntry.date = getFormattedDateGraph()
        let tempArray = graphArray.slice()
        tempArray.push([getFormattedDateGraph(), weightInput])
        setGraphArray(tempArray)
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
            <div className='tableHeaderRow'>
                <li className='weightEntryTableHeaderDate'>Date</li>
                <span>  </span>
                <span>  </span>
                <span>  </span>
                <span>  </span>
                <span>  </span>
                <span>  </span>
                <li className='weightEntryTableHeaderWeight'>Weight</li>
            </div>
        )
    }

    function buildWeightGraph() {
        return (
            <div>
                <Chart
                    chartType="ScatterChart"
                    data={graphArray}
                    width="100%"
                    height="100%"
                    legendToggle
                    options={options}
                />
            </div>
        )
    }

    return (
        <>
            <Header />
            <div className='weightPageContainer'>
                <div className='weightEntryTable'>
                    
                    <ul>
                        {weightEntryList.map((weightEntry) => (
                            buildWeightEntryBox({ weightEntry })
                        ))}
                    </ul>
                </div>
                <div className='weightEntryGraphContainer'>
                    <div className='weightEntryGraph'>
                        {buildWeightGraph()}
                    </div>
                    
                </div>
            </div>
            <div style={{ position: "relative", backgroundColor: "black" }}>
                <div className='menuBar'>
                    <TextField id='weight-input-field' className='weightInputField' value={weightInput} onChange={(e) => setWeightInput(e.target.value)} />
                    <Button className='addWeightButton' onClick={() => {
                        addToList({ weightInput })
                        updateGraphArray( { weightInput })
                        buildWeightGraph()
                    }}>Add Weight Entry</Button>
                </div>
            </div>
        </>
    );

}

export default BaseLayout;