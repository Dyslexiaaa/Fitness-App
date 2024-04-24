import React, { createContext, useState, useContext } from "react";

const RoutineContext = createContext();

export const RoutineProvider = ({ children }) => {
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  return (
    <RoutineContext.Provider value={{ selectedRoutine, setSelectedRoutine }}>
      {children}
    </RoutineContext.Provider>
  );
};

export const useRoutine = () => useContext(RoutineContext);
