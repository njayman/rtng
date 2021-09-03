import React from "react";

const ProductsAdmin = () => {
  return <div></div>;
};

export default ProductsAdmin;
// export async function getStaticPaths({ req }) {
//   // Fetch data from external API
//   const baseUrl = req ? `${req.protocol}://${req.get("Host")}` : "";
//   console.log(baseUrl);
//   const res = await fetch(`http://localhost:3000/api/admin/products`);
//   const data = await res.json();
//   const paths = data.products.map((product) => ({
//     params: { id: product._id },
//   }));

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// }
