'use client'

import {useEffect, useState} from "react";
import axios from "axios";

import {AddClientForm} from "../../Components/clients/AddClientForm";
import {ClientTable} from "../../Components/clients/ClientTable";
import {Navbar} from "../../Components/app/Navbar";

export default function Clients() {
    const instance = axios.create({
        baseURL: 'http://localhost:3000',
    })
    const [dataClients, setDataClients] = useState([])
    const [clientName, setClientName] = useState()
    const [clientComment, setClientComment] = useState()
    const [clientTel, setClientTel] = useState()
    const [refresh, setRefresh] = useState(false);

    const createClient = (e) => {
        e.preventDefault();
        instance.post('/api/clients', {
            name: clientName,
            tel: clientTel,
            comment: clientComment,
        })
        setRefresh(!refresh)
    }

    const deleteClient = (key) => {
        instance.delete('/api/clients', {data: {id: key} } )
        setRefresh(!refresh)
    };

    const editClient = (data) => {
        instance.put('/api/clients', {data} )
        setRefresh(!refresh)
    }

    useEffect(() => {
        instance.get('/api/clients').then(res => setDataClients(res.data))
    }, [refresh])


    return (
        <div style={{textAlign: 'center', width: '70%', margin: '0 auto'}}>
            <Navbar/>
            <h1 style={{fontSize: '35px', margin: '15px 0px 30px 0px', textAlign: 'center'}}>Клиенты</h1>
            <div style={{textAlign: 'center'}}>

                <ClientTable deleteClient={deleteClient} dataClients={dataClients} editClient={editClient}/>

                <h2 style={{margin: '10px', textAlign: 'left'}}>Добавить клиента</h2>

                <AddClientForm createClient={createClient}
                               setClientComment={setClientComment}
                               setClientName={setClientName}
                               setClientTel={setClientTel} />
            </div>
        </div>
    )
}