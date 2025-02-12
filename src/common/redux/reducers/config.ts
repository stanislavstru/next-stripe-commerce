import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../types";
import { MainConfigDto } from "@/common/types/api/types-from-swagger";
import { getConfig } from "@/common/actions/config";

const initialConfigState: {
  status: "initial" | "loading" | "succeeded" | "failed";
  data: Record<
    MainConfigDto["config_key"],
    MainConfigDto["config_value"]
  > | null;
} = {
  status: "initial",
  data: null,
};

export const fetchConfig = createAsyncThunk("config/fetchConfig", async () => {
  try {
    const response = await getConfig();

    return response?.reduce((acc, item) => {
      acc[item.config_key] = item.config_value;
      return acc;
    }, {} as Record<MainConfigDto["config_key"], MainConfigDto["config_value"]>);
  } catch (error) {
    console.error("Failed to fetch cart", error);
  }
});

export const configSlice = createSlice({
  name: "config",
  initialState: initialConfigState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchConfig.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchConfig.fulfilled, (state, action) => {
      return {
        ...state,
        status: "succeeded",
        data: action.payload ?? null,
      };
    });
    builder.addCase(fetchConfig.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const selectConfig = (state: AppState) => state.config;

export default configSlice.reducer;
