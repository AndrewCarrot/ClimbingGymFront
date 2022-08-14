import {ContactsTwoTone, CreditCardTwoTone, PhoneTwoTone, SnippetsTwoTone, UserOutlined} from "@ant-design/icons";
import PunchPassComponent from "./PunchPassComponent";
import {useLocation} from "react-router-dom";
import TimePassComponent from "./TimePassComponent";
import ClassPassComponent from "./ClassPassComponent";


export default function ClimberProfileComponent(){

    const location = useLocation();

    // TODO let's pass here cardNumber or sth and do fetch here

    const{id, firstName, lastName, phoneNumber, cardNumber, note} = location.state.data.climber

    const timePass = location.state.data.climber.timePass
    const punchPass = location.state.data.climber.punchPass
    const classPass = location.state.data.climber.classPass


    return(
        <div className={"Climber"} >

            <header className={"climber--header"}>
                <div className={"name--div"}>
                    <h1><ContactsTwoTone/></h1>
                    <div>
                        <h1>{firstName}</h1>
                        <h1>{lastName}</h1>
                    </div>
                </div>
                <div className={"card-phone--div"}>
                    <h3><CreditCardTwoTone /> {cardNumber}</h3>
                    <h3><PhoneTwoTone /> {phoneNumber}</h3>
                </div>
                <div className={"note--div"}>
                   <h1><SnippetsTwoTone /></h1>
                    <p>
                        {note}
                    </p>
                </div>
            </header>

            <h1
                style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginTop: -10,
                    marginBottom: -10
            }}
            >
                Karnety:
            </h1>

            {timePass && <TimePassComponent climberId = {id} pass={timePass}/>}
            {punchPass && <PunchPassComponent climberId = {id} pass={punchPass} />}
            {classPass && <ClassPassComponent climberId = {id} pass={classPass} />}

        </div>
    )
}