export async function getMoaboxData() {
  return await fetch("/api/moabox").then(res => res.json());
}
