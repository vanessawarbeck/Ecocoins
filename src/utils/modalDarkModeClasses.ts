/**
 * Utility functions for consistent Dark Mode styling across all modals
 */

export const getModalClasses = (isDarkMode: boolean) => ({
  // Modal Container
  backdrop: "fixed inset-0 bg-black/50 z-50",
  
  container: isDarkMode 
    ? "bg-gray-900 text-white" 
    : "bg-white text-gray-900",
  
  containerRounded: isDarkMode
    ? "bg-gray-900 text-white rounded-t-3xl"
    : "bg-white text-gray-900 rounded-t-3xl",
  
  // Close Button
  closeButton: isDarkMode
    ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
    : "bg-white hover:bg-gray-100 text-gray-600",
  
  closeButtonRounded: isDarkMode
    ? "bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-full"
    : "bg-white hover:bg-gray-100 text-gray-600 rounded-full",
  
  headerCloseButton: "bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full",
  
  // Cards
  card: isDarkMode
    ? "bg-gray-800 border-gray-700 text-white"
    : "bg-white border-gray-200 text-gray-900",
  
  cardSecondary: isDarkMode
    ? "bg-gray-700/50 border-gray-600"
    : "bg-gray-50 border-gray-200",
  
  // Text Colors
  textPrimary: isDarkMode ? "text-white" : "text-gray-900",
  textSecondary: isDarkMode ? "text-gray-300" : "text-gray-600",
  textMuted: isDarkMode ? "text-gray-400" : "text-gray-500",
  
  // Headings
  heading: isDarkMode ? "text-white" : "text-gray-900",
  subheading: isDarkMode ? "text-gray-300" : "text-gray-600",
  
  // Input Fields
  input: isDarkMode
    ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
    : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400",
  
  // Dividers
  divider: isDarkMode ? "border-gray-700" : "border-gray-200",
  
  // Special Backgrounds
  gradientEmergingLight: isDarkMode
    ? "bg-gradient-to-br from-emerald-900/90 to-green-900/90"
    : "bg-gradient-to-br from-emerald-50 to-green-100",
  
  gradientAmberLight: isDarkMode
    ? "bg-gradient-to-br from-amber-900/90 to-yellow-900/90"
    : "bg-gradient-to-br from-amber-50 to-yellow-100",
  
  gradientPurpleLight: isDarkMode
    ? "bg-gradient-to-br from-purple-900/90 to-indigo-900/90"
    : "bg-gradient-to-br from-purple-50 to-indigo-100",
  
  gradientBlueLight: isDarkMode
    ? "bg-gradient-to-br from-blue-900/90 to-cyan-900/90"
    : "bg-gradient-to-br from-blue-50 to-cyan-100",
  
  // Accent Colors (preserve across dark/light mode)
  emeraldAccent: isDarkMode ? "text-emerald-400" : "text-emerald-600",
  amberAccent: isDarkMode ? "text-amber-400" : "text-amber-600",
  purpleAccent: isDarkMode ? "text-purple-400" : "text-purple-600",
  blueAccent: isDarkMode ? "text-blue-400" : "text-blue-600",
  redAccent: isDarkMode ? "text-red-400" : "text-red-600",
  
  // Stats/Info Cards
  statsCard: isDarkMode
    ? "bg-gray-700 border-gray-600 p-3 rounded-lg"
    : "bg-white border-gray-200 p-3 rounded-lg",
  
  statsCardAlt: isDarkMode
    ? "bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
    : "bg-white/10 backdrop-blur-sm rounded-xl border border-white/20",
  
  // List Items
  listItem: isDarkMode
    ? "bg-gray-800 hover:bg-gray-700 border-gray-700"
    : "bg-white hover:bg-gray-50 border-gray-200",
  
  // Interactive Elements
  hover: isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50",
  active: isDarkMode ? "active:bg-gray-700" : "active:bg-gray-100",
});

/**
 * Get gradient header classes for modals
 */
export const getGradientHeaderClasses = (color: "emerald" | "blue" | "purple" | "amber" | "red") => {
  const gradients = {
    emerald: "bg-gradient-to-r from-emerald-500 to-green-600",
    blue: "bg-gradient-to-r from-blue-600 to-cyan-600",
    purple: "bg-gradient-to-r from-purple-500 to-purple-600",
    amber: "bg-gradient-to-r from-amber-500 to-yellow-500",
    red: "bg-gradient-to-r from-red-500 to-pink-500",
  };
  
  return `${gradients[color]} text-white`;
};

/**
 * Get themed card classes based on category
 */
export const getThemedCardClasses = (
  category: "success" | "info" | "warning" | "error" | "neutral",
  isDarkMode: boolean
) => {
  const themes = {
    success: isDarkMode
      ? "bg-emerald-900/30 border-emerald-700 text-emerald-100"
      : "bg-emerald-50 border-emerald-200 text-emerald-900",
    info: isDarkMode
      ? "bg-blue-900/30 border-blue-700 text-blue-100"
      : "bg-blue-50 border-blue-200 text-blue-900",
    warning: isDarkMode
      ? "bg-amber-900/30 border-amber-700 text-amber-100"
      : "bg-amber-50 border-amber-200 text-amber-900",
    error: isDarkMode
      ? "bg-red-900/30 border-red-700 text-red-100"
      : "bg-red-50 border-red-200 text-red-900",
    neutral: isDarkMode
      ? "bg-gray-800 border-gray-700 text-gray-100"
      : "bg-gray-50 border-gray-200 text-gray-900",
  };
  
  return themes[category];
};

/**
 * Get icon container classes with background
 */
export const getIconContainerClasses = (
  color: "emerald" | "blue" | "purple" | "amber" | "red",
  isDarkMode: boolean
) => {
  const colors = {
    emerald: isDarkMode
      ? "bg-emerald-900/50 text-emerald-300"
      : "bg-emerald-100 text-emerald-700",
    blue: isDarkMode
      ? "bg-blue-900/50 text-blue-300"
      : "bg-blue-100 text-blue-700",
    purple: isDarkMode
      ? "bg-purple-900/50 text-purple-300"
      : "bg-purple-100 text-purple-700",
    amber: isDarkMode
      ? "bg-amber-900/50 text-amber-300"
      : "bg-amber-100 text-amber-700",
    red: isDarkMode
      ? "bg-red-900/50 text-red-300"
      : "bg-red-100 text-red-700",
  };
  
  return colors[color];
};

/**
 * Utility to combine modal classes with custom classes
 */
export const combineClasses = (...classes: (string | undefined | false)[]) => {
  return classes.filter(Boolean).join(" ");
};
