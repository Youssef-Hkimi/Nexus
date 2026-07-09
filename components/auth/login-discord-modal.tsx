"use client";

import { Button, Modal } from "@heroui/react";
import { MessageCircle } from "lucide-react";

import { useAuth } from "@/lib/auth/auth-context";

export function LoginDiscordModal() {
  const { loginModalOpen, setLoginModalOpen, login } = useAuth();

  return (
    <Modal.Backdrop isOpen={loginModalOpen} onOpenChange={setLoginModalOpen}>
      <Modal.Container>
        <Modal.Dialog className="sm:max-w-md">
          <Modal.CloseTrigger />
          <Modal.Header>
            <Modal.Heading>Login with Discord</Modal.Heading>
          </Modal.Header>
          <Modal.Body className="space-y-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-[#5865F2]/15 text-[#5865F2]">
              <MessageCircle className="size-6" aria-hidden />
            </div>
            <p className="text-sm leading-relaxed text-muted">
              Connect your Discord account to create and manage server or bot listings on Nexus.
            </p>
            <p className="text-xs text-muted">
              Demo mode: login is mocked. Real Discord OAuth can replace this later.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button slot="close" variant="secondary">
              Cancel
            </Button>
            <Button
              onPress={() => {
                login();
              }}
            >
              <MessageCircle className="size-4" />
              Continue with Discord
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
