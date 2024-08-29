function WeightEntry({ weight, date }) {
    console.log({weight}, {date})
    return (
        <div>
            <div>{weight}</div>
            <div>{date}</div>
        </div>
    )
}

export default WeightEntry