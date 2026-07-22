import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ArtifactLineageExplorer } from "./ArtifactLineageExplorer";
import { CapabilityGates } from "./CapabilityGates";
import { ClaudeScienceArchitecture } from "./ClaudeScienceArchitecture";
import { ClaudeScienceShipment } from "./ClaudeScienceShipment";
import { HostCallProtocol } from "./HostCallProtocol";
import { VerifierTimeline } from "./VerifierTimeline";

function StorySurface({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-ground-primary px-4 py-8 text-figure-primary sm:px-8">
      <div className="mx-auto max-w-6xl">{children}</div>
    </main>
  );
}

const meta: Meta = {
  title: "Blog / Content / Claude Science",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj;

export const Shipment: Story = {
  render: () => (
    <StorySurface>
      <ClaudeScienceShipment />
    </StorySurface>
  ),
};

export const Architecture: Story = {
  render: () => (
    <StorySurface>
      <ClaudeScienceArchitecture />
    </StorySurface>
  ),
};

export const Verification: Story = {
  render: () => (
    <StorySurface>
      <VerifierTimeline />
    </StorySurface>
  ),
};

export const ArtifactLineage: Story = {
  render: () => (
    <StorySurface>
      <ArtifactLineageExplorer />
    </StorySurface>
  ),
};

export const CapabilityGatesStory: Story = {
  name: "Capability Gates",
  render: () => (
    <StorySurface>
      <CapabilityGates />
    </StorySurface>
  ),
};

export const HostCallProtocolStory: Story = {
  name: "Host Call Protocol",
  render: () => (
    <StorySurface>
      <HostCallProtocol />
    </StorySurface>
  ),
};

export const AllFigures: Story = {
  render: () => (
    <StorySurface>
      <ClaudeScienceShipment />
      <ClaudeScienceArchitecture />
      <VerifierTimeline />
      <ArtifactLineageExplorer />
    </StorySurface>
  ),
};
