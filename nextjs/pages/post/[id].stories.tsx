import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import Post from './[id]';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import source from '!raw-loader!./example.mdx'


async function getServerSideProps() {
    const code = await serialize(source.toString(), {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [],
            development: process.env.NODE_ENV === 'development',
        },
        parseFrontmatter: true
    })
    return {code, source: source.toString()}
}

const meta: Meta<typeof Post> = {
    title: "Pages/Post",
    component: Post,
    parameters:{
        layout: 'fullscreen'
    },
    render: (args, {loaded}) => {
        return (
            <Post code={loaded.code} source={loaded.source}/>
        )
    },
    loaders: [
        async () => ({
            ...await getServerSideProps(),
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

