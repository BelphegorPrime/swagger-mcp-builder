export function isValidOpenAPIVersion(version: string): boolean {
  // Accepts 3.0.0 or higher
  const match = /^([3-9]\d*)\.(\d+)\.(\d+)$/.exec(version);
  return !!match;
}
