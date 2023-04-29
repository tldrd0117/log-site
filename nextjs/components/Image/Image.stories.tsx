import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { Image } from './Image';
import { BorderBox } from '../Box/BorderBox';

const meta: Meta<typeof Image> = {
    title: "Image/Image",
    component: Image,
    render: (args) => <BorderBox>
            <Image {...args} />
        </BorderBox>,
    args: {
        className: 'h-20',
        src: '/images/profile.jpg',
        alt: "profile",
    }
};

export default meta;

type Story = StoryObj<typeof Image>;

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
