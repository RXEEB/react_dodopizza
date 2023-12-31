import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating'
  },
  page: 1
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload

    },
    setSort(state, action) {
      state.sort = action.payload
    },
    setPage(state, action) {
      state.page = action.payload
    },
    setFilters(state, action) {
      state.sort = action.payload.sort                   // qs react парсинг
      state.page = Number(action.payload.page)
      state.categoryId = Number(action.payload.categoryId)
    }

  },
})

export const selectSort = (state) => state.filter.sort
export const { setCategoryId, setSort, setPage, setFilters } = filterSlice.actions


export default filterSlice.reducer