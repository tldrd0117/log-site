import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
    title: "Button/Primary",
    component: Button,
    parameters: { actions: { argTypesRegex: '^on.*' } },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Normal: Story = {
    args: {
        label: "PrimaryNoramlButton",
        primary: true
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        userEvent.click(canvas.getByRole('button'))
        expect(args.onClick).toBeCalledTimes(1)
        expect(canvas.getByText("PrimaryNoramlButton")).toBeInTheDocument()
    }
}

export const Disabled: Story = {
    args: {
        label: "PrimaryDisabledButton",
        primary: true,
        disabled: true
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        userEvent.click(canvas.getByRole('button'))
        expect(args.onClick).toBeCalledTimes(0)
        expect(canvas.getByText("PrimaryDisabledButton")).toBeInTheDocument()
    }
}
