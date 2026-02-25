import { useState } from "react";

function AddProduct() {
  const [pName, setPName] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // product JSON
    const product = {
      p_name: pName,
      p_rating: rating,
      description: description,
    };

    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    // image file
    formData.append("image", image);

    const response = await fetch("http://localhost:8081/add-products-api", {
      method: "POST",
      body: formData, // ⚠️ do NOT set headers
    });

    if (response.ok) {
      alert("Product uploaded successfully");
    } else {
      alert("Upload failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          onChange={(e) => setPName(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="number"
          placeholder="Rating"
          onChange={(e) => setRating(e.target.value)}
          required
        />
        <br /><br />

        <textarea
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <br /><br />

        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default AddProduct;
