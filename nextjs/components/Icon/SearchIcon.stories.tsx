import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { SearchIcon } from './SearchIcon';


const meta: Meta<typeof SearchIcon> = {
    title: "Icon/Search",
    component: SearchIcon,
    args: {
        width: 24,
        height: 24,
        fillColor: 'blue'
    }
};

export default meta;

type Story = StoryObj<typeof SearchIcon>;

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
