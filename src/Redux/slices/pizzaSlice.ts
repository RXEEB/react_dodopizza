import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export type SearchPizzasParams = {
  order: string;
  sortBy: string;
  category: string;
  search: string;
  page: number;
}

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzasParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { order, sortBy, category, search, page } = params
    const { data } = await axios.get<Pizza[]>(
      `https://6281a8369fac04c654078cb9.mockapi.io/items?page=${page}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
    return data
  }
)



type Pizza = {
  title: string;
  price: number;
  imageUrl: string;
  id: number;
  sizes: number[];
  types: number[];
  rating: number;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'

}

interface PizzaSliceState {
  items: Pizza[];
  status: Status

}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,

}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING
      state.items = []
    })

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCESS
    })
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.items = []
      state.status = Status.ERROR
    })
  }

  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'loading'
  //     state.status = []
  //     console.log('loading');
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload
  //     state.status = 'success'
  //     console.log('success');
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     state.status = 'error'
  //     state.status = []
  //     console.log('error');

  //   }
  // }

})


export const { setItems } = pizzaSlice.actions


export default pizzaSlice.reducer