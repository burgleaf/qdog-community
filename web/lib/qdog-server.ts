const apiBase = (process.env.NEXT_PUBLIC_QDOG_SERVER_API ?? "https://api.q.dog").replace(/\/$/, "");

export type QDogAccount = {
  id: string;
  email: string | null;
  displayName: string | null;
  avatarUrl: string | null;
};

export type DailyPetEgg = {
  id: string;
  slot: number;
  issuedForDate: string;
  traits: string;
  available: boolean;
  supporters: number;
  supported: boolean;
  claimedByViewer: boolean;
};

export type DailyPetEggCatalog = {
  issuedForDate: string;
  eggs: DailyPetEgg[];
};

export type PetEggAsset = {
  id: string;
  type: "pet_egg";
  traits: string;
  acquiredAt: number;
};

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBase}${path}`, {
    ...init,
    credentials: "include",
  });
  if (!response.ok) {
    let message = "Request failed";
    try {
      const payload: unknown = await response.json();
      if (
        typeof payload === "object" &&
        payload !== null &&
        "error" in payload &&
        typeof payload.error === "string"
      ) {
        message = payload.error;
      }
    } catch {
      // Keep the stable fallback; the API deliberately never exposes internals.
    }
    throw new Error(message);
  }
  return response.json() as Promise<T>;
}

export function googleLoginUrl(returnTo: string) {
  return `${apiBase}/auth/google?return_to=${encodeURIComponent(returnTo)}`;
}

export async function getCurrentAccount(): Promise<QDogAccount | null> {
  const response = await fetch(`${apiBase}/auth/me`, { credentials: "include" });
  if (response.status === 401) return null;
  if (!response.ok) throw new Error("Unable to load account");
  const payload = (await response.json()) as { account?: QDogAccount };
  return payload.account ?? null;
}

export function getDailyPetEggs() {
  return apiRequest<DailyPetEggCatalog>("/pet-eggs/daily");
}

export function claimDailyPetEgg(id: string) {
  return apiRequest<{ asset: PetEggAsset }>(`/pet-eggs/daily/${encodeURIComponent(id)}/claim`, {
    method: "POST",
  });
}

export function setDailyPetEggSupport(id: string, supporting: boolean) {
  return apiRequest<{ codeId: string; supporters: number; supporting: boolean; changed: boolean }>(
    `/pet-eggs/daily/${encodeURIComponent(id)}/support`,
    { method: supporting ? "POST" : "DELETE" },
  );
}

export async function logoutQDogAccount() {
  const response = await fetch(`${apiBase}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (response.status !== 204 && response.status !== 401) {
    throw new Error("Unable to log out");
  }
}
