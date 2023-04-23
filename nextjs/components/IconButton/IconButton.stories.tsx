import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { CancelIcon } from '../Icon/CancelIcon';
import { IconButton } from './IconButton';
import { BorderBox } from '../Box/BorderBox';


const meta: Meta<typeof IconButton> = {
    title: "IconButton/IconButton",
    component: IconButton,
    args: {
        icon: <CancelIcon/>
    },
    render: (args) => <BorderBox>
        <IconButton {...args}/>
    </BorderBox>,
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        userEvent.click(canvas.getByRole('button'))
        expect(args.onClick).toBeCalledTimes(1)
        expect(canvas.getByTestId("cancel-icon")).toBeInTheDocument()

    }
}

export const Disabled: Story = {
    args: {
        disabled: true
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        userEvent.click(canvas.getByRole('button'))
        expect(args.onClick).toBeCalledTimes(0)
        expect(canvas.getByTestId("cancel-icon")).toBeInTheDocument()
    }
}
