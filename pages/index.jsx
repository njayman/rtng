import Head from "next/head";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CallIcon from "@material-ui/icons/Call";
import IconButton from "@material-ui/core/IconButton";
import { useState } from "react";
const useStyles = makeStyles((theme) => ({
  form: {
    padding: "20px 10px",
    display: "flex",
    justifyContent: "center",
  },
  search: {
    width: "80%",
  },
  card: {
    width: 300,
  },
  media: {
    height: 140,
  },
}));

export default function Home({ products }) {
  const classes = useStyles();
  const [query, setQuery] = useState();
  return (
    <>
      <Head>
        <title>Rajia Treat and Groceries</title>
        <meta name="description" content="Homemade food and grocerry store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classes.form}>
        <TextField
          label="Search here"
          variant="outlined"
          className={classes.search}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Grid container spacing={3}>
        {products
          .filter((p) => {
            if (query) {
              return (
                p?.name?.toLowerCase().includes(query?.toLowerCase()) ||
                p?.description?.toLowerCase().includes(query?.toLowerCase()) ||
                p?.price.toString().includes(query?.toLowerCase()) ||
                p?.tags?.toLowerCase().includes(query?.toLowerCase()) ||
                p?.url?.toLowerCase().includes(query?.toLowerCase())
              );
            } else {
              return p;
            }
          })
          .map((product, id) => (
            <Grid key={id} item xs={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={product.url}
                  title="Paella dish"
                />
                <CardHeader
                  title={product.name}
                  subheader={`BDT ${product.price}`}
                  action={
                    <IconButton
                      color="primary"
                      variant="contained"
                      aria-label="Call"
                    >
                      <CallIcon />
                    </IconButton>
                  }
                />
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
}

export async function getStaticProps() {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/products`);
  const data = await res.json();
  if (!data) {
    return {
      notFound: true,
    };
  }
  return { props: { products: data.products } };
}
