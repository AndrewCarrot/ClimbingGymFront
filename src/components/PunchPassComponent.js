import {Space, Table} from "antd";
import {MinusSquareTwoTone, PlusSquareTwoTone} from "@ant-design/icons";


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

    ];

    return(
        <div className={"PunchPass"}>
            <Table dataSource={dataSource} columns={columns} pagination={false}/>
        </div>
    )
}