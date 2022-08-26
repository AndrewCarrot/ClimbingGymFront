import {useEffect, useState} from "react";
import {Alert, Button, Input, Modal, Popconfirm, Select, Table, TimePicker} from "antd";
import {MinusCircleFilled, QuestionCircleOutlined} from "@ant-design/icons";

const format = 'HH:mm';

export default function ClassEditComponent() {
    const [err, setErr] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const [isModalVisible, setIsModalVisible] = useState(false)
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
    const [groupData, setGroupData] = useState({
        name: "",
        coach: "",
        type: "",
        dayOfWeek: "",
        classTime: []
    })

    useEffect(() => {
        fetch('https://spider-system.herokuapp.com/groups/get/all')
            .then(res => res.json())
            .then(data => setGroups(data))
    }, [reload])


    const handleGroupDelete = async (key) => {
        const response = await fetch(`https://spider-system.herokuapp.com/groups/delete?groupId=${key}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
            },
        });

        if (response.ok)
            handleReload()
    }

    function handleReload() {
        setReload(prevState => !prevState)
    }

    function handleModalClose() {
        setGroupData({
            name: "",
            coach: "",
            type: "",
            dayOfWeek: "",
            classTime: []
        })
        setIsModalVisible(false)
        setErr(false)
    }

    const handleModalSubmit = async () => {

        if (groupData.name.length === 0) {
            setErrMsg("Pole nazwa sekcji nie może być puste !")
            setErr(true)
        } else if (groupData.coach.length === 0) {
            setErrMsg("Pole instruktor nie może być puste !")
            setErr(true)
        } else if (groupData.type.length === 0) {
            setErrMsg("Wybierz typ sekcji !")
            setErr(true)
        } else if (groupData.dayOfWeek.length === 0) {
            setErrMsg("Wybierz dzień !")
            setErr(true)
        }else if(groupData.classTime.length === 0){
            setErrMsg("Wybierz godzinę !")
            setErr(true)
        } else {
            const response = await fetch(`https://spider-system.herokuapp.com/groups/new`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: groupData.name,
                    coach: groupData.coach,
                    type: groupData.type,
                    dayOfWeek: groupData.dayOfWeek,
                    classTime: groupData.classTime
                })
            });
            if (response.ok) {
                setGroupData({
                    name: "",
                    coach: "",
                    type: "",
                    dayOfWeek: "",
                    classTime: []
                })
                setIsModalVisible(false)
                setErr(false)
                handleReload()
            } else {
                setErrMsg("Źle robisz")
                setErr(true)
            }

        }
    }

        const columns = [
            {
                title: 'Instruktor',
                dataIndex: 'coach',
                key: 'coach',
            },
            {
                title: 'Nazwa',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Dzień',
                dataIndex: 'day',
                key: 'day'
            },
            {
                title: 'Usuń',
                dataIndex: 'delete',
                render: (_, record) => (
                    <Popconfirm
                        title="Are you sure？"
                        onConfirm={() => handleGroupDelete(record.key)}
                        icon={
                            <QuestionCircleOutlined
                                style={{
                                    color: 'red',
                                }}
                            />
                        }
                    >
                        <a> Usuń </a>
                    </Popconfirm>
                )
            },
        ]

        let dataSource
        if (Array.isArray(groups)) {
            dataSource = groups.map(group => ({
                key: group.id,
                coach: group.coach,
                name: group.name,
                day: group.dayOfWeek
            }))
        } else {
            dataSource = [{
                key: groups.id,
                coach: groups.coach,
                name: groups.name,
                day: groups.dayOfWeek
            }]
        }

        function handleGroupTypeSelect(value) {
            setGroupData(prevState => {
                return ({
                    ...prevState,
                    type: value
                })
            })
        }

        function handleDaySelect(value) {
            setGroupData(prevState => {
                return ({
                    ...prevState,
                    dayOfWeek: value
                })
            })
        }

        function handleInputChange(e) {
            setGroupData(prevState => {
                return ({
                    ...prevState,
                    [e.target.name]: e.target.value
                })
            })
        }

        function handleTimeChange(value) {
            setGroupData(prevState => {
                return ({
                    ...prevState,
                    classTime: [value._d.getHours(), value._d.getMinutes()]
                })
            })
        }

        return (
            <div className="ClassEdit">
                <Button onClick={() => setIsModalVisible(true)} style={{marginBottom: 10}} type="primary">Dodaj</Button>
                <Modal
                    className="class--edit--modal"
                    title="Utwórz nową grupę"
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
                    <Input placeholder="nazwa grupy" name="name" onChange={handleInputChange}/>
                    <Input placeholder="instruktor" name="coach" onChange={handleInputChange}/>
                    <Select
                        name="type"
                        defaultValue="typ sekcji"
                        onChange={handleGroupTypeSelect}
                        style={{
                            width: 180
                        }}
                    >
                        <Select.Option value="CHILDREN">Dzieci</Select.Option>
                        <Select.Option value="BEGINNERS">Początkujący</Select.Option>
                        <Select.Option value="INTERMEDIATE">Średnio zaawansowani</Select.Option>
                        <Select.Option value="ADVANCED">Zaawansowani</Select.Option>
                    </Select>
                    <Select
                        defaultValue="dzień"
                        onChange={handleDaySelect}
                        style={{
                            width: 110
                        }}
                    >
                        <Select.Option value="MONDAY">Poniedziałek</Select.Option>
                        <Select.Option value="TUESDAY">Wtorek</Select.Option>
                        <Select.Option value="WEDNESDAY">Środa</Select.Option>
                        <Select.Option value="THURSDAY">Czwartek</Select.Option>
                        <Select.Option value="FRIDAY">Piątek</Select.Option>
                    </Select>
                    <TimePicker format={format} placeholder="godzina" onOk={handleTimeChange}/>

                    {err && <Alert style={{width: 280, height: 35}} message={errMsg} type="error"/>}
                </Modal>

                <Table dataSource={dataSource} columns={columns} pagination={{pageSize: 50}} scroll={{y: 400}}/>
            </div>
        )
    }

