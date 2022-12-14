import {useState} from "react";
import {Alert, Button, InputNumber, Modal, Select} from "antd";
import {PlusCircleFilled} from "@ant-design/icons";

export default function AddTimePassComponent(props){
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [timeSelect, setTimeSelect] = useState("")
    const [typeSelect, setTypeSelect] = useState("")
    const [err, setErr] = useState(false)


    const date = new Date();

    const year = date.getFullYear();
// 👇️ getMonth returns integer from 0(January) to 11(December)
    const month = date.getMonth() + 1;
    const paddedMonth = month.toString().padStart(2,'0')
    const day = date.getDate();
    const paddedDay = day.toString().padStart(2, '0')


    function handleModalClose(){
        setTimeSelect("")
        setTypeSelect("")
        setIsModalVisible(false)
        setErr(false)
    }

    function handleTimeSelect(value){
        setTimeSelect(value)
    }

    function handleTypeSelect(value){
        setTypeSelect(value)
    }

    const handleModalSubmit = async() =>{

        if (timeSelect === "")
            setErr(true)
        else if(typeSelect === "")
            setErr(true)
        else {
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

            if (response.ok) {
                props.handleReload()
            }

            setTimeSelect("")
            setTypeSelect("")
            setIsModalVisible(false)
        }
    }

    return(
        <div className="AddTimePass">
            <Button type="primary" onClick={()=>setIsModalVisible(true)}>
                <PlusCircleFilled /> Czasowy
            </Button>
            <Modal
                title="Karnet Czasowy"
                visible={isModalVisible}
                onCancel={handleModalClose}

                footer={[
                    <Button key="cancel" type="primary"  onClick={handleModalClose}>
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
                        marginLeft: 30
                    }}
                    onChange={handleTypeSelect}
                >
                    <Select.Option value="ulgowy">ulgowy</Select.Option>
                    <Select.Option value="normalny">normalny</Select.Option>
                </Select>
                {err && <Alert style={{width:160}}  message={timeSelect === "" ? "Podaj czas karnetu!" : "Wybierz typ karnetu!"} type="error" />}
            </Modal>
        </div>
    )
}