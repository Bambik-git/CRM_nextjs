import {Button, Form, Input} from "antd";

export const AddClientForm = ({setClientName, setClientTel, setClientComment, createClient }) => {
    const [form] = Form.useForm();
    return (
        <Form
            style={{margin: 10, textAlign: 'center'}}
            layout={'inline'}
            form={form}
            initialValues={{layout: 'inline'}}>

            <Form.Item label="Имя">
                <Input name={'name'} onChange={(e) => setClientName(e.target.value)} />
            </Form.Item>
            <Form.Item label="Телефон">
                <Input onChange={(e) => setClientTel(e.target.value)} />
            </Form.Item>
            <Form.Item label="Комментарий">
                <Input onChange={(e) => setClientComment(e.target.value)} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" onClick={createClient}>Добавить</Button>
            </Form.Item>
        </Form>
    )
}