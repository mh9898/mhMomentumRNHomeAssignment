/**
 * Hook to get theme colors based on the current color scheme (light/dark mode)
 *
 * @example
 * ```tsx
 * const colors = useThemeColors();
 * <View style={{ backgroundColor: colors.background }}>
 *   <Text style={{ color: colors.text }}>Hello</Text>
 * </View>
 * ```
 */
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export function useThemeColors() {
  const colorScheme = useColorScheme() ?? "light";
  return Colors[colorScheme];
}
