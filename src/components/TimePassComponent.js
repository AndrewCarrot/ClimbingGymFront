
import {Popconfirm, Table} from "antd";
import {MinusCircleFilled, QuestionCircleOutlined} from "@ant-design/icons";


export default function TimePassComponent(props){


    //TODO popup with confirmation
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
        </div>
    )
}