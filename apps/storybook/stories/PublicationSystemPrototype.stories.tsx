import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";

import { PublicationSystemPrototype } from "./PublicationSystemPrototype";
import { ModernistTypographyLab } from "./ModernistTypographyLab";

const meta: Meta<typeof PublicationSystemPrototype> = {
  title: "Explorations / Publication Systems",
  component: PublicationSystemPrototype,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `A renderer-level comparison over the same real publication material.

- Fine Press and Modernist own independent DOM structure, grid, typography, apparatus, responsive editions, and interaction presentation.
- The shared contract stops at authored content, semantic work identity, URLs, accessibility, and behavioral capabilities.
- Work kind supplies an ordinary fallback; presentation identity preserves the concrete shape of Product Commandments and 100 Vision Papers; slug remains the final escape hatch.
- Modernist exposes a Storybook-only typography-system study. Every candidate assigns display, supporting, body, apparatus, UI, and CJK roles; the collapsed Arial Narrow pass remains only as rejected evidence.
- The lab switcher is Storybook apparatus, not a proposed reader-facing runtime theme control.`,
      },
    },
    viewport: { defaultViewport: "desktop" },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PublicationSystemPrototype>;

export const SystemLab: Story = {
  args: {
    initialSystem: "fine-press",
    initialWork: "landing",
    showLabControls: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("heading", { level: 1 })).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "Modernist" }));
    await expect(
      canvas.getByText("Independent / California / 2026"),
    ).toBeVisible();

    const typography = canvas.getByRole("combobox", {
      name: "Modernist typography system",
    });
    await expect(typography).toHaveValue("editorial-contrast");
    await userEvent.selectOptions(typography, "international-grid");
    await expect(
      canvasElement.querySelector(".publication-system"),
    ).toHaveAttribute("data-modernist-typography", "international-grid");
    await userEvent.selectOptions(typography, "editorial-contrast");

    await userEvent.selectOptions(
      canvas.getByRole("combobox", { name: "Work" }),
      "product-commandments",
    );
    await expect(
      canvas.getByRole("heading", {
        name: "Commandments for Building Product",
        level: 1,
      }),
    ).toBeVisible();

    const spine = canvas.getByRole("tab", { name: "Spine / 5 min" });
    await userEvent.click(spine);
    await expect(spine).toHaveAttribute("aria-selected", "true");

    await userEvent.click(canvas.getByRole("button", { name: "中文" }));
    await expect(
      canvas.getByRole("heading", { name: "产品十诫", level: 1 }),
    ).toBeVisible();

    await userEvent.selectOptions(
      canvas.getByRole("combobox", { name: "Work" }),
      "vision-100",
    );
    await userEvent.click(canvas.getByRole("tab", { name: "Index" }));
    const search = canvas.getByPlaceholderText("Author, title, or journal");
    await userEvent.type(search, "Hubel");
    await expect(canvas.getByText("9 papers")).toBeVisible();
    await expect(canvas.getAllByText(/Hubel, D\. H\./).length).toBeGreaterThan(
      0,
    );

    await userEvent.click(canvas.getByRole("button", { name: "Fine Press" }));
    await userEvent.selectOptions(
      canvas.getByRole("combobox", { name: "Work" }),
      "rejection-letter",
    );
    await expect(canvas.getByRole("heading", { level: 1 })).toBeVisible();
  },
};

export const ModernistTypefaceStudy: Story = {
  name: "Modernist Typography Systems",
  render: () => <ModernistTypographyLab />,
  parameters: {
    viewport: { defaultViewport: "desktop" },
  },
};

export const FinePressLanding: Story = {
  args: {
    initialSystem: "fine-press",
    initialWork: "landing",
    showLabControls: false,
  },
};

export const ModernistLanding: Story = {
  args: {
    initialSystem: "modernist",
    initialWork: "landing",
    showLabControls: false,
  },
};

export const FinePressRejectionLetter: Story = {
  args: {
    initialSystem: "fine-press",
    initialWork: "rejection-letter",
    showLabControls: false,
  },
};

export const ModernistRejectionLetter: Story = {
  args: {
    initialSystem: "modernist",
    initialWork: "rejection-letter",
    showLabControls: false,
  },
};

export const FinePressProductCommandments: Story = {
  args: {
    initialSystem: "fine-press",
    initialWork: "product-commandments",
    showLabControls: false,
  },
};

export const ModernistProductCommandments: Story = {
  args: {
    initialSystem: "modernist",
    initialWork: "product-commandments",
    showLabControls: false,
  },
};

export const FinePressVision100: Story = {
  args: {
    initialSystem: "fine-press",
    initialWork: "vision-100",
    showLabControls: false,
  },
};

export const ModernistVision100: Story = {
  args: {
    initialSystem: "modernist",
    initialWork: "vision-100",
    showLabControls: false,
  },
};
