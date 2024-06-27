'use client'

import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter, usePathname} from "next/navigation";
import {StatusFilter} from "../Components/app/StatusFilter";
import {AddTaskForm} from "../Components/app/AddTaskForm";
import {TaskTable} from "../Components/app/TaskTable";
import Link from "next/link";
import {Navbar} from "../Components/app/Navbar";


export default function Home() {
    const instance = axios.create({
        baseURL: 'http://localhost:3000',
    })
    const [dataTask, setDataTask] = useState([])
    const [dataUser, setDataUser] = useState([])
    const [creatorTask, setCreatorTask] = useState('')
    const [toWhomTask, setToWhomTask] = useState('')
    const [refresh, setRefresh] = useState(false);
    const router = useRouter()
    const pathname = usePathname()

    const statusHandler = (e) => {
        router.push(pathname + '?' + 'status=' + e.target.value)
        instance.get(`/api/tasks?status=${e.target.value}`).then(res => setDataTask(res.data))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await instance.post('/api/tasks', {
            to_whom_user_id: toWhomTask,
            creator_user_id: creatorTask
        })
        setRefresh(!refresh)
    }
    const handleDeleteTask = (key) => {
        instance.delete('/api/tasks', {data: {id: key}})
        setRefresh(!refresh)
    };

    const handleEditTask = async (newData) => {
        await instance.put('/api/tasks', {data: newData})
        setRefresh(!refresh)
    };

    useEffect(() => {
        instance.get('/api/users').then(res => setDataUser(res.data))
        instance.get('/api/tasks').then(res => setDataTask(res.data))
    }, [refresh])

    return (
        <div style={{textAlign: 'center', width: '80%', margin: '0 auto'}}>
            <Navbar/>
            <h1 style={{fontSize: '35px', margin: '15px 0px 30px 0px', textAlign: 'center'}}>Задачи</h1>
            <div style={{textAlign: 'center'}}>
                <StatusFilter statusHandler={statusHandler}/>

                <TaskTable dataTask={dataTask}
                           handleEditTask={handleEditTask}
                           handleDeleteTask={handleDeleteTask}
                           setCreatorTask={setCreatorTask}
                           dataUser={dataUser}/>

                <h2 style={{margin: '10px', textAlign: 'left'}}>Создать задачу</h2>
                <div style={{ width: '100%', marginBottom: '100px'}}>
                    <AddTaskForm setToWhomTask={setToWhomTask}
                                 dataUser={dataUser}
                                 setCreatorTask={setCreatorTask}
                                 handleSubmit={handleSubmit}/>
                </div>


            </div>

        </div>
    )
        ;
}
