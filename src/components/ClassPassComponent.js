import {Popconfirm, Space, Table, message, Modal, Input, Button} from "antd";
import {
    EditTwoTone,
    MinusCircleFilled,
    MinusSquareTwoTone,
    PlusSquareTwoTone,
    QuestionCircleOutlined
} from "@ant-design/icons";
import {useState} from "react";


export default function ClassPassComponent(props){
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [inputValue, setInputValue] = useState(null)

    function getParsedDate(date){

        let dd = date[2];
        let mm = date[1];

        let yyyy = date[0];
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        let parsedDate =  yyyy + "-" + mm + "-" + dd;
        return parsedDate.toString();
    }

    function handleAddPunch(){
        fetch(`https://spider-system.herokuapp.com/classPass/${props.climberId}/givePunch`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
            },
        })
            .then(()=>{
                props.handleReload()
                message.success("Pomyślnie dodano wejście na sekcje !")
            })
    }

    function handleTakePunch(){
        fetch(`https://spider-system.herokuapp.com/classPass/${props.climberId}/takePunch`,{
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
            },
        })
            .then(()=> {
                props.handleReload()
                message.success("Pomyślnie zdjęto wejście z sekcji !")
            })
    }

    function handleDelete(){
        fetch(`https://spider-system.herokuapp.com/classPass/${props.climberId}/delete`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json'
            }
        })
            .then(()=> props.handleReload())
    }

    const validFrom = new Date(getParsedDate(props.pass.validFrom))
    const validTill = new Date(getParsedDate(props.pass.validTill))
    const daysLeft = Math.ceil((validTill.getTime()-validFrom.getTime()))/ (1000 * 3600 * 24)

    const dataSource = [
        {
            key: '1',
            type: "Sekcja",
            discount: props.pass.discount === true ? "ulgowy" : "normalny",
            validFrom: getParsedDate(props.pass.validFrom),
            validTill: getParsedDate(props.pass.validTill),
            leftDays: daysLeft,
            punches: props.pass.punches
        }
    ];

    const columns = [
        {
            title: 'Karnet',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Typ karnetu',
            dataIndex: 'discount',
            key: 'discount',
        },
        {
            title: 'Ważny od',
            dataIndex: 'validFrom',
            key: 'validFrom',
        },
        {
            title: 'Ważny do',
            dataIndex: 'validTill',
            key: 'validTill',
        },
        {
            title: 'Pozostało dni',
            dataIndex: 'leftDays',
            key: 'leftDays',
        },

        {
            title: 'Pozostało wejść',
            dataIndex: 'punches',
            key: 'punches',
        },
        {
            title: 'Wejście',
            dataIndex: 'entrance',
            render: (_, record) =>(
                <Space size="middle">
                    <a onClick={handleAddPunch} > <PlusSquareTwoTone style={{fontSize: 20}} />  </a>
                    <a onClick={handleTakePunch} > <MinusSquareTwoTone style={{fontSize: 20}} /> </a>
                </Space>
            )
        },
        {
            title:'Edycja',
            dataIndex: 'edit',
            render: (_,record)=>(
                <a onClick={()=>setIsModalVisible(true)}><EditTwoTone style={{fontSize: 20}} /></a>
            )
        },
        {
            title:'Usuń',
            dataIndex: 'delete',
            render: (_,record)=>(
                <Popconfirm
                    title="Are you sure？"
                    onConfirm={handleDelete}
                    icon={
                        <QuestionCircleOutlined
                            style={{
                                color: 'red',
                            }}
                        />
                    }
                >
                    <a> <MinusCircleFilled  style={{fontSize: 20}} /> </a>
                </Popconfirm>
            )
        }


    ];

    function handleModalClose() {
        setIsModalVisible(false)
        setInputValue(null)
    }

    const handleModalConfirm = async () => {
        if(inputValue !== null) {
            const res = await fetch(`https://spider-system.herokuapp.com/classPass/${props.climberId}/addDays?days=${inputValue}`, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json'
                }
            });

            if (res.ok) {
                props.handleReload()
                setIsModalVisible(false)
            }
        }
    }

    function handleInputChange(e){
        setInputValue(e.target.value)
    }

    const handlePassRenew = async () => {
        const res = await fetch(`https://spider-system.herokuapp.com/classPass/${props.climberId}/renew`,{
            method: 'PATCH',
            headers: {
                Accept: 'application/json'
            }
        });

        if(res.ok){
            setIsModalVisible(false)
            props.handleReload()
        }
    }

    return(
        <div className="ClassPass">
            <Table dataSource={dataSource} columns={columns} pagination={false}/>
            <Modal
                title="Edycja"
                visible={isModalVisible}
                onCancel={handleModalClose}
                onOk={handleModalConfirm}
                footer={[
                    <Button
                        type={"primary"}
                        style={{backgroundColor:"green", float:"left"}}
                        onClick={handlePassRenew}
                    >
                        Odnów karnet
                    </Button>,
                    <Button
                        type={"primary"}
                    >
                        Zapisz zmiany
                    </Button>
                ]}
            >
                <Input
                    placeholder="wydłużenie dni"
                    onChange={handleInputChange}
                    value={inputValue}
                >

                </Input>
            </Modal>
        </div>
    )
}