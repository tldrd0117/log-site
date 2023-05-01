import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import PostWrite from './write';


const meta: Meta<typeof PostWrite> = {
    title: "Pages/PostWrite",
    component: PostWrite,
    parameters:{
        layout: 'fullscreen'
    },
    args: {
    }
};

export default meta;

type Story = StoryObj<typeof PostWrite>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {

    }
}

