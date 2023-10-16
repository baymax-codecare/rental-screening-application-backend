const slugChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
const slugCharsLength = slugChars.length;

export function generateSlug({ prefix = '' }: { prefix?: string }) {
  let slug = '';
  const len = Math.round(Math.random() * 6) + 9;

  for (let i = 0; i < len; i++) {
    slug += slugChars.charAt(Math.round(Math.random() * slugCharsLength));
  }

  return `${prefix}${slug}`;
}
