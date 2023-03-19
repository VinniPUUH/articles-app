import { configureStore } from "@reduxjs/toolkit";

import Articles from "./articles/articlesSlice";

export const store = configureStore({
  reducer: { Articles: Articles.reducer },
});
