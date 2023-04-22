import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { BasePasswordInput } from './BasePasswordInput';

const meta: Meta<typeof BasePasswordInput> = {
    title: "PasswordInput/Base",
    component: BasePasswordInput,
};

export default meta;

type Story = StoryObj<typeof BasePasswordInput>;

export const Normal: Story = {
    args: {
        placeholder: "PasswordBaseInput",
        ref: React.createRef(),
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        const element = canvas.getByPlaceholderText("PasswordBaseInput")
        userEvent.type(element, "test")
        expect(args.onChange).toBeCalledTimes(4)
        expect(args.onKeyDown).toBeCalledTimes(4)
        expect(args.onKeyUp).toBeCalledTimes(4)
        expect(element).toBeInTheDocument()
        userEvent.type(element, "{backspace}".repeat(4))
        args.ref?.current?.focus()
        expect(args.onFocus).toBeCalledTimes(1)

    }
}

export const Disabled: Story = {
    args: {
        placeholder: "DisabledPasswordBaseInput",
        disabled: true,
        ref: React.createRef()
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        const element = canvas.getByPlaceholderText("DisabledPasswordBaseInput")
        userEvent.type(element, "test")
        expect(args.onChange).toBeCalledTimes(0)
        expect(args.onKeyDown).toBeCalledTimes(0)
        expect(args.onKeyUp).toBeCalledTimes(0)
        expect(element).toBeInTheDocument()
        args.ref?.current?.focus()
        expect(args.onFocus).toBeCalledTimes(0)
    }
}
