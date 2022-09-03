import {Button, Card, Col, Row} from "antd";
import {CalendarTwoTone} from "@ant-design/icons";
import {useEffect, useState} from "react";
import ClassScheduleTile from "./ClassScheduleTile";

export default function ClassScheduleComponent(){
    const [reload, setReload] = useState(false)
    const [groups, setGroups] = useState([{
        id: null,
        name: "",
        coach: "",
        type: "",
        duration: [],
        dayOfWeek: "",
        classTime: [],
        climbers: []
    }])

    useEffect(()=>{
        fetch(`https://spider-system.herokuapp.com/groups/get/all`)
            .then(res => res.json())
            .then(data => setGroups(data))
    },[reload])

    function handleReload(){
        setReload(prevState => !prevState)
    }

    function generateTile(hour,day){
        return groups.map(
            g=> (g.classTime[0] === hour && g.dayOfWeek === day) && <ClassScheduleTile key={g.id} data={g} handleReload={handleReload}/>
        )
    }

    return(
       <div className="ClassSchedule">

           <div className="schedule--container">
               <Row>
                   <Col span={4}>
                       <Card >
                           <CalendarTwoTone style={{fontSize:50}}/>
                       </Card>
                   </Col>
                   <Col span={4}>
                       <Card >
                           <h1>Poniedziałek</h1>
                       </Card>
                   </Col>
                   <Col span={4}>
                       <Card >
                           <h1>Wtorek</h1>
                       </Card>
                   </Col>
                   <Col span={4}>
                       <Card >
                           <h1>Środa</h1>
                       </Card>
                   </Col>
                   <Col span={4}>
                       <Card >
                           <h1>Czwartek</h1>
                       </Card>
                   </Col>
                   <Col span={4}>
                       <Card >
                           <h1>Piątek</h1>
                       </Card>
                   </Col>
               </Row>

               <Row>
                   <Col span={4}>
                       <Card>
                           <h1>7:00</h1>
                       </Card>
                   </Col>
                   <Col span={4}>
                       {generateTile(7,'MONDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(7,'TUESDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(7,'WEDNESDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(7,'THURSDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(7,'FRIDAY')}
                   </Col>
               </Row>

               <Row>
                   <Col span={4}>
                       <Card>
                           <h1>8:00</h1>
                       </Card>
                   </Col>
                   <Col span={4}>
                       {generateTile(8,'MONDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(8,'TUESDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(8,'WEDNESDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(8,'THURSDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(8,'FRIDAY')}
                   </Col>
               </Row>

               <Row>
                   <Col span={4}>
                       <Card>
                           <h1>9:00</h1>
                       </Card>
                   </Col>
                   <Col span={4}>
                       {generateTile(9,'MONDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(9,'TUESDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(9,'WEDNESDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(9,'THURSDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(9,'FRIDAY')}
                   </Col>
               </Row>

               <Row>
                   <Col span={4}>
                       <Card>
                           <h1>16:00</h1>
                       </Card>
                   </Col>
                   <Col span={4}>
                       {generateTile(16,'MONDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(16,'TUESDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(16,'WEDNESDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(16,'THURSDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(16,'FRIDAY')}
                   </Col>
               </Row>

               <Row>
                   <Col span={4}>
                       <Card>
                           <h1>17:00</h1>
                       </Card>
                   </Col>
                   <Col span={4}>
                       {generateTile(17,'MONDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(17,'TUESDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(17,'WEDNESDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(17,'THURSDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(17,'FRIDAY')}
                   </Col>
               </Row>

               <Row>
                   <Col span={4}>
                       <Card>
                           <h1>18:00</h1>
                       </Card>
                   </Col>
                   <Col span={4}>
                       {generateTile(18,'MONDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(18,'TUESDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(18,'WEDNESDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(18,'THURSDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(18,'FRIDAY')}
                   </Col>
               </Row>

               <Row>
                   <Col span={4}>
                       <Card>
                           <h1>19:00</h1>
                       </Card>
                   </Col>
                   <Col span={4}>
                       {generateTile(19,'MONDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(19,'TUESDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(19,'WEDNESDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(19,'THURSDAY')}
                   </Col>
                   <Col span={4}>
                       {generateTile(19,'FRIDAY')}
                   </Col>
               </Row>
           </div>
       </div>
    )
}