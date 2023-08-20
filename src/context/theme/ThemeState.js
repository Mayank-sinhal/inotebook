import React, { useState } from "react";
import themeContext from "./themeContext";

const ThemeState = (props) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };
  return (
    <>
      <themeContext.Provider value={{ isDarkTheme, toggleTheme }}>
        {props.children}
      </themeContext.Provider>
    </>
  );
};

export default ThemeState;
