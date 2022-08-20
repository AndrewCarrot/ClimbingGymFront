import {useState} from "react";
import {Button, InputNumber, Modal, Select} from "antd";
import {PlusCircleFilled} from "@ant-design/icons";

export default function AddTimePassComponent(props){
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [timeSelect, setTimeSelect] = useState("")
    const [typeSelect, setTypeSelect] = useState("")


    const date = new Date();

    const year = date.getFullYear();
// 👇️ getMonth returns integer from 0(January) to 11(December)
    const month = date.getMonth() + 1;
    const paddedMonth = month.toString().padStart(2,'0')
    const day = date.getDate();
    const paddedDay = day.toString().padStart(2, '0')


    function handleTimeSelect(value){
        setTimeSelect(value)
    }

    function handleTypeSelect(value){
        setTypeSelect(value)
    }

    function handleCancel(){

        setTimeSelect("")
        setTypeSelect("")
        setIsModalVisible(false)
    }

    const handleModalSubmit = async() =>{
        const response = await fetch(`https://spider-system.herokuapp.com/timePass/${props.climberId}/new`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                discount: typeSelect === 'ulgowy',
                note: "",
                duration: timeSelect,
                validFrom: `${year}-${paddedMonth}-${paddedDay}` //yyyy-mm-dd
            })
        });

        if (response.ok){
            props.handleReload()
        }

        setTimeSelect("")
        setTypeSelect("")
        setIsModalVisible(false)
    }

    return(
        <div className="AddTimePass">
            <Button type="primary" onClick={()=>setIsModalVisible(true)}>
                <PlusCircleFilled /> Czasowy
            </Button>
            <Modal
                title="Karnet Czasowy"
                visible={isModalVisible}
                onOk={()=>setIsModalVisible(false)}
                onCancel={()=>setIsModalVisible(false)}

                footer={[
                    <Button key="cancel" type="primary"  onClick={handleCancel}>
                        Anuluj
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleModalSubmit}
                    >
                        Dodaj
                    </Button>,
                ]}
                destroyOnClose={true}
            >
                <Select
                    defaultValue="Czas karnetu"
                    style={{
                        width: 220,
                        float:"left"
                    }}
                    onChange={handleTimeSelect}
                >
                    <Select.Option value="ONE_MONTH">30 dniowy</Select.Option>
                    <Select.Option value="THREE_MONTHS">90 dniowy</Select.Option>
                </Select>
                <Select
                    defaultValue="Typ karnetu"
                    style={{
                        width: 220,
                        float:"right"
                    }}
                    onChange={handleTypeSelect}
                >
                    <Select.Option value="ulgowy">ulgowy</Select.Option>
                    <Select.Option value="normalny">normalny</Select.Option>
                </Select>

            </Modal>
        </div>
    )
}