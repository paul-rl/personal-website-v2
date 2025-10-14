// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function hasTags(obj: any): obj is { tags: string[] } {
  return Array.isArray(obj.tags);
}