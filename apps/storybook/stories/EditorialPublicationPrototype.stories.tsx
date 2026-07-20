import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";

import { EditorialPublicationPrototype } from "./EditorialPublicationPrototype";

const meta: Meta<typeof EditorialPublicationPrototype> = {
  title: "Explorations / Editorial Publication Pages",
  component: EditorialPublicationPrototype,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `Three related page grammars inside the Personal Press system.

- Essays behaves like a chronological publisher catalogue: dense, complete, and image-independent.
- Series behaves like a prospectus: each collection receives more space, scope, extent, and publication context.
- About behaves like a complete biographical record: author premise, practice, training, research, teaching, and a parallel record of failure.
- All three share one masthead, paper/ink/accent palette, a monumental display role, a supporting editorial face, mono apparatus, rules, and folio treatment.
- No category navigation, cards, pills, background animation, or invented issue structure is introduced.`,
      },
    },
    viewport: {
      defaultViewport: "desktop",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EditorialPublicationPrototype>;

export const EssaysCatalogue: Story = {
  args: {
    initialPage: "essays",
    typefacePairing: "vollkorn-newsreader",
  },
};

export const ConnectedNavigation: Story = {
  args: {
    initialPage: "essays",
    typefacePairing: "vollkorn-newsreader",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("heading", { name: "Essays", level: 1 }),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole("link", { name: "Series" }));
    await expect(
      canvas.getByRole("heading", { name: "Series", level: 1 }),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole("link", { name: "About" }));
    await expect(
      canvas.getByRole("heading", { name: "About", level: 1 }),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Dark" }));
    await expect(canvas.getByRole("button", { name: "Light" })).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Light" }));
    await userEvent.click(canvas.getByRole("link", { name: "Essays" }));
    await expect(
      canvas.getByRole("heading", { name: "Essays", level: 1 }),
    ).toBeVisible();
  },
};

export const SeriesProspectus: Story = {
  args: {
    initialPage: "series",
    typefacePairing: "vollkorn-newsreader",
  },
};

export const AboutColophon: Story = {
  args: { initialPage: "about" },
};

export const AboutVollkornPairing: Story = {
  args: {
    initialPage: "about",
    typefacePairing: "vollkorn-newsreader",
  },
};

export const AboutAccordionInteractions: Story = {
  args: {
    initialPage: "about",
    typefacePairing: "vollkorn-newsreader",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const experienceControl = canvas.getByRole("heading", {
      name: "Founding Engineer",
    });
    const experienceDetails = experienceControl.closest("details");
    const publications = canvas.getByText("Publications");
    const publicationsDetails = publications.closest("details");

    await expect(
      canvas.getByRole("heading", { name: "Academic background" }),
    ).toBeVisible();
    await expect(canvas.getByText("Teaching")).toBeVisible();
    await expect(canvas.queryByText(/\b(?:notes|entries)\b/i)).toBeNull();
    await expect(experienceDetails).not.toHaveAttribute("open");
    await expect(publicationsDetails).not.toHaveAttribute("open");

    await userEvent.click(experienceControl);
    await expect(experienceDetails).toHaveAttribute("open");

    await userEvent.click(publications);
    await expect(publicationsDetails).toHaveAttribute("open");
  },
};
