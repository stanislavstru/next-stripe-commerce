import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../types";
import { CreateFeedbackRequestsDto } from "@/common/types/api/types-from-swagger";
import { ProductsEntity } from "@/common/types/api/types-from-swagger";

export type ModalsReducer = {
  feedbackModal: {
    show: boolean;
    data: CreateFeedbackRequestsDto | null;
  };
  preorderModal: {
    show: boolean;
    data:
      | ({
          product: ProductsEntity;
        } & Partial<{
          product_quantity: number;
          user_address: string;
          user_full_name: string;
          user_email: string;
          content: string;
        }>)
      | null;
  };
  callbackModal: {
    show: boolean;
    data: {
      routeToSuscriptionPage: boolean;
    };
  };
};

const initialStateModals: ModalsReducer = {
  feedbackModal: {
    show: false,
    data: null,
  },
  preorderModal: {
    show: false,
    data: null,
  },
  callbackModal: {
    show: false,
    data: { routeToSuscriptionPage: true },
  },
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState: initialStateModals,
  reducers: {
    toggleFeedbackModal: (state, action) => {
      state.feedbackModal = { ...state.feedbackModal, ...action.payload };
    },
    togglePreorderModal: (state, action) => {
      state.preorderModal = { ...state.preorderModal, ...action.payload };
    },
    toggleCallbackModal: (state, action) => {
      state.callbackModal = { ...state.callbackModal, ...action.payload };
    },
  },
});

export const { toggleFeedbackModal, togglePreorderModal, toggleCallbackModal } =
  modalsSlice.actions;

export const selectModals = (state: AppState) => state.modals;

export default modalsSlice.reducer;
