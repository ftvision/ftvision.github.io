import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";

import { EditorialTypefaceSystemPrototype } from "./EditorialTypefaceSystemPrototype";

const meta: Meta<typeof EditorialTypefaceSystemPrototype> = {
  title: "Explorations / Editorial Reading Pages",
  component: EditorialTypefaceSystemPrototype,
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "desktop",
    },
  },
};

export default meta;
type Story = StoryObj<typeof EditorialTypefaceSystemPrototype>;

export const VollkornEditorialSystem: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switcher = canvas.getByTestId("supporting-typeface-switcher");
    const newsreader = within(switcher).getByRole("button", {
      name: "Newsreader",
    });
    const sourceSerif = within(switcher).getByRole("button", {
      name: "Source Serif 4",
    });

    await userEvent.click(sourceSerif);
    await expect(sourceSerif).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(newsreader);
    await expect(newsreader).toHaveAttribute("aria-pressed", "true");
    await expect(
      canvas.getByRole("heading", { name: "The field atlas", level: 2 }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("heading", { name: "产品十诫", level: 1 }),
    ).toBeVisible();
  },
};
