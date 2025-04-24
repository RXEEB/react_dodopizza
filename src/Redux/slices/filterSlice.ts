import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'


export type Sort = {
  name: string;
  sortProperty: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price';
}

export interface FilterSliseStete {
  categoryId: number;
  sort: Sort;
  page: number;
}



const initialState: FilterSliseStete = {
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
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload

    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    setFilters(state, action: PayloadAction<FilterSliseStete>) {
      state.sort = action.payload.sort                   // qs react парсинг
      state.page = Number(action.payload.page)
      state.categoryId = Number(action.payload.categoryId)
    }

  },
})

export const selectSort = (state: RootState) => state.filter.sort
export const { setCategoryId, setSort, setPage, setFilters } = filterSlice.actions


export default filterSlice.reducer