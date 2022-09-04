import {Alert, Button, InputNumber, Modal, Select} from "antd";
import {useState} from "react";
import {PlusCircleFilled} from "@ant-design/icons";

export default function AddPunchPassComponent(props){
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [inputNumber, setInputNumber] = useState(8)
    const [selectValue, setSelectValue] = useState("")
    const [err, setErr] = useState(false)


    function handleModalClose(){
        setInputNumber(8);
        setSelectValue("");
        setIsModalVisible(false);
        setErr(false)
    }


    function handleInputNumber(value){
        setInputNumber(value)
    }

    function handleSelect(value){
        setSelectValue(value)
    }

    const handleModalSubmit = async() =>{

        // ignore the warning
        if(inputNumber === null){
            setErr(true)
        } else if(selectValue.length === 0){
            setErr(true)
        }else {
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

            if (response.ok) {
                props.handleReload()
            }

            // set the default value for the state
            setInputNumber(8)
            setSelectValue("");
            setIsModalVisible(false)
            setErr(false)
        }
    }

    return(
        <div className="AddPunchPass">
            <Button type="primary" onClick={()=>setIsModalVisible(true)}>
                <PlusCircleFilled /> Ilościowy
            </Button>
            <Modal
                title="Karnet Ilościowy"
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={[
                    <Button key="cancel" type="primary" onClick={handleModalClose}>
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
                    max={100}
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

                {err && <Alert style={{width:160}} message={inputNumber === null ? "Podaj ilość wejść!" : "Wybierz typ karnetu!"} type="error" />}
            </Modal>
        </div>

    )
}