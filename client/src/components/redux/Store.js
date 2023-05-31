import { configureStore } from "@reduxjs/toolkit";
import ToDoslice from "./ToDoslice";

export default configureStore({
    reducer : {
        user : ToDoslice
    }
})