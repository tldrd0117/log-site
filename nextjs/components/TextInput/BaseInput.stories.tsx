import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { BaseTextInput } from './BaseTextInput';

const meta: Meta<typeof BaseTextInput> = {
    title: "TextInput/Base",
    component: BaseTextInput,
};

export default meta;

type Story = StoryObj<typeof BaseTextInput>;

export const Normal: Story = {
    args: {
        placeholder: "NormalBaseTextInput",
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        userEvent.type(canvas.getByRole('textbox'), "test")
        expect(args.onChange).toBeCalledTimes(4)
        expect(canvas.getByPlaceholderText("NormalBaseTextInput")).toBeInTheDocument()
    }
}

export const Disabled: Story = {
    args: {
        placeholder: "DisabledBaseTextInput",
        disabled: true
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        userEvent.type(canvas.getByRole('textbox'), "test")
        expect(args.onChange).toBeCalledTimes(0)
        expect(canvas.getByPlaceholderText("DisabledBaseTextInput")).toBeInTheDocument()
    }
}
