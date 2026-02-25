import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DisplayProduct() {
  const { id } = useParams(); // Get the ID from URL
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (!id) return;

    // Fetch product details
    axios
      .get(`http://localhost:8081/display-products-api/${id}`) // Adjust if your API returns JSON product data
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product details:", err));

    // Fetch product image separately
    fetch(`http://localhost:8081/display-products-api/${id}/image`)
      .then((res) => {
        if (!res.ok) throw new Error("Image not found");
        return res.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      })
      .catch((err) => console.error("Error fetching image:", err));

    // Cleanup Blob URL on unmount
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="product-card p-4 border rounded w-64 mx-auto mt-10 text-center">
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p>{product.description}</p>
      <p className="font-semibold">Price: ${product.price}</p>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={product.name}
          className="mt-2 w-full h-48 object-cover"
        />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
}

export default DisplayProduct;
