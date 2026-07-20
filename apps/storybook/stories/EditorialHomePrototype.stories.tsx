import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";

import { EditorialHomePrototype } from "./EditorialHomePrototype";

const meta: Meta<typeof EditorialHomePrototype> = {
  title: "Explorations / Editorial Home",
  component: EditorialHomePrototype,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `A code-first front table built from a publishing grammar rather than a magazine or archive structure.

- The viewport behaves like one page, not a stack of cards.
- An author premise establishes the publication before one display-led essay.
- Three recent essays give Essays a useful preview without explaining the page architecture in prose.
- One reference work and a compact publisher note make Series and About legible without pretending the inventory supports departments or issues.
- Vollkorn owns monumental display, Newsreader carries supporting hierarchy, Source Serif carries prose, and monospace remains editorial apparatus.
- Rules and spacing create sections; containers, shadows, and badges are deliberately absent.
- Imagery is optional. The layout must remain authored and complete without a hero image.
- The same semantic order becomes a single-column mobile edition below the content-fit breakpoint.`,
      },
    },
    viewport: {
      defaultViewport: "desktop",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EditorialHomePrototype>;

export const FinePress: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const themeButton = canvas.getByRole("button", { name: "Dark" });

    await userEvent.click(themeButton);
    await expect(canvas.getByRole("button", { name: "Light" })).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "Light" }));
    await expect(canvas.getByRole("button", { name: "Dark" })).toBeVisible();
    await expect(canvas.queryByText(/selected front table/i)).toBeNull();
    await expect(canvas.queryByText(/same project/i)).toBeNull();
    await expect(
      canvas.getByText(
        "Writings on intelligent systems, product judgment, and the work of building.",
      ),
    ).toBeVisible();
    await expect(
      canvas.getByText(/The views expressed here are my own/),
    ).toBeVisible();
    await expect(
      canvas.getByRole("heading", { name: "100 Vision Papers", level: 2 }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("link", { name: "All series" }),
    ).toBeVisible();
  },
};
