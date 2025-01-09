import { createContext } from "react";

/**
 * UserLocationContext is a React context used to provide the user's location (latitude and longitude)
 * to the components that need it across the app. The context holds the location information and allows
 * components to access and update it.
 * 
 * @constant
 * @type {React.Context}
 * @default null - The default value of the context is null.
 */
export const UserLocationContext=createContext(null)