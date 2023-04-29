import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { CardBox } from './CardBox';
import { Button } from '../Button/Button';
import { BorderBox } from './BorderBox';


const meta: Meta<typeof CardBox> = {
    title: "Box/Card",
    component: CardBox,
    render: (args) => <BorderBox>
            <CardBox {...args}/>
        </BorderBox>,
    args: {
        children: <Button label='inLayoutButton'/>
    }
};

export default meta;

type Story = StoryObj<typeof CardBox>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        expect(canvas.queryByRole('button')).toBeInTheDocument()
    }
}

export const Hide: Story = {
    args: {
        isHide: true
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        expect(canvas.queryAllByRole('button')).toHaveLength(0)
    }
}
