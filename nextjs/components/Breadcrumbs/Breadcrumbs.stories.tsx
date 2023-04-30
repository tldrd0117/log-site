import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { Breadcrumbs } from './Breadcrumbs';
import { BorderBox } from '../Box/BorderBox';

const meta: Meta<typeof Breadcrumbs> = {
    title: "Breadcrumbs/Breadcrumbs",
    component: Breadcrumbs,
    render: (args) => <BorderBox>
            <Breadcrumbs {...args}/>
        </BorderBox>,
    args:{
        items: [
            {label: "label1", href: "#"},
            {label: "label2", href: "#"},
            {label: "label3", href: "#"},
        ]
    }
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
    }
}
