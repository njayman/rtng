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

const AdminProductEdit = ({ pdct }) => {
  const router = useRouter();
  const classes = useStyles();
  const { id } = router.query;

  const [snakcbarOpen, setSnakcbarOpen] = useState(false);
  const [message, setMessage] = useState({});
  const [product, setProduct] = useState(pdct);
  const [edit, setEdit] = useState(false);
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
    try {
      const { data } = await axios.post(
        `/api/admin/products/edit/${id}`,
        product
      );
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
          defaultValue={pdct.name}
          className={classes.input}
          onChange={changeHandler}
          disabled={!edit}
        />
        <TextField
          label="Product description"
          name="description"
          multiline
          rows={4}
          required
          defaultValue={pdct.description}
          className={classes.input}
          onChange={changeHandler}
          disabled={!edit}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          required
          defaultValue={pdct.price}
          className={classes.input}
          onChange={changeHandler}
          disabled={!edit}
        />
        <TextField
          label="Image Url"
          name="url"
          type="url"
          required
          defaultValue={pdct.url}
          className={classes.input}
          onChange={changeHandler}
          disabled={!edit}
        />
        <TextField
          name="tags"
          label="Tags"
          required
          defaultValue={pdct.tags}
          className={classes.input}
          onChange={changeHandler}
          disabled={!edit}
        />
        <Button
          variant="contained"
          type="button"
          className={classes.input}
          onClick={() => router.push("/")}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.input}
        >
          Submit
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
export async function getStaticPaths({ req }) {
  // Fetch data from external API
  const baseUrl = process.env.VERCEL_URL || "http://localhost:3000";
  console.log(baseUrl);
  const res = await fetch(`${baseUrl}/api/admin/products`);
  const data = await res.json();
  const paths = data.products.map((product) => ({
    params: { id: product._id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
export async function getStaticProps({ params }) {
  const baseUrl = process.env.VERCEL_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/admin/products/${params.id}`);
  const data = await res.json();

  // Pass post data to the page via props
  return { props: { pdct: data.product } };
}
export default AdminProductEdit;
