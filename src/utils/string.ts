export function replaceWithAsterisks(str: string) {
  return str.replace(/./g, "*");
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function extractTitleFromText(str: string): string {
  return str.slice(0, 16);
}
