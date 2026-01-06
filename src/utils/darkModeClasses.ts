// Zentrale Dark Mode Klassen für konsistente Nutzung

export const darkMode = {
  // Hintergrundfarben
  bg: {
    primary: "bg-white dark:bg-gray-900",
    secondary: "bg-gray-50 dark:bg-gray-800",
    tertiary: "bg-gray-100 dark:bg-gray-700",
    card: "bg-white dark:bg-gray-800",
    cardHover: "hover:bg-gray-50 dark:hover:bg-gray-700",
    input: "bg-white dark:bg-gray-700",
    overlay: "bg-white/90 dark:bg-gray-900/90",
  },
  
  // Textfarben
  text: {
    primary: "text-gray-900 dark:text-gray-100",
    secondary: "text-gray-700 dark:text-gray-200",
    tertiary: "text-gray-600 dark:text-gray-300",
    muted: "text-gray-500 dark:text-gray-400",
    placeholder: "text-gray-400 dark:text-gray-500",
  },
  
  // Borders
  border: {
    default: "border-gray-200 dark:border-gray-700",
    light: "border-gray-100 dark:border-gray-800",
    medium: "border-gray-300 dark:border-gray-600",
  },
  
  // Schatten (werden in CSS definiert)
  shadow: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  },
  
  // Kombinationen
  card: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
  cardInteractive: "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700",
  input: "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100",
  badge: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
};
