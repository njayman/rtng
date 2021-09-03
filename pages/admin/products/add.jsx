import { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import { useRouter } from "next/router";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  form: {
    width: "300px",
    margin: "0 auto",
  },
  input: {
    margin: "5px 0",
  },
  alert: {
    background: "#00000000",
  },
}));

const AdminProductAdd = () => {
  const classes = useStyles();
  const router = useRouter();
  const [snakcbarOpen, setSnakcbarOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState({});
  const [product, setProduct] = useState({});
  const changeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnakcbarOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      const { data } = await axios.post("/api/admin/products/add", product);
      if (data.success) {
        setMessage({
          type: "success",
          text: data.message,
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message,
      });
    }
    setSnakcbarOpen(true);
    router.push("/");
  };
  return (
    <>
      <FormControl
        component="form"
        color="secondary"
        onSubmit={handleSubmit}
        className={classes.form}
      >
        <TextField
          label="Product Name"
          name="name"
          required
          className={classes.input}
          onChange={changeHandler}
        />
        <TextField
          label="Product description"
          name="description"
          multiline
          rows={4}
          required
          className={classes.input}
          onChange={changeHandler}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          required
          className={classes.input}
          onChange={changeHandler}
        />
        <TextField
          label="Image Url"
          name="url"
          type="url"
          required
          className={classes.input}
          onChange={changeHandler}
        />
        <TextField
          name="tags"
          label="Tags"
          required
          className={classes.input}
          onChange={changeHandler}
        />
        <Button
          variant="contained"
          type="button"
          className={classes.input}
          onClick={() => router.push("/")}
          disabled={submitted}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={submitted}
          className={classes.input}
        >
          Add Product
        </Button>
      </FormControl>
      <Snackbar
        open={snakcbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={message.type}>
          {message.text}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AdminProductAdd;
