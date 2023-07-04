import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { db, storage, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Layout from "../layout/main_layout";
import './product.css/product_create.css';

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
        alert("이미지/정보를 모두 입력하세요.");
        return;
      }

      const storageRef = ref(storage, `product_images/${image.name}`);
      await uploadBytes(storageRef, image);
      const imageURL = await getDownloadURL(storageRef);
      const user = auth.currentUser;
      const authorEmail = user ? user.email : "Unknown";
      const createdAt = new Date().getTime();
      
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
