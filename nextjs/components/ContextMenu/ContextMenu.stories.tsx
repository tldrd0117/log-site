import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { ContextMenu } from './ContextMenu';
import { List } from '../List/List';
import { ListItem } from '../ListItem/ListItem';
import { BorderBox } from '../Box/BorderBox';
import { FlexList } from '../List/FlexList';
import { CardBox } from '../Box/CardBox';


const meta: Meta<typeof ContextMenu> = {
    title: "ContextMenu/ContextMenu",
    component: ContextMenu,
    args: {
        tagtype: CardBox,
        className: "w-40",
        firstListItemProps: {
            className: "rounded-t-lg",
        },
        lastListItemProps: {
            className: "rounded-b-lg",
        },
        listItemProps: {
        },
        listItemsData: [
            {
                id: "1",
                value: "Item 1"
            },
            {
                id: "2",
                value: "Item 2"
            },
            {
                id: "3",
                value: "Item 3"
            },
        ]
    }
};

export default meta;

type Story = StoryObj<typeof ContextMenu>;

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
