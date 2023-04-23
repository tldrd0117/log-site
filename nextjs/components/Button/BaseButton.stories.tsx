import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { BaseButton } from './BaseButton';
import { BorderBox } from '../Box/BorderBox';

const meta: Meta<typeof BaseButton> = {
    title: "Button/Base",
    component: BaseButton,
    render: (args) => <BorderBox>
        <BaseButton {...args}/>
    </BorderBox>,
};

export default meta;

type Story = StoryObj<typeof BaseButton>;

export const Normal: Story = {
    args: {
        label: "NormalBaseButton",
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        userEvent.click(canvas.getByRole('button'))
        expect(args.onClick).toBeCalledTimes(1)
        expect(canvas.getByText("NormalBaseButton")).toBeInTheDocument()
    }
}

export const Disabled: Story = {
    args: {
        label: "DisabledBaseButton",
        disabled: true
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        userEvent.click(canvas.getByRole('button'))
        expect(args.onClick).toBeCalledTimes(0)
        expect(canvas.getByText("DisabledBaseButton")).toBeInTheDocument()
    }
}
