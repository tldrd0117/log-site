import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import PostWrite from './write';
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

const meta: Meta<typeof PostWrite> = {
    title: "Pages/PostWrite",
    component: PostWrite,
    parameters:{
        layout: 'fullscreen'
    },
    render: (args, {loaded}) => {
        return (
            <PostWrite {...args} code={loaded.code} source={loaded.source}/>
        )
    },
    args: {
        categories: ["카테고리1", "카테고리2", "카테고리3"]
    },
    loaders: [
        async () => ({
            ...await getServerSideProps(),
        })
    ]
};

export default meta;

type Story = StoryObj<typeof PostWrite>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {

    }
}

