import {useEffect, useState} from "react";
import {Button, Form, Input, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";


export default function AllClimbersComponent(){
    const [climbers, setClimbers] = useState([{
        firstName:"",
        lastName:"",
        cardNumber:"",
        phoneNumber:""
    }])

    const [form] = Form.useForm();
    const navigate = useNavigate()

    const climbersRequest = 'https://spider-system.herokuapp.com/climbers/get/'

    //TODO should also return customPasses
    useEffect(()=>{
        fetch(climbersRequest + 'all')
            .then(res => res.json())
            .then(data => setClimbers(data.content))
        }
        ,[])


    // TODO wyszukiwanie po kilku polach jednocześnie

    const onFinish = async (values) => {
        if(values.firstName)
            fetch(climbersRequest + `by-first-name?firstName=${values.firstName}`)
                .then(res => res.json())
                .then(data => setClimbers(data.content))
        else if(values.lastName)
            fetch(climbersRequest + `by-last-name?lastName=${values.lastName}`)
                .then(res => res.json())
                .then(data => setClimbers(data.content))
        else if(values.cardNumber)
            fetch(climbersRequest + `by-card-number?cardNumber=${values.cardNumber}`)
                .then(res => res.json())
                .then(data => setClimbers(data))
        else
            fetch(climbersRequest + 'all')
                .then(res => res.json())
                .then(data => setClimbers(data.content))

        form.resetFields()
    }

    // key contains cardNumber
    const handleProfileRedirect = async (key) => {

        const response = await fetch(`https://spider-system.herokuapp.com/card-associated/get?cardNumber=${key}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        const data = await response.json();
        if(data.climber !== null)
            navigate('/climber-profile',{state:{data}});

    }


    let dataSource
    if(Array.isArray(climbers)) {
        dataSource = climbers.map(climber => ({
            key: climber.cardNumber,
            firstName: climber.firstName,
            lastName: climber.lastName,
            cardNumber: climber.cardNumber,
            phoneNumber: climber.phoneNumber

        }))
    } else {
        dataSource = [{
            key: climbers.cardNumber,
            firstName: climbers.firstName,
            lastName: climbers.lastName,
            cardNumber: climbers.cardNumber,
            phoneNumber: climbers.phoneNumber
        }]
    }

    const columns = [
        {
            title: 'Imię',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Nazwisko',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Numer karty',
            dataIndex: 'cardNumber',
            key: 'cardNumber',
        },
        {
            title: 'Numer telefonu',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Profil',
            dataIndex: 'profile',
            render: (_, record) => <a onClick={()=>handleProfileRedirect(record.key)}> Przejdź </a>
        },
    ];


    return(
        <div className="AllClimbers">

            <Form
                layout="inline"
                form={form}
                style={{marginBottom: "20px"}}
                onFinish={onFinish}
            >

                <Form.Item name="firstName"  style={{width:"200px"}}>
                    <Input placeholder="Imię" prefix={<SearchOutlined />} />
                </Form.Item>
                <Form.Item name="lastName" style={{width:"200px"}}>
                    <Input placeholder="Nazwisko" prefix={<SearchOutlined />} />
                </Form.Item>
                <Form.Item name="cardNumber" style={{width:"200px"}}>
                    <Input placeholder="Numer karty" prefix={<SearchOutlined />} />
                </Form.Item>
                <Form.Item >
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{borderRadius:'2px'}}
                    >
                        Szukaj
                    </Button>
                </Form.Item>
            </Form>

            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 50 }} scroll={{ y: 400 }} />
        </div>
    )
}