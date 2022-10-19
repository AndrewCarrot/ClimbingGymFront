import './styles/App.css';
import {
    CalendarOutlined,
    CameraOutlined,
    ClockCircleOutlined,
    CreditCardOutlined, EditOutlined,
    FieldNumberOutlined,
    SearchOutlined,
    TeamOutlined,
    UserAddOutlined,
    UserOutlined
} from '@ant-design/icons';
import {Layout, Menu} from "antd"
import 'antd/dist/antd.css'
import {Link, Route, Routes} from "react-router-dom";
import SearchComponent from "./components/SearchComponent";
import ClimberProfileComponent from "./components/ClimberProfileComponent";
import NewClimberComponent from "./components/NewClimberComponent";
import AllClimbersComponent from "./components/AllClimbersComponent";
import ClassScheduleComponent from "./components/ClassScheduleComponent";
import ClassEditComponent from "./components/ClassEditComponent";

const {Header, Content, Footer, Sider} = Layout


function App() {


    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    const items = [
        getItem(<Link to="/read">Odczyt</Link>, 'sub1', <SearchOutlined />),
        getItem('Sekcje', 'sub2', <CreditCardOutlined />, [
            getItem(<Link to="/classes">plan sekcji</Link>, '3', <CalendarOutlined />),
            getItem(<Link to="/classes/edit">edycja</Link>, '4', <EditOutlined />)
        ]),
        getItem("Klienci", 'sub4', <UserOutlined/>,[
            getItem(<Link to="/new-climber">nowy klient</Link>, '7', <UserAddOutlined />),
            getItem(<Link to="/all-climbers">wszyscy</Link>, '8', <TeamOutlined />)
        ])
    ];


    return (
        <div className="App">
            <Layout style={{height: "100%"}}>
                <Header>
                        <h3 style={{color: "white"}}>
                            logo
                        </h3>
                </Header>
                <Layout>
                    <Sider style={{backgroundColor: "white"}} className="main--sider">
                        <Menu
                            style={{

                            }}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            items={items}
                        />
                    </Sider>
                    <Content
                        style={{
                            backgroundColor: "#f0f2f5",
                            minHeight:"1000px"
                    }}
                    >
                        <Routes>
                            <Route path="/" element={<SearchComponent/>}/>
                            <Route path="read" element={<SearchComponent />} />
                            <Route path="climber-profile" element={<ClimberProfileComponent />} />
                            <Route path="new-climber" element={<NewClimberComponent/>}/>
                            <Route path="/all-climbers" element={<AllClimbersComponent />} />
                            <Route path="classes" element={<ClassScheduleComponent/>}/>
                            <Route path="classes/edit" element={<ClassEditComponent/>}/>
                        </Routes>
                    </Content>
                </Layout>
                <Footer
                    style={{
                        backgroundColor: "#3D3B39",
                        color: "white",
                        textAlign:"center",
                        position: "sticky",
                        bottom: "0"
                }}
                >
                    Marcin Bylski - jako tako i fajrant © 2022
                </Footer>
            </Layout>
        </div>
    );
}

export default App;
