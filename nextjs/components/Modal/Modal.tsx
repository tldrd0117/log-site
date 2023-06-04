import clsx from "clsx";
import { Portal } from "../Potal/Portal"
import { Container, ContainerProps } from "@/containers/container/Container";
import { useState } from "react";

export interface ModalProps{
    containerProps?: ContainerProps
    children?: React.ReactNode
    bgClassName?: string
    isShow?: boolean
    onClose?: () => void
}

export const Modal = (props: ModalProps) => {
    let {children, containerProps, bgClassName, isShow, onClose} = props
    if(!containerProps) containerProps = {
        className: ""
    }
    const handleOnClickBG = () => {
        onClose && onClose()
    }
    if(isShow){
        return <>
            <Portal>
                <Container onClick={handleOnClickBG} className={clsx("top-0 left-0 bg-black bg-opacity-50 w-full h-full flex items-center justify-center z-20 absolute", bgClassName)}>
                    <div {...containerProps} className={clsx(containerProps?.className, "drop-shadow-2xl",)}>
                        {children}
                    </div>
                </Container>
            </Portal>
        </>
    } else {
        return <></>
    }
    
}