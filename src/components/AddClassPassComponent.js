import {useState} from "react";
import {Button, InputNumber, Modal, Select} from "antd";
import {PlusCircleFilled} from "@ant-design/icons";
import {Option} from "antd/es/mentions";

export default function AddClassPassComponent(props){
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [frequencySelect, setFrequencySelect] = useState("")
    const [typeSelect, setTypeSelect] = useState("")

    const date = new Date();

    const year = date.getFullYear();
// 👇️ getMonth returns integer from 0(January) to 11(December)
    const month = date.getMonth() + 1;
    const paddedMonth = month.toString().padStart(2,'0')
    const day = date.getDate();
    const paddedDay = day.toString().padStart(2, '0')

    function handleFrequencySelect(value){
        setFrequencySelect(value)
    }

    function handleTypeSelect(value){
        setTypeSelect(value)
    }

    function handleCancel(){

        setTypeSelect("")
        setFrequencySelect("")
        setIsModalVisible(false)
    }

    const handleModalSubmit = async() =>{

        const response = await fetch(`https://spider-system.herokuapp.com/classPass/${props.climberId}/new`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                discount: typeSelect === 'ulgowa' || typeSelect === "dziecięca",
                note: "",
                classFrequency: frequencySelect,
                validFrom: `${year}-${paddedMonth}-${paddedDay}`, //yyyy-mm-dd
                multisport: false
            })
        });

        if(response.ok)
            props.handleReload()

        setTypeSelect("")
        setFrequencySelect("")
        setIsModalVisible(false)
    }

    return(
        <div className="AddClassPass">
            <Button type="primary" onClick={()=>setIsModalVisible(true)}>
                <PlusCircleFilled /> Sekcja
            </Button>
            <Modal
                title="Karnet Sekcja"
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
                    defaultValue="Ilość sekcji"
                    style={{
                        width: 220,
                        float:"left"
                    }}
                    onChange={handleFrequencySelect}
                >
                    <Select.Option value="ONCE_PER_WEEK">Raz w tygodniu</Select.Option>
                    <Select.Option value="TWICE_PER_WEEK">Dwa razy w tygodniu</Select.Option>
                </Select>
                <Select
                    defaultValue="Typ sekcji"
                    style={{
                        width: 220,
                        float:"right"
                    }}
                    onChange={handleTypeSelect}
                >
                    <Select.Option value="ulgowa">ulgowa</Select.Option>
                    <Select.Option value="normalna">normalna</Select.Option>
                    <Select.Option value="dziecięca">dziecięca</Select.Option>
                </Select>
            </Modal>
        </div>
    )
}