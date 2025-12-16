/**
 * Mock for next/navigation hooks in Storybook
 */

export const usePathname = () => '/';
export const useRouter = () => ({
  push: () => {},
  replace: () => {},
  back: () => {},
  forward: () => {},
  refresh: () => {},
  prefetch: () => {},
});
export const useSearchParams = () => new URLSearchParams();
export const useParams = () => ({});
export const notFound = () => {};
export const redirect = () => {};
