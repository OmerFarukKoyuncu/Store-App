import { Alert, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router";
import { useLocation } from "react-router";

const ServerError = () => {
  const { state } = useLocation();
  //   navigateden gelen error u uselocation ile alıyoruz.
  return (
    <Paper sx={{ p: 3 }}>
      {state?.error ? (
        <>
          <Typography variant="h4" gutterBottom>
            {state.error.message} - {state.status}
          </Typography>
          <Alert severity="error">
            {state.error.details || "Bilinmeyen hata oluştu"}
          </Alert>
        </>
      ) : (
        <>
          <Typography variant="h4">Server Error</Typography>
          <Alert severity="error">Bilinmeyen Hata</Alert>
        </>
      )}

      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Anasayfa
      </Button>
    </Paper>
  );
};

export default ServerError;
