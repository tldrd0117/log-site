import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { Radio } from './Radio';
import { BorderBox } from '../Box/BorderBox';

const meta: Meta<typeof Radio> = {
    title: "Radio/Radio",
    component: Radio,
    render: (args) => <BorderBox>
        <Radio {...args}/>
    </BorderBox>,
    args: {
        children: "Radio"
    }
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {

    }
}

export const Disabled: Story = {
    args: {
        disabled: true
    },
    play: async ({args, canvasElement}) => {
    }
}
