import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./accountSlice";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.account);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function handleForm(data) {
    dispatch(registerUser(data));
  }
  return (
    <Container maxWidth="xs">
      <Paper sx={{ padding: 2 }} elevation={3}>
        <Avatar sx={{ mx: "auto", mb: 2, color: "error.light" }}>
          <LockOutlined />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          sx={{ textAlign: "center", mb: 2 }}
        >
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleForm)}
          noValidate
          sx={{ mb: 2 }}
        >
          <TextField
            {...register("username", {
              required: "Username zorunlu alan",
              minLength: {
                value: 3,
                message: "Username minimum 3 karakter olmalıdır.",
              },
            })}
            label="Enter username"
            size="small"
            fullWidth
            autoFocus
            sx={{ mb: 2 }}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            {...register("email", {
              required: "Email zorunlu alan",
              minLength: {
                value: 6,
                message: "email minimum 6 karakter olmalıdır.",
              },
            })}
            type="email"
            label="Enter email"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            {...register("password", {
              required: "Password zorunlu alan",
              minLength: {
                value: 6,
                message: "Password minimum 6 karakter olmalıdır.",
              },
            })}
            type="password"
            label="Enter password"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={!isValid}
            color="error"
          >
            {status === "pending" ? <CircularProgress size="25px" /> : "Submit"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
