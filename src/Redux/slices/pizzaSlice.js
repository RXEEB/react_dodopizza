import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params,thunkAPI) => {
  const { order, sotrBy, category, search, page } = params
  const {data} = await axios.get(`https://6281a8369fac04c654078cb9.mockapi.io/items?page=${page}&limit=8&${category}&sortBy=${sotrBy}&order=${order}${search}`)
  return data
}
)



const initialState = {
  items: [],
  status: 'loading',     // loading success error


}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },



  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading'
      state.status = []
      console.log('loading');
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload
      state.status = 'success'
      console.log('success');
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error'
      state.status = []
      console.log('error');
      
    }
  }

})


export const { setItems } = pizzaSlice.actions


export default pizzaSlice.reducer