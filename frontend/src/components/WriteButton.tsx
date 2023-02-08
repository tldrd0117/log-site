import React from 'react'
import BlueButton from './Button'
import { useNavigate } from 'react-router-dom';

const WriteButton = () => {
    const navigate = useNavigate();
    return <>
        <BlueButton onClick={()=>navigate("/write")}>글쓰기</BlueButton>
    </>
}

export default WriteButton