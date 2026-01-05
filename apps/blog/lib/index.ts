/**
 * Library exports for the blog content system
 */

export {
  getEssaySlugs,
  getAllEssays,
  getEssayBySlug,
  getEssaysByType,
  getEssaysByTopic,
  getRecentEssays,
  type GetEssaysOptions,
} from './essays';

export {
  compileMDX,
  getMDXComponents,
  extractHeadings,
  generateHeadingSlug,
  stripFrontmatter,
  type MDXScope,
  type CompiledMDX,
  type CompileMDXOptions,
  type MDXComponents,
  type TocItem,
  type ExtractHeadingsOptions,
} from './mdx';

export {
  type ThemeMode,
  type ThemeName,
  THEME_MODE_KEY,
  THEME_NAME_KEY,
  DEFAULT_THEME_MODE,
  DEFAULT_THEME_NAME,
  getStoredThemeMode,
  getStoredThemeName,
  getSystemPreference,
  setStoredThemeMode,
  setStoredThemeName,
  applyThemeMode,
  applyThemeName,
  getResolvedThemeMode,
  getResolvedThemeName,
  toggleThemeMode,
} from './theme';
