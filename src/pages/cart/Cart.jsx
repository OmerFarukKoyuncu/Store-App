import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import requests from "../../api/apiClient";
import { currencyTRY } from "../../utils/formats";
import { Delete } from "@mui/icons-material";
import Loading from "../../components/Loading";
import { useCartContext } from "../../context/CartContext";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, deleteItemFromCart, setCart } from "./cartSlice";
import { Link } from "react-router";

const CartPage = () => {
  const { cart, status } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const subTotal = cart?.cartItems.reduce(
    (toplam, item) => toplam + item.product.price * item.product.quantity,
    0
  );

  const tax = subTotal * 0.2;
  const total = subTotal + tax;

  if (!cart || cart.cartItems.length === 0)
    return <Alert severity="warning">Sepetinizde ürün yok.</Alert>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 100 }}></TableCell>
              <TableCell>Ürün</TableCell>
              <TableCell sx={{ width: 120 }}>Fiyat</TableCell>
              <TableCell sx={{ width: 169 }}>Adet</TableCell>
              <TableCell sx={{ width: 120 }}>Toplam</TableCell>
              <TableCell sx={{ width: 50 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <img
                    src={`http://localhost:5000/images/${item.product.image}`}
                    style={{ width: "100%" }}
                  />
                </TableCell>
                <TableCell>{item.product.title}</TableCell>
                <TableCell>{currencyTRY.format(item.product.price)}</TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      dispatch(
                        deleteItemFromCart({
                          productId: item.product.productId,
                          quantity: 1,
                          key: "single",
                        })
                      )
                    }
                  >
                    {status ===
                    "pendingDeleteItem" + item.product.productId + "single" ? (
                      <CircularProgress size="20px" />
                    ) : (
                      <RemoveCircleOutlineIcon />
                    )}
                  </Button>
                  {item.product.quantity}
                  <Button
                    onClick={() =>
                      dispatch(
                        addItemToCart({ productId: item.product.productId })
                      )
                    }
                  >
                    {status === "pendingAdditem" + item.product.productId ? (
                      <CircularProgress size="20px" />
                    ) : (
                      <AddCircleOutlineIcon />
                    )}
                  </Button>
                </TableCell>
                <TableCell>
                  {currencyTRY.format(
                    item.product.price * item.product.quantity
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    color="error"
                    onClick={() =>
                      dispatch(
                        deleteItemFromCart({
                          productId: item.product.productId,
                          quantity: item.product.quantity,
                          key: "all",
                        })
                      )
                    }
                  >
                    {status ===
                    "pendingDeleteItem" + item.product.productId + "all" ? (
                      <CircularProgress size="20px" />
                    ) : (
                      <Delete />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell
                sx={{ borderBottom: "none" }}
                align="right"
                colSpan={5}
              >
                Ara Toplam
              </TableCell>
              <TableCell
                sx={{ borderBottom: "none" }}
                align="right"
                colSpan={5}
              >
                {currencyTRY.format(subTotal)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{ borderBottom: "none" }}
                align="right"
                colSpan={5}
              >
                Vergi
              </TableCell>
              <TableCell
                sx={{ borderBottom: "none" }}
                align="right"
                colSpan={5}
              >
                {currencyTRY.format(tax)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{ borderBottom: "none" }}
                align="right"
                colSpan={5}
              >
                Toplam
              </TableCell>
              <TableCell
                sx={{ borderBottom: "none" }}
                align="right"
                colSpan={5}
              >
                {currencyTRY.format(total)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 3 }}>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          color="error"
        >
          Continue Shopping
        </Button>
        <Button
          component={Link}
          to="/checkout"
          variant="contained"
          color="error"
        >
          Checkout
        </Button>
      </Box>
    </>
  );
};

export default CartPage;
