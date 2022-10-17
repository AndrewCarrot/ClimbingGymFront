import {Button, Form, Input} from "antd";
import {useNavigate} from "react-router-dom";


export default function NewClimberComponent(){
    const navigate = useNavigate()

    const onFinish = async(values) =>{

        const {firstName, lastName, cardNumber, phoneNumber} = values

       const response = await fetch(`https://spider-system.herokuapp.com/climbers/create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cardNumber: cardNumber,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber
            })
        });
       if (response.ok){

           navigate('/climber-profile', {state: values.cardNumber});
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
                    <Input placeholder="Imię" />
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
                    <Input placeholder="Nazwisko"/>
                </Form.Item>

                <Form.Item
                    label="Numer karty"
                    name="cardNumber"
                    rules={[
                        {
                            required: true,
                            message: "Wprowadź kartę!"
                        },
                        ({getFieldValue})=>({
                            validator(_,value){
                                // console.log(getFieldValue('lastName'))
                                if(value.length !== 10)
                                    return Promise.reject('Nieprawidłowa długość numeru karty')
                                else if(isNaN(value))
                                    return Promise.reject('Numer karty zawiera niedozwolone znaki')
                                return Promise.resolve()
                            }
                        })
                    ]}
                >
                    <Input placeholder="Karta"/>
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
                    <Input placeholder="Numer telefonu"/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Dodaj
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}