import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import left from '../assets/image/Carosel-1.avif'
import right from '../assets/image/Carosel-2.avif'
import swiggy from '../assets/image/swiggy_logo_white.avif'
import rating from '../assets/image/rating.png'
import card1 from '../assets/image/card-1.png'
import card2 from '../assets/image/card-2.png'
import card3 from '../assets/image/card-3.png'
import item1 from '../assets/image/item1.avif'
import item2 from '../assets/image/intem2.avif'
import item3 from '../assets/image/intem3.avif'
import item4 from '../assets/image/intem4.avif'
import item5 from '../assets/image/intem5.avif'
import item6 from '../assets/image/intem6.avif'

import axios from "axios";
import { useState, useEffect } from "react";

function Practice() {

  /* ---------------- IMAGE UPLOAD ---------------- */
  const [file, setFile] = useState(null);

  const uploadImage = async () => {
    if (!file) return alert("Select image");

    const formData = new FormData();
    const product = {
      p_name: "Sample Product",
      p_rating: 5,
      description: "Sample Description"
    };

    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );
    formData.append("image", file);

    await axios.post("http://localhost:8081/add-products-api", formData);
    alert("Uploaded");
  };

  /* ---------------- FETCH PRODUCTS ---------------- */
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/display-all-products-api")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  /* ---------------- SLIDER LOGIC ---------------- */
  const VISIBLE = 3;
  const [page, setPage] = useState(0);
  const maxPage = Math.ceil(products.length / VISIBLE) - 1;

  return (
    <div className="homepage">

      {/* ---------------- HEADER ---------------- */}
      <div className="carosel !bg-gradient-to-b from-[#cc4200] to-[#FF5200] h-184 relative">
        <img src={left} className='w-[250px] pt-23 absolute left-0' alt="" />
        <img src={right} className='w-[250px] pt-23 absolute right-0' alt="" />

        <div className="flex">
          <img src={swiggy} className='w-38 pt-10 ml-40' alt="" />

          <div className="flex absolute right-30 pt-10 gap-15 text-white font-swiggy-bold">
            <div className="relative group mt-2">
              <div>
                More
                <i className="bi bi-chevron-down ml-2 inline-block transition-transform duration-300 group-hover:rotate-180"></i>
              </div>
              <div className="absolute hidden group-hover:block bg-white text-black p-3 rounded-2xl mt-1">
                <ul>
                  <li>Option 1</li>
                  <li>Option 2</li>
                </ul>
              </div>
            </div>

            <div className="hover:underline hover:underline-offset-8 mt-2">
              Partner with us
            </div>
          </div>
        </div>

        <div className="font-swiggy-bold text-white text-5xl text-center pt-25 w-50 mx-auto">
          Order food & groceries. Discover best restaurants. Swiggy it!
        </div>

        {/* ---------------- MENU ---------------- */}
        <div className="menu mt-20 ml-40 mr-40">
          <h3 className='font-swiggy-bold'>Hi Sudhan, whats on your mind</h3>
          <div className="flex flex-wrap gap-10 mt-8">
            {[item1, item2, item3, item4, item5, item6].map((item, i) => (
              <img key={i} src={item} className="w-40" />
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- PRODUCT SLIDER ---------------- */}
      <div className="mt-140 px-40 overflow-hidden">

        {/* title + arrows */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-swiggy-bold">
            Discover best restaurants on Dineout
          </h2>

          <div className="flex gap-2">
            <button
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="w-10 h-10 rounded-full bg-gray-200 disabled:opacity-40"
            >
              <i className="bi bi-arrow-left"></i>
            </button>

            <button
              disabled={page === maxPage}
              onClick={() => setPage(page + 1)}
              className="w-10 h-10 rounded-full bg-gray-200 disabled:opacity-40"
            >
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>

        {/* slider */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {Array.from({ length: maxPage + 1 }).map((_, idx) => (
            <div key={idx} className="min-w-full flex gap-10">
              {products
                .slice(idx * VISIBLE, idx * VISIBLE + VISIBLE)
                .map(pro => (
                  <div
                    key={pro.p_id}
                    className="relative h-60 w-[360px] rounded-t-[40px] overflow-hidden group"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{
                        backgroundImage: `url(http://localhost:8081/display-products-api/${pro.p_id}/image)`
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />

                    <div className="absolute bottom-4 left-4 text-white text-2xl font-swiggy-bold">
                      {pro.p_name}
                    </div>

                    <div className="absolute bottom-4 right-4 text-white flex items-center gap-1">
                      {pro.p_rating}
                      <img src={rating} className="w-5" />
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- UPLOAD ---------------- */}
      <div className="text-center mt-10">
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button className="btn btn-dark ms-3" onClick={uploadImage}>
          Upload
        </button>
      </div>

    </div>
  );
}

export default Practice;
