"use client";

import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
  selectModals,
  toggleFeedbackModal as toggleFeedbackModalNative,
  togglePreorderModal as togglePreorderModalNative,
} from "../redux/reducers/modals";
import { ModalsReducer } from "../redux/reducers/modals";

export const useModals = () => {
  const dispatch = useAppDispatch();
  const modals = useAppSelector(selectModals);

  const toggleFeedbackModal = (payload: ModalsReducer["feedbackModal"]) => {
    dispatch(toggleFeedbackModalNative(payload));
  };

  const togglePreorderModal = (payload: ModalsReducer["preorderModal"]) => {
    dispatch(togglePreorderModalNative(payload));
  };

  return { modals, toggleFeedbackModal, togglePreorderModal };
};
