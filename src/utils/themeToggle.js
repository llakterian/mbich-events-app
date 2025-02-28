export const toggleTheme = () => {
  const root = document.documentElement;
  const isDark = root.classList.contains('dark-theme');
  
  if (isDark) {
    root.classList.remove('dark-theme');
    root.classList.add('light-theme');
  } else {
    root.classList.remove('light-theme');
    root.classList.add('dark-theme');
  }
  
  return !isDark;
};
