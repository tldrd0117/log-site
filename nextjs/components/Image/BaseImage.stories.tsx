import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { BaseImage } from './BaseImage';

const meta: Meta<typeof BaseImage> = {
    title: "Image/Base",
    component: BaseImage,
};

export default meta;

type Story = StoryObj<typeof BaseImage>;

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
