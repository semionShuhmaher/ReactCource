import React, { useState } from "react";
//import React,{useState} from "react";
import './studentEditor.css'
const picUrl = 'https://www.w3schools.com/howto/img_avatar.png'
const backendUrl = process.env.REACT_APP_SERVER_URL


export const StudentEditor = (props) =>{
    const {onUpdate, init, onCancel, onRefresh} = props
    const [student,setStudent] = useState(init)
    const [errorMessages,setErrorMessages] = useState({})

    const addStudent = (student) => {
        console.log(student)
        const httpMethod = student.id ? "PUT" : "POST"
        const url = student.id ? `${backendUrl}/${student.id}` : backendUrl
        fetch(url,
        {
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
            method: httpMethod,
            body: JSON.stringify(student)
        }
        )
        .then(responce => {
            onRefresh()
            onCancel()
          console.log(responce)
        })
      }

    const validate = (student)=>{
        let hasErrors = false
        let errors = {}
        //name
        if(!student.name || student.name.length < 2){
            errors = {...errors,name: 'Name is too short'}
            hasErrors = true
        }
        else if((/[^A-Za-z]/.test(student.name)))
        {
            errors = {...errors,name: 'Name is illegal'}
            hasErrors = true
        }
        //Surname
        if(!student.surname || student.surname.length < 2){
            errors = {...errors,surname: 'Surname is too short'}
            hasErrors = true
        }
        else if((/[^A-Za-z]/.test(student.surname)))
        {
            errors = {...errors,name: 'Surname is illegal'}
            hasErrors = true
        }
        setErrorMessages(errors)
        return hasErrors
    }

    const setNewName = (e) =>{
        const newobj = {...student}
        newobj.name =  e.target.value
        setStudent(newobj)
    }

 const setNewSurName = (e) =>{
    const newobj = {...student}
    newobj.surname =  e.target.value
    setStudent(newobj)
}

 const setNewUrl = (e) =>{
    const newobj = {...student}
    newobj.picUrl =  e.target.value
    setStudent(newobj)
}

 const setNewAge = (e) =>{
    const newobj = {...student}
    newobj.age =  e.target.value
    setStudent(newobj)
    }

 const setNewGender = (e) =>{
    const newobj = {...student}
    newobj.gender =  e.target.value
    setStudent(newobj)
    }

    const updateStudent = () =>{
        if(!validate(student))
        {
            addStudent(student)
        }
    }

    return(
        <div className="myform">
            <label htmlFor="nameField">First Name</label>
            <input type="text" onChange={setNewName} value={student.name} id = "nameField"></input><br></br>
            <p className="errormessage">{errorMessages.name}</p><br></br>

            <label htmlFor="surnameField">Last Name</label>
            <input  type="text" onChange={setNewSurName} value={student.surname} id = "surnameField"></input><br></br>
            <p className="errormessage">{errorMessages.surname}</p><br></br>

            <label htmlFor="newUrl">New URL</label>
            <input  className="myUrl" type="text" value={student.picUrl} onChange={setNewUrl} id = "newUrl"></input><br></br>

            <label htmlFor="newAge">New Age</label>
            <input  type="number" onChange={setNewAge} value={student.age} id = "newAge" min = '1' max = '121'></input><br></br>

            <label htmlFor="newGender">New Gender</label>
            <select value={student.gender} onChange = {setNewGender}>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select><br></br>
            <br></br><br></br><button onClick={updateStudent}>Submit</button> <button onClick={onCancel}>Cancel</button>
        </div>

    )

}