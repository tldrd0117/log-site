import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { BaseText } from './BaseText';
import { BorderBox } from '../Box/BorderBox';

const meta: Meta<typeof BaseText> = {
    title: "Text/Base",
    component: BaseText,
    render: (args) => <BorderBox>
        <BaseText {...args}/>
    </BorderBox>,
    args: {
        children: "BaseText"
    }
};

export default meta;

type Story = StoryObj<typeof BaseText>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {

    }
}

export const Heading1: Story = {
    args: {
        h1: true
    },
    play: async ({args, canvasElement}) => {

    }
}

export const Heading2: Story = {
    args: {
        h2: true
    },
    play: async ({args, canvasElement}) => {

    }
}

export const Heading3: Story = {
    args: {
        h3: true
    },
    play: async ({args, canvasElement}) => {

    }
}

export const Heading4: Story = {
    args: {
        h4: true
    },
    play: async ({args, canvasElement}) => {

    }
}

export const Heading5: Story = {
    args: {
        h5: true
    },
    play: async ({args, canvasElement}) => {

    }
}

export const Heading6: Story = {
    args: {
        h6: true
    },
    play: async ({args, canvasElement}) => {

    }
}

export const Paragraph: Story = {
    args: {
        p: true
    },
    play: async ({args, canvasElement}) => {

    }
}

export const Span: Story = {
    args: {
        span: true
    },
    play: async ({args, canvasElement}) => {

    }
}


