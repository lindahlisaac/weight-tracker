"use client";
import * as React from 'react';
import WeightTrackerPage from './WeightTrackerPage';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";


const BaseLayout = () => {

    return (
        <WeightTrackerPage/>
    )

}

export default BaseLayout;