"use client";
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

  export const initData = [
    ["Date", "Weight"],
    ["20240830", 125]
  ]

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
];

export const options = {
    title: "Weight Progress",
    curveType: "function",
    legend: { position: "bottom" },
};

const BaseLayout = () => {

    const [weightInput, setWeightInput] = useState()
    const [entryId, setEntryId] = useState(0)
    const [weightEntryList, setWeightEntryList] = useState([{date: getFormattedDateFull(), weight: weightArray[weightArray.length-1][1], key: 0}])
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
                    <ul>
                        {weightEntryList.map((weightEntry) => (
                            buildWeightEntryBox({ weightEntry })
                        ))}
                    </ul>
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