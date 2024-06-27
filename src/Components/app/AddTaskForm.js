import {Button, Form, Select} from "antd";

export const AddTaskForm = ({setCreatorTask, setToWhomTask, dataUser, handleSubmit }) => {
    const [form] = Form.useForm();
    return (

        <Form
            layout={'inline'}
            form={form}
            initialValues={{layout: 'inline'}}
            onFinish={handleSubmit}>

            <Form.Item label="Автор">
                <Select
                    style={{width: 150}}
                    onChange={(value) => setCreatorTask(value)}
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={dataUser.map((item) => {
                        return {
                            value: item.id,
                            label: item.name
                        }
                    })}
                />
            </Form.Item>
            <Form.Item label="Исполнитель">
                <Select
                    style={{width: 150}}
                    onChange={(value) => setToWhomTask(value)}
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={dataUser.map((item) => {
                        return {
                            value: item.id,
                            label: item.name
                        }
                    })}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" onClick={handleSubmit}>Создать</Button>
            </Form.Item>
        </Form>
    )
}