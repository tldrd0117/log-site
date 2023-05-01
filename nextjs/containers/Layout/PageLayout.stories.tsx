import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { PageLayout } from './PageLayout';
import { PrimaryButton } from '@/components/Button/PrimaryButton';


const meta: Meta<typeof PageLayout> = {
    title: "Layout/PageLayout",
    component: PageLayout,
    parameters:{
        layout: 'fullscreen'
    },
    args: {
        children: <>
            <PrimaryButton label='1'/>
            <PrimaryButton label='2'/>
            <PrimaryButton label='3'/>
        </>
    }
};

export default meta;

type Story = StoryObj<typeof PageLayout>;

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
