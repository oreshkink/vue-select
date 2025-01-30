export type User = {
  type: "user";
  name: string | null;
  alias: string | null;
  avatar: string | null;
};

export type Company = {
  type: "company";
  name: string;
  alias: string | null;
  avatar: string | null;
};

export function isUser(entity: User | Company): entity is User {
  return entity.type === "user";
}
