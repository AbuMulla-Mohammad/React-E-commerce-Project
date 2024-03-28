import { createContext, useEffect, useState } from "react";
export const SchemaContext = createContext();
const SchemaContextProvider = ({ children }) => {
    const test = 'test';
    return <SchemaContext.Provider value={test} >
        {children}
    </SchemaContext.Provider>
};
export default SchemaContextProvider;