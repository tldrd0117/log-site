import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { Portal } from './Portal';
import { BorderBox } from '../Box/BorderBox';
import { CardBox } from '../Box/CardBox';
import { FloatBottomLayout } from '@/containers/Layout/FloatBottomLayout';

const meta: Meta<typeof Portal> = {
    title: "Portal/Portal",
    component: Portal,
    parameters:{
        layout: 'fullscreen'
    },
    args: {
    }
};

export default meta;

type Story = StoryObj<typeof Portal>;

export const Normal: Story = {
    args: {
    },
    render: (args) => {
        return <>
            <Portal>
                <BorderBox>test</BorderBox>
            </Portal>
        </>
    },
    play: async ({args, canvasElement}) => {

    }
}


