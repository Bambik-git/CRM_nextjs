import Link from "next/link";
import {Button, Layout, Menu} from "antd";
import {Header} from "antd/es/layout/layout";
import {
    HomeOutlined,
    UserOutlined,
    SettingOutlined,
} from '@ant-design/icons';

export const Navbar = () => {
    return (
        <nav>




            <Layout className="layout" >
                <Header theme={'light'} style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'white' }} >
                    <div className="logo" style={{ color: 'white' }}></div>
                    <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']} style={{width: '400px', fontSize: '20px'}}>
                        <Menu.Item key="1" ><Link href={'/'}>Задачи</Link></Menu.Item>
                        <Menu.Item key="2" ><Link href={'/clients'}>Клиенты</Link></Menu.Item>
                        <Menu.Item key="3" ><Link href={'/users'}>Пользователи</Link></Menu.Item>
                    </Menu>
                    <div>
                        {/*<Button type="primary" style={{ marginRight: '10px' }}>Sign in</Button>*/}
                        {/*<Button>Sign up</Button>*/}
                    </div>
                </Header>
            </Layout>

        </nav>
    )
}