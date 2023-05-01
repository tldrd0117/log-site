import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import Post from './[id]';
import mdx from './example.mdx'

const getProps = async () => {
    return String(await compile(mdx, {
        outputFormat: 'function-body',
        development: false,
    }))
}

const meta: Meta<typeof Post> = {
    title: "Pages/Post",
    component: Post,
    parameters:{
        layout: 'fullscreen'
    },
    loaders: [
        async () => ({
            code: await getProps()
        })
    ]
};

export default meta;

type Story = StoryObj<typeof Post>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {

    }
}

function compile(mdx: (props: import("mdx/types").MDXProps) => JSX.Element, arg1: { outputFormat: string; development: boolean; }): any {
    throw new Error('Function not implemented.');
}

