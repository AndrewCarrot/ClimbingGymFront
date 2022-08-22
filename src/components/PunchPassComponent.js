import {Modal, Popconfirm, Space, Table} from "antd";
import {MinusCircleFilled, MinusSquareTwoTone, PlusSquareTwoTone, QuestionCircleOutlined} from "@ant-design/icons";
import {useState} from "react";


export default function PunchPassComponent(props){


    function handleAddPunch(){
        fetch(`https://spider-system.herokuapp.com/punchPass/${props.climberId}/givePunch`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
            },
        })
            .then(()=>props.handleReload())
    }

    function handleTakePunch(){
        fetch(`https://spider-system.herokuapp.com/punchPass/${props.climberId}/takePunch`,{
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
            },
        })
            .then(()=> props.handleReload())
    }

    function handleDelete(){
        fetch(`https://spider-system.herokuapp.com/punchPass/${props.climberId}/delete`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json'
            }
        })
            .then(()=> props.handleReload())
    }



    const dataSource = [
        {
            key: '1',
            type: "Ilościowy",
            discount: props.pass.discount === true ? "ulgowy" : "normalny",
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
        <div className={"PunchPass"}>
            <Table dataSource={dataSource} columns={columns} pagination={false}/>

        </div>
    )
}