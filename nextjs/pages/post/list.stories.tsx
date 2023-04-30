import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { PostList } from './list';


const meta: Meta<typeof PostList> = {
    title: "Pages/PostList",
    component: PostList,
    args: {
    }
};

export default meta;

type Story = StoryObj<typeof PostList>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {

    }
}

