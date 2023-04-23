import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { BaseCheckBox } from './BaseCheckBox';
import { BorderBox } from '../Box/BorderBox';

const meta: Meta<typeof BaseCheckBox> = {
    title: "CheckBox/Base",
    component: BaseCheckBox,
    render: (args) => <BorderBox>
        <BaseCheckBox {...args}/>
    </BorderBox>,
    args: {
        children: "BaseCheckBox"
    }
};

export default meta;

type Story = StoryObj<typeof BaseCheckBox>;

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
