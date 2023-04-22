import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { BaseIconButton } from './BaseIconButton';


const meta: Meta<typeof BaseIconButton> = {
    title: "IconButton/Base",
    component: BaseIconButton,
    args: {
    }
};

export default meta;

type Story = StoryObj<typeof BaseIconButton>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {

    }
}

export const Disabled: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {
    }
}
