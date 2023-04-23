import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { Box } from './Box';
import { Button } from '../Button/Button';


const meta: Meta<typeof Box> = {
    title: "Box/Box",
    component: Box,
    args: {
        children: <Button label='inLayoutButton'/>
    }
};

export default meta;

type Story = StoryObj<typeof Box>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        expect(canvas.queryByRole('button')).toBeInTheDocument()
    }
}

export const Hide: Story = {
    args: {
        isHide: true
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        expect(canvas.queryAllByRole('button')).toHaveLength(0)
    }
}
