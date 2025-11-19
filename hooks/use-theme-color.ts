/**
 * Hook to get a specific theme color, optionally overridden by props
 *
 * @example
 * ```tsx
 * const textColor = useThemeColor({}, 'text');
 * const customColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');
 * ```
 */
import { Colors } from "@/constants/theme";
import { useColorScheme } from "./use-color-scheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
