import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { BaseToggle } from './BaseToggle';
import { BorderBox } from '../Box/BorderBox';

const meta: Meta<typeof BaseToggle> = {
    title: "Toggle/Base",
    component: BaseToggle,
    render: (args) => <BorderBox>
        <BaseToggle {...args}/>
    </BorderBox>,
    args: {
        children: "BaseToggle"
    }
};

export default meta;

type Story = StoryObj<typeof BaseToggle>;

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
