export function createId(): string {
  const id = "randomUUID" in crypto ? crypto.randomUUID() : undefined;
  return id ?? `${new Date().getTime()}-${randomNumber()}${randomNumber()}${randomNumber()}${randomNumber()}`;
}

function randomNumber(): number {
  return Math.floor(Math.random() * 10);
}
