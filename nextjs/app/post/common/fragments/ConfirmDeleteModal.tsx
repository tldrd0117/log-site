
import React, { useState } from "react";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { Modal } from "@/components/Modal/Modal";
import { Text } from "@/components/Text/Text";

export interface ConfirmDeleteModalProps {
    isShow: boolean
    onClose: () => void
    onConfirm: () => void
}

export const ConfirmDeleteModal = ({ isShow, onClose, onConfirm}: ConfirmDeleteModalProps) => {
    return <Modal isShow={isShow} onClose={()=>onClose()}>
        <div className='bg-white ring-slate-200 ring-1 p-4 rounded-lg w-auto inline-block'>
                <Text span className="text-gray-500 block mb-1 mt-4">해당 포스트를 삭제하시겠습니까?</Text>
                <div className='flex justify-end'>
                    <PrimaryButton onClick={() => onClose()} className='mt-4' label="취소"/>
                    <PrimaryButton onClick={() => onConfirm()} type='submit' className='mt-4 ml-4' label="삭제"/>
                </div>
        </div>
    </Modal>
}