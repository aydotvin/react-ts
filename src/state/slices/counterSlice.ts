import { createSlice, createAsyncThunk, PayloadAction, ThunkDispatch, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "@state/store";

export interface CounterState {
  count: number;
}

interface IncrementCountAction extends PayloadAction {
  type: "counter/incrementCounter";
}

interface DecrementCountAction extends PayloadAction {
  type: "counter/decrementCounter";
}

interface SetCountAction extends PayloadAction<{ count: number }> {
  type: "counter/setCounter";
}

export type CounterActions = IncrementCountAction | DecrementCountAction | SetCountAction;

const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 },
  reducers: {
    incrementCounter: (state) => {
      return { count: state.count + 1 };
    },
    decrementCounter: (state) => {
      state.count -= 1;
    },
    setCounter: (state, action) => {
      console.log(action);
      state.count += action.payload.count;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(counterAsyncIncrement.pending, (state, action) => {
        console.log("pending");
      })
      .addCase(counterAsyncIncrement.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.count += action.payload.count as number;
      });
  },
});

export const counterAddExtraIfOdd = (extraCount: number): ThunkAction<void, RootState, unknown, CounterActions> => {
  return (dispatch: ThunkDispatch<RootState, unknown, CounterActions>, getState: () => RootState) => {
    const currentCount = getState().counterData.count;
    if (currentCount % 2 !== 0) {
      dispatch(setCounter({ count: extraCount }));
    }
  };
};

export const counterAsyncIncrement = createAsyncThunk("counter/asyncIncrement", async (extraCount: number) => {
  const response = await new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      resolve(extraCount);
    }, 3000);
  });

  return { count: response };
});

// const tempActions = counterSlice.actions;
// tempActions.addExtraIfOdd = addExtraIfOdd;
// tempActions.asyncIncrement = asyncIncrement;
// export const actions = counterSlice.actions;
// export const actions = tempActions;

export const { incrementCounter, decrementCounter, setCounter } = counterSlice.actions;
export const counterReducer = counterSlice.reducer;
