import type {
  CreateCheckDto,
  CreatedAccount,
  UpdateCheckDto,
} from "../types/types";

const baseUrl = "http://localhost:3000";

export async function create(data: CreateCheckDto): Promise<CreatedAccount> {
  const res = await fetch(`${baseUrl}/accounts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res) {
    throw new Error("cannot create data");
  }

  return res.json();
}

export async function getAll() {
  const res = await fetch(`${baseUrl}/accounts`);

  if (!res) {
    throw new Error("cannot get all data");
  }

  return res.json();
}

export async function getOne(id: string) {
  const res = await fetch(`${baseUrl}/accounts/${id}`);

  if (!res) {
    throw new Error("cannot get one");
  }

  return res.json();
}

export async function update(id: string, data: UpdateCheckDto) {
  const res = await fetch(`${baseUrl}/accounts/${id}`, {
    method: "PATСH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res) {
    throw new Error("failed to update");
  }

  return res.json();
}

export async function deleteItem(id: string) {
  const res = await fetch(`${baseUrl}/accounts/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!res) {
    throw new Error("cannot delete this one");
  }

  return res.json();
}

export async function calculateItem(id: string) {
  const res = await fetch(`${baseUrl}/accounts/${id}/calc`);

  if (!res) {
    throw new Error("something got wrong");
  }

  return res.json();
}
