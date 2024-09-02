"use client";
import * as React from 'react';
import Header from '../components/Header';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { Chart } from "react-google-charts";

import '../components/WeightEntry.scss';
import '../components/MenuBar.scss'

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
    // return month + '-' + day
    return month + "-" + day
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

  export const weightArray = [
    ["Date", "Weight"],
    ["08-13", 158.7],
    ["08-16", 158.8],
    ["08-19", 159.1],
    ["08-20", 159.6],
    ["08-21", 160.1],
    ["08-22", 159.6],
    ["08-24", 162],
    ["08-25", 162],
    ["08-28", 160.2],
    ["08-30", 161.8],
    ["09-01", 160.9],
    ["09-02", 161.4],//12
];

export const options = {
    title: "Weight Progress",
    curveType: "function",
    legend: { position: "bottom" },
};

const BaseLayout = () => {

    const [weightInput, setWeightInput] = useState()
    const [entryId, setEntryId] = useState(0)
    const [displayEntryValue, setDisplayEntryValue] = useState(5)
    const [weightEntryList, setWeightEntryList] = useState(getLatestEntries())
    const [graphArray, setGraphArray] = useState( weightArray )
    

    function addToList({ weightInput }) {
        // build list for the table
        weightEntry.weight = weightInput
        weightEntry.date = getFormattedDateFull()
        console.log(weightEntry)
        let tempList = weightEntryList.slice()
        tempList.push({ weight: weightEntry.weight, date: weightEntry.date, key: entryId})
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

    function getLatestEntries() {
        let tempArray = []
        // for (var i = weightArray.length - 1; i > weightArray.length - displayEntryValue - 1; i--) {
        var startIndex = weightArray.length - displayEntryValue
        for (var i = startIndex; i < weightArray.length; i++) {
            let weightVal = weightArray[i][1]
            let dateVal = weightArray[i][0]
            tempArray.push({weight: weightVal, date: dateVal, key: i})
        }
        return tempArray;
    }

    function buildWeightEntryBox({ weightEntry }) {
        return (
            <div className='weightEntryBox' key={weightEntry.key}>
                <div className='weightEntryWeight'>
                    <p>{weightEntry.weight}</p>
                </div>
                <div className='weightEntryDate'>
                    <p>{weightEntry.date}</p>
                </div>
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
                    chartType="LineChart"
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
                    {
                        weightEntryList.map((weightEntry) => (
                            buildWeightEntryBox({ weightEntry })
                        ))
                    }
                </div>
                <div className='filterBoxContainer'>
                    Filter Box
                </div>
                <div className='statisticsContainer'>
                    Statistics
                </div>
                <div className='weightEntryGraphContainer'>
                    <div className='weightEntryGraph'>
                        { buildWeightGraph() }
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