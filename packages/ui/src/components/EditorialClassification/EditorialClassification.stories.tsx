import type { Meta, StoryObj } from "@storybook/react";

import { EditorialClassification } from "./EditorialClassification";

const meta: Meta<typeof EditorialClassification> = {
  title: "Editorial/Editorial Classification",
  component: EditorialClassification,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="bg-ground-primary p-10">
      <EditorialClassification primary="Essay" secondary="Career" />
      <h1 className="font-heading text-6xl leading-none text-figure-primary">
        Stop Being Your Own Rejection Letter
      </h1>
    </div>
  ),
};

export const SameRoleAcrossPublicationForms: Story = {
  name: "Same Role Across Publication Forms",
  render: () => (
    <div className="grid gap-16 bg-ground-primary p-10">
      {[
        ["Reference work", "Vision science", "100 Vision Papers"],
        ["Essay", "Product · Bilingual", "The Ten Commandments"],
        ["Essay archive", "Published 2026", "Essays"],
      ].map(([primary, secondary, title]) => (
        <section className="border-b border-border pb-12" key={primary}>
          <EditorialClassification primary={primary} secondary={secondary} />
          <h2 className="font-heading text-6xl leading-none text-figure-primary">
            {title}
          </h2>
        </section>
      ))}
    </div>
  ),
};
