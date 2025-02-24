import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { CrmApi } from '../services/CrmApi'

export const store = configureStore({
  reducer: {
    [CrmApi.reducerPath]: CrmApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(CrmApi.middleware),
})

setupListeners(store.dispatch)