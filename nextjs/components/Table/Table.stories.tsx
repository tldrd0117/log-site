import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CardBox } from '../Box/CardBox';
import { Table } from '../../app/user/setting/SettingTable';


const meta: Meta<typeof Table> = {
    title: "Table/Table",
    component: Table,
    args: {
    }
};

export default meta;

type Story = StoryObj<typeof Table>;

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
