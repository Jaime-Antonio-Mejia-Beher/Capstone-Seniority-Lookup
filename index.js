
const station = document.getElementById("station");
let Employee = []

async function fetchData() {
    try {
        const response = await fetch('https://employee-data-vkxx.onrender.com/employees')

        if (!response.ok) {
            throw new Error("not okay")
        }
        const data = await response.json();
        Employee = formatResponse(data)
        appendData()
        console.log(Employee)
    }
    catch (error) {
        console.log(error.message)
    }
} 
fetchData()

const formatResponse = (data) => {
    return data.map( item => {
        return {...item, department: "Ramp"}  //Update to conditionally
    })
}


const appendData = () => {
    Employee.forEach( obj => {
        const city = obj.address.city
        const option = document.createElement("option");
        option.setAttribute("value", city);             // replacing city parameter with obj return the same result. WHY?
        const input = document.createTextNode(city);
        option.appendChild(input);
        station.appendChild(option);
    })
}


const submitBtn = document.getElementById("submitBtn")  
submitBtn.addEventListener("click", () => {
    // grab the unique id && city input
    const input = document.getElementById("userName")
    const department = document.getElementById("department")
    const fullOrPartTime = document.getElementById("fullOrPartTime")
    const filterEmp = Employee.filter(item => {      // store filter output
    if (item.address.city === station.value && item.department === department.value && item.roles.indexOf(fullOrPartTime.value) != -1) {      // if the city matches the input city from user
        return true;
    } else {
        return false;
    }
   })
    console.log(filterEmp)
    })