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


export default function ClimberProfileComponent(){
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

    return(
        <div className={"Climber"} >

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
                    <p>
                        {climber.note}
                    </p>
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