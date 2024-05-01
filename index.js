
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
    console.log(data)
    return data.map( item => {
        let localDept = "";
        if (item.department === "Human Resources") {
            localDept = "Ramp";
        } else if (item.department === "Sales") {
            localDept = "Ops";
        } else if (item.department === "Accounting") {
            localDept = "Provo";
        } else {
            localDept = "Cargo";
        }
        return {...item, department: localDept}  //Update to conditionally
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
    const filterEmpArray = Employee.filter(item => {      // store filter output
    if (item.address.city === station.value && item.department === department.value && item.roles.indexOf(fullOrPartTime.value) != -1) {      // if the city matches the input city from user
        return true;
    } else {
        return false;
    }
   })

   const filterUsername = Employee.filter( item => { // user employee
        if (item.username === input.value) {
            return true;
        } else {
            return false;
        }
   })
    console.log(filterEmpArray)
    console.log(filterUsername) // crazypanda
    
    const userHireDate = filterUsername[0].hiredOn  // crazypanda hire date
    let userHireTime = new Date(userHireDate).getTime()  // converting a date string into a number to compare...
    let userRank = 1 // user is set to highest seniority

    for (let i=0; i < filterEmpArray.length; i++) {  // looping through filter emp array 
        let currentEmpDate = filterEmpArray[i].hiredOn;  
        let empHiredDate = new Date(currentEmpDate).getTime()
        console.log(empHiredDate)  
        console.log(userHireTime)
        if (empHiredDate < userHireTime) {  // compared the two values
            userRank++;         // increase the rank
        } 
    }
    console.log(userRank)
    })

    