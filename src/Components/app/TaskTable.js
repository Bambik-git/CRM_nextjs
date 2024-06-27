import {Badge, Button, Form, Popconfirm, Select, Table, Typography} from "antd";
import {useState} from "react";


const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          dataUser,
                          setCreatorTask,
                          creatorTask,
                          ...restProps
                      }) => {


    const statusList = [{id: 'Новая', label: 'Новая'},
        {id: 'В процессе', label: 'В процессе'},
        {id: 'Завершена', label: 'Завершена'}]

    const inputNode = inputType === 'status' ?
        <Select
            style={{width: 200}}
            filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={statusList.map((item) => {
                return {
                    value: item.id,
                    label: item.name
                }
            })}
        /> :
        <Select
            style={{width: 200}}
            filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={dataUser.map((item) => {
                return {
                    value: item.name
                }
            })}
        />;


    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}>

                    {inputNode}
                </Form.Item>

            ) : (
                children
            )}
        </td>
    );
};

export const TaskTable = ({dataTask, handleDeleteTask, handleEditTask, dataUser}) => {

    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record.id === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            status: '',
            to_whom_user_id: '',
            creator_user_id: '',
            ...record,
        });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const editData = await form.getFieldsValue(true);
            const data = {
                id: editData.id,
                status: editData.status,
                to_whom_user_id: editData.to_whom_user_id,
                creator_user_id: editData.creator_user_id
            };
            // console.log(editData.status)
            // alert(JSON.stringify(newData, null, 2))

            handleEditTask(data)
            setEditingKey('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Дата',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Обновлен',
            dataIndex: 'updated_at',
            key: 'updated_at',
        },
        {
            title: 'Статус задачи',
            dataIndex: 'status',
            key: 'status',
            editable: true,
            render: (status_text) => {
                let status_color
                if (status_text === 'Завершена') {
                    status_color = "success";
                } else if (status_text === 'В процессе') {
                    status_color = 'processing';
                } else {
                    status_color = "default";
                }
                return (
                    <Badge status={status_color} text={status_text}/>
                )
            },
        },
        {
            title: 'Исполнитель',
            dataIndex: 'to_whom_user_id',
            key: 'to_whom_user_id',
            editable: true,
        },
        {
            title: 'Создатель',
            dataIndex: 'creator_user_id',
            key: 'creator_user_id',
            editable: true,
        },
        {
            title: 'Действия',
            key: 'action',
            render: (text, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <div>
                        <Button style={{margin: '0 5px'}} onClick={() => save(record.id)} primary>Принять</Button>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <Button style={{margin: '0 5px'}} danger>Отменить</Button>
                        </Popconfirm>
                    </div>
                ) : (
                    <>
                        <Button style={{margin: '0 5px'}}
                                disabled={editingKey !== ''}
                                type={'primary'} onClick={() => edit(record, text)}>
                            Изменить
                        </Button>

                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteTask(record.id)}>
                            <Button style={{margin: '0 5px'}} type={'primary'} danger>Удалить</Button>
                        </Popconfirm>
                    </>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'status' ? 'status' : 'user',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table rowKey='id'
                   components={{
                       body: {
                           cell: (props) => <EditableCell {...props}
                                                          dataUser={dataUser}/>
                       },
                   }}
                   columns={mergedColumns}
                   rowClassName="editable-row"
                   dataSource={dataTask}
                   pagination={false}
                   bordered/>
        </Form>
    )


}