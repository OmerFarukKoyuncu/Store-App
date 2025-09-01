import { Category } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import Loading from "../components/Loading";
import requests from "../api/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectAllProducts } from "./catalog/catalogSlice";

const ProductsPage = () => {
  //dispatch ile ilgili veriyi service üzerinden set ediyoruz eğer yüklenmediyse(isLoaded) ondan sonra useSelector ile cacheden çekiyoruz
  const dispatch = useDispatch();
  const loadedProducts = useSelector(selectAllProducts);
  const { status, isLoaded } = useSelector((state) => state.catalog);

  useEffect(() => {
    if (!isLoaded) {
      dispatch(fetchProducts());
    }
  }, [isLoaded]);

  if (status === "pendingFetchProducts") {
    return <Loading message="Yükleniyor" />;
  }
  return <ProductList products={loadedProducts} />;
};

export default ProductsPage;
