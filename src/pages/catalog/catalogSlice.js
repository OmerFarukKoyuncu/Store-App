import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import requests from "../../api/apiClient";

export const fetchProducts = createAsyncThunk(
  "catalog/fetchProducts",
  async () => await requests.products.list()
);

export const fetchProductById = createAsyncThunk(
  "catalog/fetchProductById",
  async (productId) => await requests.products.details(productId)
);

const productAdabter = createEntityAdapter();

const initialState = productAdabter.getInitialState({
  status: "idle",
  isLoaded: false,
});

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      //adaptor üzerinden gelen entitieste productlar
      //action payloaddan gelen listeyi state üzerine setAll metoduyla alıyoruz.
      productAdabter.setAll(state, action.payload);
      state.isLoaded = true;
      state.status = "idle";
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = "idle";
    });
    builder.addCase(fetchProductById.pending, (state) => {
      state.status = "pendingFetchProductById";
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      //varsa aynı ürün günceller yoksa ekler
      productAdabter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductById.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const {
  selectById: selectProductById,
  selectAll: selectAllProducts,
  selectTotal: selectTotalProducts,
} = productAdabter.getSelectors((state) => state.catalog);
