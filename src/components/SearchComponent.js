import Search from "antd/es/input/Search";
import {Navigate, useNavigate} from "react-router-dom";

import {useEffect, useState} from "react";

import {Alert} from "antd"

export default function SearchComponent(){
    const[err, setErr] = useState(false)
    const navigate = useNavigate()

    const onSearch = async (value) =>{


        const response = await fetch(`https://spider-system.herokuapp.com/card-associated/get?cardNumber=${value}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });



        if (!response.ok) {
            setErr(true)
            throw new Error(`Error! status: ${response.status}`);
        }
        const data = await response.json();

        if(data.climber !== null)
            navigate('/climber-profile',{state:value});
        // else if(data.customPass !==null)
        //     navigate('/custom-pass', {state:value});

        setErr(true)
    };

    return(
        <div className={"Search"}>
            <Search
                style={{
                    margin: "10px",
                    width: "300px"
                }}
                placeholder="numer karty"
                allowClear
                enterButton="Szukaj"
                size="large"
                onSearch={onSearch}
            />
            {err && <Alert message="Podana karta nie istnieje" type="error" />}
        </div>
    )
}