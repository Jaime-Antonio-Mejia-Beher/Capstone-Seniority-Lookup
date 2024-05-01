
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
    // filterEmpArray will store the value of objects on which we will compare dates
    const filterEmpArray = Employee.filter(item => {      // filter employees based on city, department, role
    if (item.address.city === station.value && item.department === department.value && item.roles.indexOf(fullOrPartTime.value) != -1) {      // if the city matches the input city from user
        return true;        // only if search matches, store into new array
    } else {
        return false;
    }
   })

   const filterUsername = Employee.filter( item => {    // returns the array with only employee object that matches user input
        if (item.username === input.value) {
            return true;
        } else {
            return false;
        }
   })

    
    const userHireDate = filterUsername[0].hiredOn  //  hire date
    let userHireTime = new Date(userHireDate).getTime()  // converting a date string into a number to makes it easier to compare values
    let userRank = 1    // user is set to highest seniority

    for (let i=0; i < filterEmpArray.length; i++) {  // looping through filter emp array to compare the hire time
        let currentEmpDate = filterEmpArray[i].hiredOn;  
        let empHiredTime = new Date(currentEmpDate).getTime()
        if (empHiredTime < userHireTime) {  // compared the two values
            userRank++;         // increase the rank if current employee 
        } 
    }
    console.log(userRank)
    })

    