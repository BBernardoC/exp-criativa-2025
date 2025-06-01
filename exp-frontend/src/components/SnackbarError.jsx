import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SnackbarError = ({ error, onClose }) => {
    return (
              <Snackbar
                open={!!error} 
                autoHideDuration={6000}
                onClose={onClose}
                message={error}
                >
                    <Alert onClose={onClose} severity="error" variant="filled">
            {error}
          </Alert>
                </Snackbar>
    )
}

export default SnackbarError;