import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { BaseCard } from './BaseCard';
import { Button } from '../Button/Button';
import { BorderBox } from '../Box/BorderBox';
import { CardBox } from '../Box/CardBox';


const meta: Meta<typeof BaseCard> = {
    title: "Card/Base",
    component: BaseCard,
    args: {
        children: <Button label='inLayoutButton'/>
    }
};

export default meta;

type Story = StoryObj<typeof BaseCard>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        expect(canvas.queryByRole('button')).toBeInTheDocument()
    }
}

export const Border: Story = {
    args: {
        boxType: BorderBox
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        expect(canvas.queryByRole('button')).toBeInTheDocument()
    }
}

