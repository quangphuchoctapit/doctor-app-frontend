const hoursArray = []

for (let hour = 7; hour <= 18; hour++) {
    let label = hour < 10 ? `0${hour}:00` : `${hour}:00`
    hoursArray.push({ id: hour, label })
}


export { hoursArray } 