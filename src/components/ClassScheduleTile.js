import {useState} from "react";
import {Alert, Button, Modal} from "antd";
import Search from "antd/es/input/Search";

String.prototype.toHHMMSS = function () {
    const sec_num = parseInt(this, 10);
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);


    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}

    return hours+':'+minutes;
}

export default function ClassScheduleTile(props){
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [err, setErr] = useState(true)

    let data = props.data

    let groupLevel
    const startTimeInSecs = data.classTime[0]*3600 + data.classTime[1]*60
    const durationInSecs = data.duration[0]*3600 + data.duration[1]*60
    let begHour
    let endHour
    let groupAdvancementClassName


    if(data.type === 'ADVANCED') {
        groupLevel = 'Zaawansowani'
        groupAdvancementClassName = 'advanced'
    }
    else if(data.type === 'INTERMEDIATE') {
        groupLevel = 'Średnio Zaawansowani'
        groupAdvancementClassName = 'intermediate'
    }
    else if(data.type === 'BEGINNERS') {
        groupLevel = "Początkujący"
        groupAdvancementClassName = 'beginner'
    }else{
        groupLevel = "Dzieci"
        groupAdvancementClassName = 'children'
    }

    begHour = startTimeInSecs.toString().toHHMMSS()
    endHour = (startTimeInSecs + durationInSecs).toString().toHHMMSS()


    const handleClimberDelete = async (value) =>{
        const res = await  fetch(`https://spider-system.herokuapp.com/groups/delete-climber?climberId=${value}&groupId=${props.data.id}`,
            {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' }
            })
        if (!res.ok){
            //handle exception
        }
        props.handleReload()
    }

    const onClimberSearch = async (value) =>{
        //clear input
        setSearchValue('')
        // search for climber
        const response = await fetch(`https://spider-system.herokuapp.com/climbers/get/by-card-number?cardNumber=${value}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            setErr(true)
            throw new Error(`Error! status: ${response.status}`);
        }
        const climber = await response.json();
        const climberId = climber.id

        // add climber to group
        const res = await  fetch(`https://spider-system.herokuapp.com/groups/add-climber?climberId=${climberId}&groupId=${props.data.id}`,
            {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' }
            })
        if (!res.ok){
            throw new Error(`Error! status: ${res.status}`)
        }

        props.handleReload()
        setErr(false)
    }

    function handleModalClose(){
        setIsModalVisible(false)
        setErr(false)
    }

    const climbers = data.climbers.map(c =>
        <div key={c.id} style={{
            display: "flex",
            justifyContent: "space-between"
        }}>
            <p>{c.firstName + " " + c.lastName}</p>
            <Button
                type="primary"
                onClick={()=>handleClimberDelete(c.id)}
            >
                usuń
            </Button>
        </div>
    )
    return(
        <div>
            <div className={`Tile ${groupAdvancementClassName}`} onClick={()=>setIsModalVisible(true)}>
                <h1>{data.coach}</h1>
                <h2>{groupLevel + " (" +data.name + ")"}</h2>
                <h3>{begHour+"-"+endHour}</h3>

            </div>
            <Modal
                title = "Członkowie"
                visible={isModalVisible}
                onCancel={handleModalClose}
                bodyStyle={{ overflowY: 'scroll',height:"200px" }}
                footer={[
                    <Search
                        value={searchValue}
                        style={{
                            float: "left",
                            width: "200px",
                            fontSize: "2px"
                        }}
                        placeholder="numer karty"
                        allowClear
                        enterButton="Dodaj"
                        onSearch={onClimberSearch}
                        onChange={(e)=>setSearchValue(e.target.value)}
                    />,
                    <Button
                        key="confirm"
                        type="primary"
                        onClick={handleModalClose}
                    >
                        Zatwierdź
                    </Button>,
                    err && <Alert style={{float:"left", height:"33px", paddingLeft:"10px"}} type="error" message="karta nie istnieje"/>
                ]}
            >
                {climbers}
            </Modal>

        </div>
    )
}