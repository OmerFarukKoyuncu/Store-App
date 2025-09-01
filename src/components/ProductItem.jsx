import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { currencyTRY } from "../utils/formats";
import ReportIcon from "@mui/icons-material/Report";

const ProductItem = ({ product, handleAddItem, cartItem, isAdding }) => {
  return (
    <Grid container spancing={2}>
      <Grid size={{ lg: 4, md: 5, sm: 6, xs: 12 }}>
        <Paper elevation={0} sx={{ p: 3 }}>
          <img
            src={`http://localhost:5000/images/${product.image}`}
            style={{ width: "100%" }}
          />
        </Paper>
      </Grid>
      <Grid size={{ lg: 8, md: 5, sm: 6, xs: 12 }}>
        <Paper elevation={0} sx={{ p: 3 }}>
          <Typography component="h1" variant="h4" color="error">
            {product.title}
          </Typography>
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="h5" color="error.light" sx={{ mt: 3 }}>
            {currencyTRY.format(product.price)}
          </Typography>

          <Stack
            direction="row"
            display="flex"
            alignItems="center"
            gap={2}
            sx={{ mt: 3 }}
          >
            {isAdding ? (
              <CircularProgress size="20px" />
            ) : (
              <Button
                onClick={() => handleAddItem(product.id)}
                variant="contained"
                color="primary"
              >
                Sepete Ekle
              </Button>
            )}

            {cartItem?.product.quantity > 0 && (
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <ReportIcon color="primary" />
                Sepetinizde bu üründen {cartItem.product.quantity} adet var.
              </Typography>
            )}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProductItem;
