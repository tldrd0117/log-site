import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { FloatBottomLayout } from './FloatBottomLayout';
import { PrimaryButton } from '@/components/Button/PrimaryButton';
import { BorderBox } from '@/components/Box/BorderBox';


const meta: Meta<typeof FloatBottomLayout> = {
    title: "Layout/FloatBottomLayout",
    component: FloatBottomLayout,
    parameters:{
        layout: 'fullscreen'
    },
    render: (args) => <>
        <BorderBox className='w-9/12 h-5/6 absolute'>
            <FloatBottomLayout {...args}/>
        </BorderBox>
    </>,
    args: {
        leftComponent: <>
            <PrimaryButton label='테스트'/>
            <PrimaryButton label='테스트3'/>
        </>,
        rightComponent: <>
            <PrimaryButton label='테스트5'/>
            <PrimaryButton label='테스트6'/>
        </>,
    }
};

export default meta;

type Story = StoryObj<typeof FloatBottomLayout>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {

    }
}

export const Disabled: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {
    }
}
