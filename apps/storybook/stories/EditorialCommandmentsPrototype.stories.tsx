import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";

import { EditorialCommandmentsPrototype } from "./EditorialCommandmentsPrototype";

const meta: Meta<typeof EditorialCommandmentsPrototype> = {
  title: "Explorations / Editorial Reading Pages / Product Commandments",
  component: EditorialCommandmentsPrototype,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `A bilingual manifesto-style essay inside the Personal Press system.

- The title leaf, paper/ink/accent palette, serif display voice, mono apparatus, rules, and folio connect it to the accepted reading pages.
- The essay's form is distinct from a narrative: the real Read it three times control switches between Spine, Argument, and the complete canonical essay.
- English and Chinese are two states of the same page, not separate visual systems.
- Full mode reads the repository's complete published English or Chinese MDX; condensed modes preserve the complete ten-part index and load-bearing passages.`,
      },
    },
    viewport: {
      defaultViewport: "desktop",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EditorialCommandmentsPrototype>;

export const English: Story = {
  args: { initialLanguage: "en" },
};

export const Chinese: Story = {
  args: { initialLanguage: "zh" },
};

export const BilingualInteraction: Story = {
  args: { initialLanguage: "en" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("heading", {
        name: "The Ten Commandments for Building Product",
        level: 1,
      }),
    ).toBeVisible();
    const full = canvas.getByRole("tab", { name: /Full 45 min/ });
    await expect(full).toHaveAttribute("aria-selected", "true");
    await expect(
      canvas.getByRole("heading", {
        name: "You shall have patience; attention is a spark, not the fuel.",
        level: 2,
      }),
    ).toBeVisible();

    const spine = canvas.getByRole("tab", { name: /Spine 5 min/ });
    await userEvent.click(spine);
    await expect(spine).toHaveAttribute("aria-selected", "true");
    await expect(canvas.getByText("The ten", { selector: "h3" })).toBeVisible();

    await userEvent.click(full);
    await expect(full).toHaveAttribute("aria-selected", "true");

    await userEvent.click(canvas.getByRole("button", { name: "中文" }));
    await expect(
      canvas.getByRole("heading", { name: "产品 十诫", level: 1 }),
    ).toBeVisible();
    await expect(canvas.getByRole("button", { name: "中文" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(
      canvas.getByRole("heading", {
        name: "你要有耐心；流量只能带来人，不能留住人。",
        level: 2,
      }),
    ).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "Dark" }));
    await expect(canvas.getByRole("button", { name: "Light" })).toBeVisible();
  },
};
