import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { Post } from './[id]';


const meta: Meta<typeof Post> = {
    title: "Pages/Post",
    component: Post,
    args: {
    }
};

export default meta;

type Story = StoryObj<typeof Post>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {

    }
}

