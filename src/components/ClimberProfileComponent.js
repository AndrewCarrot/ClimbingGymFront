import {
    ContactsTwoTone, CreditCardOutlined,
    CreditCardTwoTone,
    PhoneOutlined,
    PhoneTwoTone,
    SnippetsTwoTone,
    UserOutlined
} from "@ant-design/icons";
import PunchPassComponent from "./PunchPassComponent";
import {useLocation, useNavigate} from "react-router-dom";
import TimePassComponent from "./TimePassComponent";
import ClassPassComponent from "./ClassPassComponent";
import {useEffect, useState} from "react";
import AddPunchPassComponent from "./AddPunchPassComponent";
import AddTimePassComponent from "./AddTimePassComponent";
import AddClassPassComponent from "./AddClassPassComponent";
import {Alert, Button, Input, Modal, message} from "antd";
import TextArea from "antd/es/input/TextArea";


export default function ClimberProfileComponent(){
    const [error, setError] = useState({
        err:false,
        msg:""
    })
    const [isDataEditVisible, setIsDataEditVisible] = useState(false)
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
    const [dataEditValues, setDataEditValues] = useState({
        firstName:"",
        lastName:"",
        phoneNumber:"",
        cardNumber:""
    })

    const navigate = useNavigate()
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

    function handleDataEditChange(e){
        setDataEditValues(prevState => ({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    function openDataEditModal(){
        setDataEditValues({
            firstName: climber.firstName,
            lastName: climber.lastName,
            phoneNumber: climber.phoneNumber,
            cardNumber: climber.cardNumber
        })
        setIsDataEditVisible(true)
    }

    function closeDataEditModal(){
        setIsDataEditVisible(false)
        setError({
            err: false,
            msg:""
        })
    }

    const handleDataEdit = async () => {

        if(dataEditValues.firstName !== "" && dataEditValues.lastName !== "" && dataEditValues.phoneNumber !== "" && dataEditValues.cardNumber !== "") {
            const res = await fetch(`https://spider-system.herokuapp.com/climbers/update?climberId=${climber.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cardNumber: dataEditValues.cardNumber,
                    firstName: dataEditValues.firstName,
                    lastName: dataEditValues.lastName,
                    phoneNumber: dataEditValues.phoneNumber
                })
            })

            if (res.ok) {
                message.success("Pomyślnie zmieniono dane!")
                setIsDataEditVisible(false)
                setError({
                    err: false,
                    msg: ""
                })
                navigate('/climber-profile', {state: dataEditValues.cardNumber});
                handleReload()
            } else {
                setError({
                    err: true,
                    msg: "Coś poszło nie tak"
                })
            }
        }else {
            setError({
                err:true,
                msg:"Wszystkie pola musza być wypelnione"
            })
        }
    }

    return(
        <div className={"Climber"} >

            {climber.note !== null ? <Alert
                message={climber.note}
                type="info"
                showIcon
            /> : <></> }

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


            <Button
                type="primary"
                danger={true}
                style={{width:"100px", marginTop:"100px"}}
                onClick={openDataEditModal}
            >
                Edytuj dane
            </Button>
            <Modal
                bodyStyle={{display:"flex", flexDirection:"horizontal", height:"120px"}}
                title="Edycja danych"
                visible={isDataEditVisible}
                onCancel={closeDataEditModal}
                footer={[
                    <Button
                        key="cancel"
                        type="primary"
                        onClick={closeDataEditModal}
                    >
                        Anuluj
                    </Button>,
                    <Button
                        key="confirm"
                        type="primary"
                        onClick={handleDataEdit}
                    >
                        Zapisz zmiany
                    </Button>,
                     error.err && <Alert key="error" type="error" showIcon message={error.msg} description="spróbuj ponownie" style={{fontWeight:"bold"}}/>
                ]}
            >
                <div
                    style={{
                        marginRight: "10px"
                    }}
                >
                    <Input
                        style={{
                            marginBottom:"10px"
                        }}
                        placeholder="Imię"
                        name="firstName"
                        value={dataEditValues.firstName}
                        onChange={handleDataEditChange}
                        prefix={<UserOutlined />}
                    />
                    <Input
                        placeholder="Nazwisko"
                        name="lastName"
                        value={dataEditValues.lastName}
                        onChange={handleDataEditChange}
                        prefix={<UserOutlined />}
                    />
                </div>
                <div>
                    <Input
                        style={{
                            marginBottom:"10px"
                        }}
                        placeholder="Telefon"
                        name="phoneNumber"
                        value={dataEditValues.phoneNumber}
                        onChange={handleDataEditChange}
                        prefix={<PhoneOutlined />}
                    />

                    <Input
                        placeholder="Karta"
                        name="cardNumber"
                        value={dataEditValues.cardNumber}
                        onChange={handleDataEditChange}
                        prefix={<CreditCardOutlined />}
                    />
                </div>

            </Modal>
        </div>
    )
}