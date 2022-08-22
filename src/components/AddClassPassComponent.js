import {useState} from "react";
import {Alert, Button, Modal, Select} from "antd";
import {PlusCircleFilled} from "@ant-design/icons";

export default function AddClassPassComponent(props){
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [frequencySelect, setFrequencySelect] = useState("")
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
        setTypeSelect("")
        setFrequencySelect("")
        setIsModalVisible(false)
        setErr(false)
    }

    function handleFrequencySelect(value){
        setFrequencySelect(value)
    }

    function handleTypeSelect(value){
        setTypeSelect(value)
    }


    const handleModalSubmit = async() =>{

        if(frequencySelect === "")
            setErr(true)
        else if(typeSelect === "")
            setErr(true)
        else {
            const response = await fetch(`https://spider-system.herokuapp.com/classPass/${props.climberId}/new`, {
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

            if (response.ok)
                props.handleReload()

            setTypeSelect("")
            setFrequencySelect("")
            setIsModalVisible(false)
        }
    }

    return(
        <div className="AddClassPass">
            <Button type="primary" onClick={()=>setIsModalVisible(true)}>
                <PlusCircleFilled /> Sekcja
            </Button>
            <Modal
                title="Karnet Sekcja"
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
                {err && <Alert style={{width:160}}  message={frequencySelect === "" ? "Podaj ilość zajęć!" : "Wybierz typ sekcji!"} type="error" />}
            </Modal>
        </div>
    )
}