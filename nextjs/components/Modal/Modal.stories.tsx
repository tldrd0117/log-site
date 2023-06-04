import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { Modal } from './Modal';
import { BorderBox } from '../Box/BorderBox';
import { CardBox } from '../Box/CardBox';
import { FloatBottomLayout } from '@/containers/layout/FloatBottomLayout';

const meta: Meta<typeof Modal> = {
    title: "Modal/Modal",
    component: Modal,
    parameters:{
        layout: 'fullscreen'
    },
    args: {
        isShow: true
    }
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Normal: Story = {
    args: {
    },
    render: (args) => {
        return <>
            <Modal {...args} containerProps={{
                className: 'w-96 h-96'
            }}>
                <BorderBox className='w-full h-full'>test</BorderBox>
            </Modal>
        </>
    },
    play: async ({args, canvasElement}) => {

    }
}


