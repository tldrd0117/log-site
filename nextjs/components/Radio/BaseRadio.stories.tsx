import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { BaseRadio } from './BaseRadio';
import { BorderBox } from '../Box/BorderBox';

const meta: Meta<typeof BaseRadio> = {
    title: "Radio/Base",
    component: BaseRadio,
    render: (args) => <BorderBox>
        <BaseRadio {...args}/>
    </BorderBox>,
    args: {
        children: "BaseRadio"
    }
};

export default meta;

type Story = StoryObj<typeof BaseRadio>;

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
