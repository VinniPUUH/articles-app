import { createSlice } from "@reduxjs/toolkit";

import reducer from "./reducer";

import { IArticlesState } from "./types";

const initialState: IArticlesState = {
  articles: [],
};

export const Articles = createSlice({
  name: "Articles",
  initialState,
  reducers: reducer,
});

export const actions = Articles.actions;

export default Articles;
