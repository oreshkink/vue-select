const API_URL = "https://habr.com/kek/v2/publication/suggest-mention";

type User = {
  type: "user";
  name: string;
  alias: string | null;
  avatar: string | null;
};

type Company = {
  type: "company";
  name: string;
  alias: string | null;
  avatar: string | null;
};

type Entity = User | Company;

export async function getVariants(query: string) {
  const response = await fetch(`${API_URL}?q=${query}`);

  const payload = (await response.json()) as {
    data: Entity[];
  };

  return payload.data;
}
