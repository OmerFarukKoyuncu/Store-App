import { Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

const AdressForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("firstname", {
            required: "Firstname zorunlu alan",
          })}
          label="Enter firstname"
          size="small"
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          error={!!errors.firstname}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("lastname", {
            required: "Lastname zorunlu alan",
          })}
          label="Enter lastname"
          size="small"
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.lastname}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("phone", {
            required: "Phone zorunlu alan",
          })}
          label="Enter phone"
          size="small"
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.phone}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("city", {
            required: "City zorunlu alan",
          })}
          label="Enter city"
          size="small"
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.city}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          {...register("address", {
            required: "Address zorunlu alan",
          })}
          label="Enter address"
          size="small"
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
          error={!!errors.address}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}></Grid>
    </Grid>
  );
};

export default AdressForm;
