import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "../component/table";

const Patients = () =>{
    const [isForm, setForm] = useState(false)
    const [data, setData] = useState([])
    const [departs, setDeparts] = useState([])

    const option = {
        id: 'ID',
        name: 'Xona raqami',
        type: 'Turi',
        floor: 'Qavat',
        depart: 'Bo`lim',
        status: 'Xona xolati',
    }

    useEffect(()=>{
        axios.get('http://localhost:3000/bemorlar')
        .then(res => {
            if (res.status === 200){
                setDeparts(res.data)
            }
        })
        axios.get('http://localhost:3000/bemorlar')
        .then(res => {
            if (res.status === 200){
                setData(res.data)
            }
        })
        
    },[])

    

    const addRoom=(e)=>{
        e.preventDefault()
        let form = document.forms.room 
        let room = {}
        let formData = new FormData(form)
        formData.forEach((value,key)=>{
            room[key] = value 
        })
        axios.post('http://localhost:3000/bemorlar',room)
        .then(res => {
            if (res.status === 201){
                setData([...data, res.data])
                form.reset()
            }
        })
    }

    const deleteRoom =(id)=>{
        const index = data.findIndex(el=> el.id == id)
        axios.delete(`http://localhost:3000/bemorlar/${id}`)
        .then(res => {
            if (res.status === 200){
                const before = data.slice(0,index)
                const after  = data.slice(index+1)
                setData([...before, ...after])
            }
        })
    }

    const parseDate = (data) => {
        
        data = data.map(room => {
            const index = departs.findIndex(dep => dep.id == room.depart)
            if (departs[index])
                room.depart = departs[index].name
            return room
        })
        return data
    }

    return (
        <>
            <h1>Xonalar ro'yhati</h1>
            <Table 
                data={parseDate(data)} 
                option={option} 
                url='rooms'
                del={(id)=>{deleteRoom(id)}}
            />
            <button 
                className="addbtn" 
                onClick={()=>{setForm(true)}}>
                    +
            </button>
            <form 
                name='room'
                className={isForm?'add show':'add'}
                onSubmit={(event)=>{addRoom(event)}}
                >
                <span 
                    className="add__close" 
                    onClick={()=>{setForm(false)}}>
                </span>
                <div className="add__title">
                    Yangi xona qo'shish
                </div>
                <input 
                    type='text' 
                    name="name" 
                    placeholder="Ism sharifi"
                    required
                />
                <input 
                    type='date' 
                    name="date" 
                    placeholder="Tug’ilgan sana"
                    required
                />
                <select name="type"
                    required
                >
                    <option value=''>Tug’ilgan xudud</option>
                    <option value='Mirzo Ulugbek'>Mirzo Ulugbek</option>
                    <option value='Chilonzor'>Chilonzor</option>
                    <option value='Yunusobod'>Yunusobod</option>
                    <option value='Olmalik'>Olmalik</option>
                </select>
                <input 
                    type='text' 
                    name='address' 
                    placeholder='Manzil'
                    required
                />
                <select 
                    name="status"
                    placeholder=""
                    required
                    >
                    <option value=''>Oilaviy holati</option>
                    <option value='Uylangan/Turmushga chiqkan'>Uylangan/Turmushga chiqkan</option>
                    <option value='Uylanmagan/Turmushga chiqmagan'>Uylanmagan/Turmushga chiqmagan</option>
                    
                </select>
                <select 
                    name="edu"
                    required
                    >
                    <option value=''>Ma’lumoti</option>
                    <option value='Or`ta'>Or`ta</option>
                    <option value='Oliy'>Oliy</option>
                </select>

                <select 
                    name="busy"
                    required
                    >
                    <option value=''>Bandlik holati</option>
                    <option value='Or`ta'>Or`ta</option>
                    <option value='Oliy'>Oliy</option>
                </select>
                <input 
                    type='text' 
                    name='workingplace' 
                    placeholder='Ish joyi'
                    required
                />
                <input 
                    type='text' 
                    name='phone' 
                    placeholder='Telefon raqami'
                    required
                />
                <input 
                    type='text' 
                    name='fphone' 
                    placeholder='Oila a’zolaridan telefon raqam'
                    required
                />
                <button type="submit">Qo'shish</button>
            </form>
        </>
    )
}

export default Patients