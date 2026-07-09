"use client";

import { Button, Modal } from "@heroui/react";
import { Bot, Server } from "lucide-react";

import type { ListingType } from "@/lib/types";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  value: ListingType | null;
  onChange: (type: ListingType) => void;
  onContinue: () => void;
  onCancel?: () => void;
};

export function ListingTypeModal({
  isOpen,
  onOpenChange,
  value,
  onChange,
  onContinue,
  onCancel,
}: Props) {
  return (
    <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Container size="lg">
        <Modal.Dialog className="sm:max-w-xl">
          <Modal.CloseTrigger />
          <Modal.Header>
            <Modal.Heading>What would you like to list?</Modal.Heading>
          </Modal.Header>
          <Modal.Body className="space-y-3">
            <p className="text-sm text-muted">
              Choose a listing type to continue. You can switch later from the create form.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => onChange("server")}
                className={`rounded-2xl border p-4 text-left transition-colors duration-200 ${
                  value === "server"
                    ? "border-accent bg-accent/10 shadow-sm"
                    : "border-border bg-default/40 hover:border-accent/40 hover:bg-default/70"
                }`}
              >
                <span className="mb-3 flex size-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Server className="size-5" aria-hidden />
                </span>
                <p className="font-semibold text-foreground">Discord Server</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  List a community, gaming server, study group, creator hub, or public Discord
                  community.
                </p>
              </button>

              <button
                type="button"
                onClick={() => onChange("bot")}
                className={`rounded-2xl border p-4 text-left transition-colors duration-200 ${
                  value === "bot"
                    ? "border-accent bg-accent/10 shadow-sm"
                    : "border-border bg-default/40 hover:border-accent/40 hover:bg-default/70"
                }`}
              >
                <span className="mb-3 flex size-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Bot className="size-5" aria-hidden />
                </span>
                <p className="font-semibold text-foreground">Discord Bot</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  List a moderation, music, utility, AI, economy, or community bot.
                </p>
              </button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onPress={() => {
                onCancel?.();
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button isDisabled={!value} onPress={onContinue}>
              Continue
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
