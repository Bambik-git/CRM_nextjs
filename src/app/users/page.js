'use client'

import {useEffect, useState} from "react";
import axios from "axios";

import {Navbar} from "../../Components/app/Navbar";
import {UserTable} from "../../Components/users/UserTable";
import {AddUserForm} from "../../Components/users/AddUserForm";

export default function Users() {

    const instance = axios.create({
        baseURL: 'http://localhost:3000',
    })

    const [dataUsers, setDataUsers] = useState([])
    const [userName, setUserName] = useState()
    const [userEmail, setUserEmail] = useState()
    const [refresh, setRefresh] = useState(false);

    const createUser = (e) => {
        e.preventDefault();
        instance.post('/api/users', {
            name: userName,
            email: userEmail,
        })
        setRefresh(!refresh)
    }

    const deleteUser = (key) => {
        instance.delete('/api/users', {data: {id: key} } )
        setRefresh(!refresh)
    };

    const editUser = (data) => {
        instance.put('/api/users', {id: data.id, name: data.name, email: data.email} )
        setRefresh(!refresh)
    }

    useEffect(() => {
        instance.get('/api/users').then(res => setDataUsers(res.data))
    }, [refresh])


    return (
        <div style={{textAlign: 'center', width: '60%', margin: '0 auto'}}>
            <Navbar/>
            <h1 style={{fontSize: '35px', margin: '15px 0px 30px 0px', textAlign: 'center'}}>Пользователи</h1>
            <div style={{textAlign: 'center'}}>

                <UserTable deleteUser={deleteUser}
                           dataUsers={dataUsers}
                           editUser={editUser}/>

                <h2 style={{margin: '10px', textAlign: 'left'}}>Добавить пользователя</h2>

                <AddUserForm createUser={createUser}
                               setUserName={setUserName}
                               setUserEmail={setUserEmail}/>
            </div>
        </div>
    )
}