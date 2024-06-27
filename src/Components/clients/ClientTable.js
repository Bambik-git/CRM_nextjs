import {Button, Form, Input, InputNumber, Popconfirm, Select, Table} from "antd";
import {useState} from "react";

const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {

    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

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
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export const ClientTable = ({dataClients, deleteClient, editClient}) => {

    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record.id === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            tel: '',
            comment: '',
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
                name: editData.name,
                tel: editData.tel,
                comment: editData.comment
            };
            // console.log(editData.status)
            alert(JSON.stringify(data, null, 2))

            editClient(data)
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
            title: ' Имя',
            dataIndex: 'name',
            key: 'name',
            editable: true,
        },
        {
            title: ' Телефон',
            dataIndex: 'tel',
            key: 'tel',
            editable: true,
        },
        {
            title: 'Комментарий',
            dataIndex: 'comment',
            key: 'comment',
            editable: true,
        },
        {
            title: 'Action',
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

                        <Popconfirm title="Sure to delete?" onConfirm={() => deleteClient(record.id)}>
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
                inputType: col.dataIndex === 'number' ? 'number' : 'text',
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
                           cell: (props) => <EditableCell {...props}/>
                       },
                   }}
                   columns={mergedColumns}
                   rowClassName="editable-row"
                   dataSource={dataClients}
                   pagination={false}
                   bordered/>
        </Form>
    )
}