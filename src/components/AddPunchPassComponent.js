import {Button, InputNumber, Modal, Select} from "antd";
import {useState} from "react";
import {PlusCircleFilled} from "@ant-design/icons";

export default function AddPunchPassComponent(props){
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [inputNumber, setInputNumber] = useState(8)
    const [selectValue, setSelectValue] = useState("")

    function handleCancel(){
        // set the default value for the state
        setInputNumber(8);
        setSelectValue("");
        setIsModalVisible(false);
    }

    function handleInputNumber(value){
        setInputNumber(value)
    }

    function handleSelect(value){
        setSelectValue(value)
    }

    const handleModalSubmit = async() =>{
        console.log(inputNumber , selectValue, props.climberId)

        // ignore the warning
        if(inputNumber === null){
           //TODO
        }
        if(selectValue === ""){
            //TODO
        }

        const response = await fetch(`https://spider-system.herokuapp.com/punchPass/${props.climberId}/new`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                punches: inputNumber,
                discount: selectValue === 'ulgowy',
                note: ""
            })
    });

        if (response.ok){
            props.handleReload()
        }

        // set the default value for the state
        setInputNumber(8)
        setSelectValue("");
        setIsModalVisible(false)
    }

    return(
        <div className="AddPunchPass">
            <Button type="primary" onClick={()=>setIsModalVisible(true)}>
                <PlusCircleFilled /> Ilościowy
            </Button>
            <Modal
                title="Karnet Ilościowy"
                visible={isModalVisible}
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

                <InputNumber
                    style={{
                        width: 200
                    }}
                    min={0}
                    max={10}
                    defaultValue={8}
                    onChange={handleInputNumber}
                />
                <Select
                    defaultValue="Typ karnetu"
                    style={{
                        width: 250,
                        float:"right"
                    }}
                    onChange={handleSelect}
                >
                    <Select.Option value="ulgowy">ulgowy</Select.Option>
                    <Select.Option value="normalny">normalny</Select.Option>
                </Select>

            </Modal>
        </div>

    )
}