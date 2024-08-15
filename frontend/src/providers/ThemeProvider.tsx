import React, { createContext, useContext, useEffect, useState } from "react";
//* Theme context and provider */
type ThemeType = "light" | "dark";

interface ThemeContextInterface{
    // Theme context data types
    theme: ThemeType,
    toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextInterface>({
    // Theme context value
    theme: 'light' ,
    toggleTheme: () => {}
});

interface ThemeProviderInterface{
    // Theme provider props data types
    children: React.ReactNode | React.ReactNode[]
}

export const ThemeProvider: React.FC<ThemeProviderInterface> = ({ children }) => {
    // Theme provider effect to set theme from local storage
    const [theme, setTheme] = useState<ThemeType>(() => localStorage.getItem('theme') as ThemeType || "light");
    // Theme provider effect to change theme on theme change
    useEffect(() => {
        if (theme){
            localStorage.setItem('theme', theme);
        }

    }, [theme])

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
      };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = (): ThemeContextInterface => {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
  };
  
  