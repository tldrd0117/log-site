import type { StorybookConfig } from "@storybook/nextjs";
const config: StorybookConfig = {
    stories: ["../components/*.stories.@(js|jsx|ts|tsx)", "../components/**/*.stories.@(js|jsx|ts|tsx)",
        "../containers/*.stories.@(js|jsx|ts|tsx)", "../containers/**/*.stories.@(js|jsx|ts|tsx)",
        "../pages/*.stories.@(js|jsx|ts|tsx)", "../pages/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    staticDirs: ['../public'],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        {
            name: '@storybook/addon-styling',
            options: {
                // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
                // For more details on this addon's options.
                postCss: true,
            },
        },
    ],
    framework: {
        name: "@storybook/nextjs",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
};
export default config;
