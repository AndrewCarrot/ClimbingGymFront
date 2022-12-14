
import {Button, Input, Modal, Popconfirm, Table, message} from "antd";
import {EditTwoTone, MinusCircleFilled, QuestionCircleOutlined} from "@ant-design/icons";
import {useState} from "react";


export default function TimePassComponent(props){
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [inputValue, setInputValue] = useState(null)

    function handleModalClose(){
        setIsModalVisible(false)
        setInputValue(null)
    }

    function handleInputChange(e){
        setInputValue(e.target.value)
    }

    const handlePassRenew = async () => {
        const res = await fetch(`https://spider-system.herokuapp.com/timePass/${props.climberId}/renew`,{
            method: 'PATCH',
            headers: {
                Accept: 'application/json'
            }
        });

        if(res.ok){
            message.success("Pomyślnie odnowiono karnet!")
            setIsModalVisible(false)
            props.handleReload()
        }
    }

    const handleModalConfirm = async ()=>{
        if(inputValue !== null) {
            const res = await fetch(`https://spider-system.herokuapp.com/timePass/${props.climberId}/addDays?days=${inputValue}`, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json'
                }
            });

            if (res.ok) {
                message.success("Pomyślnie wydłużono czas trwania karnetu!")
                setIsModalVisible(false)
                setInputValue(null)
                props.handleReload()
            }
        }else{
            setIsModalVisible(false)
        }

    }

    function handleDelete(){
        fetch(`https://spider-system.herokuapp.com/timePass/${props.climberId}/delete`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json'
            }
        })
            .then(()=> props.handleReload())
    }

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

    const validFrom = new Date(getParsedDate(props.pass.validFrom))
    const validTill = new Date(getParsedDate(props.pass.validTill))
    const daysLeft = Math.ceil((validTill.getTime()-validFrom.getTime()))/ (1000 * 3600 * 24)
    

    const dataSource = [
        {
            key: '1',
            type: "Czasowy",
            discount: props.pass.discount === true ? "ulgowy" : "normalny",
            validFrom: getParsedDate(props.pass.validFrom),
            validTill: getParsedDate(props.pass.validTill),
            leftDays: daysLeft
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

    return(
        <div className={"TimePass"}>
            <Table dataSource={dataSource} columns={columns} pagination={false}/>
            <Modal
                title="Edycja"
                visible={isModalVisible}
                onCancel={handleModalClose}
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
                        onClick={handleModalConfirm}
                    >
                        Przedłuż
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