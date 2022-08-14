import {Button, Form, Input} from "antd";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";


export default function NewClimberComponent(){
    const[climber, setClimber] = useState({})
    const navigate = useNavigate()

    const onFinish = async(values) =>{
       const response = await fetch(`https://spider-system.herokuapp.com/climbers/create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cardNumber: values.cardNumber,
                firstName: values.firstName,
                lastName: values.lastName,
                phoneNumber: values.phoneNumber
            })
        });

       if (response.ok){
           setClimber(()=>{
               redirect(values.cardNumber)
           })

       }
    }

    const redirect = async(cardNumber)=>{
        //TODO better way to redirect to created climber ?

        const response = await fetch(`https://spider-system.herokuapp.com/card-associated/get?cardNumber=${cardNumber}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        if (response.ok) {
            const result = await response.json();
            /*TODO create customPassComponent and check where to redirect */
            if (result.climber !== null)
                navigate('/climber-profile', {state: {result}});
        } else {
            console.log("zjebało się")
        }
    }

    function onFinishFailed(){

    }

    return(
        <div className={"NewClimber"}>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Imię"
                    name="firstName"
                    rules={[
                        {
                            required: true,
                            message: 'Wprowadź imię!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Nazwisko"
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            message: 'Wprowadź nazwisko!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Numer karty"
                    name="cardNumber"
                    rules={[
                        {
                            required: true,
                            message: "Wprowadź kartę!"
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Numer telefonu"
                    name="phoneNumber"
                    rules={[
                        {
                            required: true,
                            message: "Wprowadź numer telefonu!"
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}