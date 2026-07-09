import type { AuthUser } from "@/lib/types";

/** Mock Discord user used until real OAuth is wired. */
export const MOCK_AUTH_USER: AuthUser = {
  username: "Alex",
  avatarUrl: null,
  discordId: "mock_discord_user_123",
};

export const AUTH_STORAGE_KEY = "nexus_mock_auth_user";
