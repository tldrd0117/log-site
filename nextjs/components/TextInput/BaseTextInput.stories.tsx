import React from 'react';
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
        placeholder: "NormalBaseInput",
        ref: React.createRef(),
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        userEvent.type(canvas.getByRole('textbox'), "test")
        expect(args.onChange).toBeCalledTimes(4)
        expect(args.onKeyDown).toBeCalledTimes(4)
        expect(args.onKeyUp).toBeCalledTimes(4)
        expect(canvas.getByPlaceholderText("NormalBaseInput")).toBeInTheDocument()
        userEvent.type(canvas.getByRole('textbox'), "{backspace}".repeat(4))
        args.ref?.current?.focus()
        expect(args.onFocus).toBeCalledTimes(1)

    }
}

export const Disabled: Story = {
    args: {
        placeholder: "DisabledBaseInput",
        disabled: true,
        ref: React.createRef()
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        userEvent.type(canvas.getByRole('textbox'), "test")
        expect(args.onChange).toBeCalledTimes(0)
        expect(args.onKeyDown).toBeCalledTimes(0)
        expect(args.onKeyUp).toBeCalledTimes(0)
        expect(canvas.getByPlaceholderText("DisabledBaseInput")).toBeInTheDocument()
        args.ref?.current?.focus()
        expect(args.onFocus).toBeCalledTimes(0)
    }
}
