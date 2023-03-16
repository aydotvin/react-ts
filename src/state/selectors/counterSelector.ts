import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@state/store";

const selectCounterData = (state: RootState) => state.counterData;

export const selectCounterValue = createSelector(selectCounterData, (counterState) => counterState.count);
