import {Flex, Radio} from "antd";

export const StatusFilter = ({statusHandler}) => {
    return (
        <div style={{marginBottom: '20px'}}>
            <Flex vertical gap="middle">
                <Radio.Group onChange={statusHandler} buttonStyle="solid">
                    <Radio.Button value="Новая">Новая</Radio.Button>
                    <Radio.Button value="В процессе">В процессе</Radio.Button>
                    <Radio.Button value="Завершена">Завершена</Radio.Button>
                    <Radio.Button value="Все">Все</Radio.Button>

                </Radio.Group>
            </Flex>
        </div>
    )
}