import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalClose,
} from './Modal';
import { Button } from '../Button';
import { Input } from '../Input';

const meta: Meta<typeof Modal> = {
  title: 'Patterns/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <Modal open={open} onOpenChange={setOpen}>
        <ModalTrigger asChild>
          <Button>Open Modal</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalClose />
          <ModalHeader>
            <ModalTitle>Modal Title</ModalTitle>
            <ModalDescription>
              This is a description of the modal content.
            </ModalDescription>
          </ModalHeader>
          <ModalBody>
            <p className="text-body text-figure-primary">
              This is the main content area of the modal. You can place any content here.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [size, setSize] = React.useState<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex flex-wrap gap-2">
        {(['sm', 'md', 'lg', 'xl', 'full'] as const).map((s) => (
          <Button
            key={s}
            variant="secondary"
            onClick={() => {
              setSize(s);
              setOpen(true);
            }}
          >
            {s.toUpperCase()}
          </Button>
        ))}
        <Modal open={open} onOpenChange={setOpen}>
          <ModalContent size={size}>
            <ModalClose />
            <ModalHeader>
              <ModalTitle>Size: {size.toUpperCase()}</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <p className="text-body text-figure-primary">
                This modal is using the {size} size variant.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  },
};

export const WithForm: Story = {
  name: 'With Form',
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <Modal open={open} onOpenChange={setOpen}>
        <ModalTrigger asChild>
          <Button>Subscribe</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalClose />
          <ModalHeader>
            <ModalTitle>Subscribe to Newsletter</ModalTitle>
            <ModalDescription>
              Get the latest news delivered to your inbox.
            </ModalDescription>
          </ModalHeader>
          <ModalBody>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-body-sm font-medium text-figure-primary mb-1">
                  Name
                </label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-body-sm font-medium text-figure-primary mb-1">
                  Email
                </label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>
              Subscribe
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  },
};

export const ConfirmDialog: Story = {
  name: 'Confirm Dialog',
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <Modal open={open} onOpenChange={setOpen}>
        <ModalTrigger asChild>
          <Button variant="secondary">Delete Article</Button>
        </ModalTrigger>
        <ModalContent size="sm">
          <ModalHeader>
            <ModalTitle>Delete Article?</ModalTitle>
            <ModalDescription>
              This action cannot be undone. This will permanently delete the article and remove it from our servers.
            </ModalDescription>
          </ModalHeader>
          <ModalFooter className="pt-6">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-status-danger hover:bg-red-700 text-white"
              onClick={() => setOpen(false)}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  },
};

export const LongContent: Story = {
  name: 'Long Content',
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <Modal open={open} onOpenChange={setOpen}>
        <ModalTrigger asChild>
          <Button>Terms & Conditions</Button>
        </ModalTrigger>
        <ModalContent size="lg">
          <ModalClose />
          <ModalHeader>
            <ModalTitle>Terms and Conditions</ModalTitle>
          </ModalHeader>
          <ModalBody className="max-h-[60vh] overflow-y-auto">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="mb-4">
                <h3 className="text-h4 font-semibold text-figure-primary mb-2">
                  Section {i + 1}
                </h3>
                <p className="text-body text-figure-secondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Decline
            </Button>
            <Button onClick={() => setOpen(false)}>
              Accept
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  },
};

export const MediaModal: Story = {
  name: 'Media Modal',
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <Modal open={open} onOpenChange={setOpen}>
        <ModalTrigger asChild>
          <button className="group relative overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
              alt="Mountain landscape"
              className="w-48 h-32 object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-overlay-dark flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-body-sm">View Full</span>
            </div>
          </button>
        </ModalTrigger>
        <ModalContent size="xl" className="p-0 overflow-hidden">
          <ModalClose className="text-white z-10" />
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop"
            alt="Mountain landscape"
            className="w-full h-auto"
          />
          <div className="p-4 bg-ground-primary">
            <p className="text-caption text-figure-secondary">
              Photo by Samuel Ferrara on Unsplash
            </p>
          </div>
        </ModalContent>
      </Modal>
    );
  },
};

export const Accessibility: Story = {
  name: 'Accessibility Features',
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="space-y-4">
        <p className="text-body-sm text-figure-muted max-w-md">
          The modal includes proper accessibility features:
          <br />• Focus trap - Tab cycles through focusable elements
          <br />• Escape key closes the modal
          <br />• Click outside to close
          <br />• aria-modal and role="dialog" attributes
          <br />• Body scroll lock when open
        </p>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalTrigger asChild>
            <Button>Open Accessible Modal</Button>
          </ModalTrigger>
          <ModalContent>
            <ModalClose />
            <ModalHeader>
              <ModalTitle>Accessibility Demo</ModalTitle>
              <ModalDescription>
                Try tabbing through elements or pressing Escape.
              </ModalDescription>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Input placeholder="First focusable element" />
                <Input placeholder="Second focusable element" />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  },
};
