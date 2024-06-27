import {Button, Form, Input} from "antd";

export const AddUserForm = ({setUserName, setUserEmail, createUser }) => {
    const [form] = Form.useForm();
    return (
        <Form
            style={{margin: 10, textAlign: 'center'}}
            layout={'inline'}
            form={form}
            initialValues={{layout: 'inline'}}>

            <Form.Item label="Имя">
                <Input name={'name'} onChange={(e) => setUserName(e.target.value)} />
            </Form.Item>
            <Form.Item label="Email">
                <Input onChange={(e) => setUserEmail(e.target.value)} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" onClick={createUser}>Добавить</Button>
            </Form.Item>
        </Form>
    )
}