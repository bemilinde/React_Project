import { useState } from "react";
import Layout from "../layout/main_layout";
import { db, storage, auth } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import "../css/product_create.css";

function ProductCreate({ refreshProducts }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!name || !description || !price || !image) {
        alert("모든 필드를 입력해주세요.");
        return;
      }

      // Upload image to Firebase Storage
      const storageRef = ref(storage, `product_images/${image.name}`);
      await uploadBytes(storageRef, image);

      // Get image download URL
      const imageURL = await getDownloadURL(storageRef);

      // Get logged-in user's email
      const user = auth.currentUser;
      const authorEmail = user ? user.email : "Unknown";

      // Get the current timestamp
      const createdAt = new Date().getTime();

      // Save product data with image URL, author email, and timestamp to Firestore
      const docRef = await addDoc(collection(db, "products"), {
        name,
        description,
        price,
        imageURL,
        authorEmail,
        created_at: createdAt,
      });

      console.log("Product created with ID:", docRef.id);
      alert("상품이 등록되었습니다.");
      setName("");
      setDescription("");
      setPrice(0);
      setImage(null);
      setPreviewImage(null);
      navigate("/product");
      // Invoke the refreshProducts callback to update the product list in Main component
      refreshProducts();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <Layout>
      <div className="product-create-container">
        <div className="image-upload">
          {previewImage && (
            <img src={previewImage} alt="Uploaded" className="preview-image" />
          )}
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <div className="product-details">
          <h1>상품 설명</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">상품명:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">상품 설명:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="price">가격:</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
              />
            </div>
            <Button variant="outline-secondary" type="submit">등록</Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default ProductCreate;
