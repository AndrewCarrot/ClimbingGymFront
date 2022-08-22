import {
    ContactsTwoTone,
    CreditCardTwoTone,
    PhoneTwoTone,
    PlusCircleFilled,
    SnippetsTwoTone,
    UserOutlined
} from "@ant-design/icons";
import PunchPassComponent from "./PunchPassComponent";
import {useLocation} from "react-router-dom";
import TimePassComponent from "./TimePassComponent";
import ClassPassComponent from "./ClassPassComponent";
import {useEffect, useState} from "react";
import AddPunchPassComponent from "./AddPunchPassComponent";
import AddTimePassComponent from "./AddTimePassComponent";
import AddClassPassComponent from "./AddClassPassComponent";
import {Button, Modal} from "antd";
import TextArea from "antd/es/input/TextArea";


export default function ClimberProfileComponent(){
    const [textAreaValue, setTextAreaValue] = useState("")
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [reload, setReload] = useState(false)
    const [climber, setClimber] = useState([{
        id:null,
        cardNumber:"",
        firstName:"",
        lastName:"",
        phoneNumber:"",
        note:"",
        punchPass:{},
        timePass:{},
        classPass:{}

    }])

    const location = useLocation();

    useEffect(()=>{
        fetch(`https://spider-system.herokuapp.com/card-associated/get?cardNumber=${location.state}`)
            .then(res => res.json())
            .then(data => setClimber(data.climber))
    },[reload])


    function handleReload(){
        setReload(prevState => !prevState)
    }

    function handleModalClose(){
        setIsModalVisible(false)
    }

    const handleModalSubmit = async() => {
        // api call add note
        const response = await fetch(`https://spider-system.herokuapp.com/climbers/update-note?climberId=${climber.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: textAreaValue
        });

        if(response.ok) {
            setIsModalVisible(false)
            handleReload()
        }
    }

    function handleTextAreaChange(e){
        setTextAreaValue(e.target.value)
    }

    const handleDeleteNote = async() =>{
        const response = await fetch(`https://spider-system.herokuapp.com/climbers/delete-note?climberId=${climber.id}`,{
            method: 'PATCH'
        })

        if (response.ok)
            handleReload()
    }

    return(
        <div className={"Climber"} >

            <p>{climber.note}</p>
            <header className={"climber--header"}>
                <div className={"name--div"}>
                    <h1><ContactsTwoTone/></h1>
                    <div>
                        <h1>{climber.firstName}</h1>
                        <h1>{climber.lastName}</h1>
                    </div>
                </div>
                <div className={"card-phone--div"}>
                    <h3><CreditCardTwoTone /> {climber.cardNumber}</h3>
                    <h3><PhoneTwoTone /> {climber.phoneNumber}</h3>
                </div>
                <div className={"note--div"}>
                   <h1><SnippetsTwoTone /></h1>
                    <a
                        style={{
                            fontWeight:"bold",
                            fontSize:16,
                            paddingBottom:8
                    }}
                        onClick={()=>setIsModalVisible(true)}
                    >
                        Dodaj notatkę
                    </a>
                    <p
                        style={{
                            fontWeight:"bold",
                            fontSize:16,
                            paddingTop:8
                        }}
                    >/</p>
                    <a
                        style={{
                            fontWeight:"bold",
                            fontSize:16,
                            paddingBottom:8
                        }}
                        onClick={handleDeleteNote}
                    >
                        Usuń notatkę
                    </a>
                    <Modal
                        className="note--modal"
                        title="Notatka"
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
                        <TextArea onChange={(e)=>handleTextAreaChange(e)} rows={6} placeholder="Pisz pan"  />
                    </Modal>
                </div>
            </header>

            <h1 className="passes--h1">
                Karnety:
            </h1>
            <div className="passes--modal--div">

                <AddPunchPassComponent climberId={climber.id} handleReload={handleReload} />
                <AddTimePassComponent climberId={climber.id} handleReload={handleReload} />
                <AddClassPassComponent climberId={climber.id} handleReload={handleReload} />

            </div>

            {climber.timePass && <TimePassComponent climberId = {climber.id} pass={climber.timePass} handleReload={handleReload} />}
            {climber.punchPass && <PunchPassComponent climberId = {climber.id} pass={climber.punchPass} handleReload={handleReload} />}
            {climber.classPass && <ClassPassComponent climberId = {climber.id} pass={climber.classPass} handleReload={handleReload}/>}

        </div>
    )
}