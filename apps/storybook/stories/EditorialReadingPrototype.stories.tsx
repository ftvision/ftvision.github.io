import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";

import { EditorialReadingPrototype } from "./EditorialReadingPrototype";

const meta: Meta<typeof EditorialReadingPrototype> = {
  title: "Explorations / Editorial Reading Pages",
  component: EditorialReadingPrototype,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `Two reading surfaces extending the Personal Press system.

- Vision 100 behaves like an explorable reference work: its title page leads into the real subway map/table UI, a reading guide, the catalogue, and the source method and limits.
- A single essay behaves like a separately bound long-form text: title leaf, narrow reading measure, numbered sections, documentary figure, notes, and a next-work folio.
- The pages share the established masthead, paper/ink/accent palette, display serif, mono editorial apparatus, and ruled container system.
- Vision 100 uses the repository's complete 100-paper dataset. The essay uses the published Rejection Letter copy and its real documentary image.`,
      },
    },
    viewport: {
      defaultViewport: "desktop",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EditorialReadingPrototype>;

export const Vision100ReferenceWork: Story = {
  args: { initialPage: "vision100" },
};

export const Vision100TypefaceComparison: Story = {
  args: {
    initialPage: "vision100",
    initialTypeface: "brygada",
    showTypefaceLab: true,
  },
};

export const RejectionLetterEssay: Story = {
  args: { initialPage: "essay" },
};

export const ReadingInteraction: Story = {
  args: { initialPage: "vision100" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("heading", { name: "100 Vision Papers", level: 1 }),
    ).toBeVisible();

    const table = canvas.getByRole("button", { name: "Table" });
    await userEvent.click(table);
    await expect(table).toHaveAttribute("aria-pressed", "true");
    await expect(
      canvas.getByPlaceholderText(
        "Search by title, subtitle, or description...",
      ),
    ).toBeVisible();

    const method = canvas.getByRole("tab", { name: "Method & limits" });
    await userEvent.click(method);
    await expect(method).toHaveAttribute("aria-selected", "true");
    await expect(
      canvas.getByRole("heading", {
        name: "What the map cannot claim",
        level: 3,
      }),
    ).toBeVisible();

    const catalogue = canvas.getByRole("tab", { name: "Catalogue" });
    await userEvent.click(catalogue);
    await expect(catalogue).toHaveAttribute("aria-selected", "true");

    const attention = canvas.getByRole("button", { name: "Attention 24" });
    await userEvent.click(attention);
    await expect(attention).toHaveAttribute("aria-pressed", "true");
    await expect(canvas.getByText("24 papers")).toBeVisible();

    const chronology = canvas.getByRole("button", { name: "Chronology" });
    await userEvent.click(chronology);
    await expect(chronology).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(
      canvas.getByRole("button", { name: "Show all 24 papers" }),
    );
    await expect(
      canvas.queryByRole("button", { name: "Show all 24 papers" }),
    ).not.toBeInTheDocument();

    await userEvent.click(canvas.getByRole("link", { name: "Essays" }));
    await expect(
      canvas.getByRole("heading", {
        name: "Stop Being Your Own Rejection Letter",
        level: 1,
      }),
    ).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "Dark" }));
    await expect(canvas.getByRole("button", { name: "Light" })).toBeVisible();
  },
};
