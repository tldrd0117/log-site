import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { TextInput } from './TextInput';
import searchIcon from '../../public/images/search_FILL0_wght400_GRAD0_opsz24.svg'

const meta: Meta<typeof TextInput> = {
    title: "TextInput/TextInput",
    component: TextInput,
    args: {
    }
};

export default meta;

type Story = StoryObj<typeof TextInput>;

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

export const WithIcon: Story = {
    args: {
        placeholder: "WithIconBaseInput",
        icon: searchIcon,
        ref: React.createRef()
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        userEvent.type(canvas.getByRole('textbox'), "test")
        expect(args.onChange).toBeCalledTimes(4)
        expect(args.onKeyDown).toBeCalledTimes(4)
        expect(args.onKeyUp).toBeCalledTimes(4)
        expect(canvas.getByPlaceholderText("WithIconBaseInput")).toBeInTheDocument()
        args.ref?.current?.focus()
        expect(args.onFocus).toBeCalledTimes(1)
    }
}

export const WithCancelButton: Story = {
    args: {
        placeholder: "WithCancelButtonBaseInput",
        cancelButton: true,
        ref: React.createRef()
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        userEvent.type(canvas.getByRole('textbox'), "test")
        expect(args.onChange).toBeCalledTimes(4)
        expect(args.onKeyDown).toBeCalledTimes(4)
        expect(args.onKeyUp).toBeCalledTimes(4)
        expect(canvas.getByPlaceholderText("WithCancelButtonBaseInput")).toBeInTheDocument()
        args.ref?.current?.focus()
        expect(args.onFocus).toBeCalledTimes(1)
        canvas.getByAltText("closeIcon").click();
        expect(args.onCancel).toBeCalledTimes(1);
    }
}

export const WithCancelButtonAndIcon: Story = {
    args: {
        placeholder: "WithCancelButtonAndIconBaseInput",
        cancelButton: true,
        icon: searchIcon,
        ref: React.createRef()
    },
    
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        userEvent.type(canvas.getByRole('textbox'), "test")
        expect(args.onChange).toBeCalledTimes(4)
        expect(args.onKeyDown).toBeCalledTimes(4)
        expect(args.onKeyUp).toBeCalledTimes(4)
        expect(canvas.getByPlaceholderText("WithCancelButtonAndIconBaseInput")).toBeInTheDocument()
        args.ref?.current?.focus()
        expect(args.onFocus).toBeCalledTimes(1)
        canvas.getByAltText("closeIcon").click();
        expect(args.onCancel).toBeCalledTimes(1);
    }
}