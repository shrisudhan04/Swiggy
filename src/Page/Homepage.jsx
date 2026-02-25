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
 // ---------- DISPLAY ALL PRODUCTS ----------
const [product, setProduct] = useState([]);

// BELOW state
const VISIBLE = 3;
const [page, setPage] = useState(0);
const maxPage = Math.ceil(product.length / VISIBLE) - 1;

  // ---------- IMAGE UPLOAD ----------
  const [file, setFile] = useState(null);

  const uploadImage = async () => {
    if (!file) {
      alert("Please select an image");
      return;
    }

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
    alert("Image uploaded successfully");
  };

  // ---------- DISPLAY ALL PRODUCTS ----------
  const [products, setProducts] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:8081/display-all-products-api")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);


  
  return (
    <div className="homepage">
      {/* ---------------- CAROUSEL & HEADER ---------------- */}
      <div className="carosel !bg-gradient-to-b from-[#cc4200] to-[#FF5200] h-184 relative">
        <img src={left} className='w-[250px] pt-23 absolute left-0' alt="" />
        <img src={right} className='w-[250px] pt-23 absolute right-0' alt="" />
        <div className="flex">
          <img src={swiggy} className='w-38 pt-10 ml-40' alt="" />

          <div className="flex absolute right-30 pt-10 gap-15 text-white font-swiggy-bold">
            <div className="relative group mt-2 ">
                <div>More <i className="bi bi-chevron-down ml-2 inline-block transition-transform duration-300  group-hover:rotate-180"></i></div>
                 <div className="absolute hidden group-hover:block bg-white w-auto text-black p-3 rounded-2xl mt-1">
                    <ul className='-ml-8'>
                        <li>hjhjghj</li>
                        <li>ji</li>
                    </ul>
                </div>
            </div>
           

            <div className="hover:underline hover:underline-offset-8 mt-2">Partner with us</div>
            <button className='flex gap-2 bg-[#cc4200] text-white p-2 !rounded-2xl border-2 hover:bg-white hover:!text-[#cc4200]'>
              <i className="bi bi-person"></i>
              <a className='!no-underline !text-white hover:!text-[#FF5200]' href="/signup">Sign Up</a>
            </button>
            <button className='flex gap-2 bg-white text-[#cc4200] p-2 !rounded-2xl w-23 hover:!bg-[#cc4200] hover:text-white'>
              <i className='bi bi-arrow-right'></i>
              <a className='!no-underline !text-[#FF5200] hover:!text-white' href="/login">Login</a>
            </button>
          </div>
        </div>

        <div className="font-swiggy-bold text-white text-5xl text-center pt-25 w-50 justify-center mx-auto">
          Order food & groceries. Discover best restaurants. Swiggy it!
        </div>

        <div className="flex justify-center gap-4 pt-10 font-swiggy-medium">
          <div className="position-relative w-80">
            <i className="bi bi-geo-alt-fill position-absolute top-50 start-0 translate-middle-y ms-3 text-orange-600 text-xl"></i>
            <input type="text" className="form-control bg-white h-12 rounded-2xl ps-5" placeholder='Get location'/>
          </div>
          <div className="position-relative w-120">
            <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-orange-600"></i>
            <input type="text" className="form-control bg-white h-12 rounded-2xl ps-5" placeholder='Search here'/>
          </div>
        </div>

        <div className="card flex flex-row gap-15 !bg-transparent justify-center mt-8">
          {[card1, card2, card3].map((card, idx) => (
            <div key={idx} className="card-1 relative w-74 h-65 bg-white rounded-4xl mt-10 px-4 py-4 flex flex-col gap-2">
              <div className="font-swiggy-bold text-3xl text-[#484342]">FOOD DELIVERY</div>
              <p className="font-swiggy-medium text-xl text-[#a69894]">FROM RESTAURANTS</p>
              <p className="font-swiggy-bold text-[#FF5200] text-xl">UPTO 60% OFF</p>
              <img src={card} alt="" className='w-40 h-30 absolute bottom-0 right-[-2px]'/>
            </div>
          ))}
        </div> 

        <div className="menu mt-20 ml-40 mr-40">
          <h3 className='font-swiggy-bold'>Hi Sudhan, whats on your mind</h3>
          <div className="image flex flex-wrap gap-10 mt-8">
            {[item1, item2, item3, item4, item5, item6, item1, item4, item6, item3, item2, item5].map((item, idx) => (
              <img key={idx} src={item} alt="" className='w-40'/>
            ))}
          </div>
        </div>  

        {/* IMAGE UPLOAD */}
        <div className="image-upload mt-10 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button className="btn btn-dark ms-3" onClick={uploadImage}>
            Upload
          </button>
        </div>  
      </div>

      {/* ---------------- DISPLAY ALL PRODUCTS ---------------- */}
       
      <form action="/logout">
        <button type="submit">logout</button>
      </form>
      <br />
      <div className="productscard mt-140 flex flex-wrap gap-10 px-40">

        {products.map(pro => (
          <div
            key={pro.p_id}
            className="relative h-60 w-[360px] rounded-t-[40px] overflow-hidden cursor-pointer group mb-10"
          >
            {/* background image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              style={{
                backgroundImage: `url(http://localhost:8081/display-products-api/${pro.p_id}/image)`
              }}
            />

            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10 transition-opacity duration-300 group-hover:opacity-40" />

            {/* product name */}
            <div className="absolute bottom-4 left-4 z-10 text-white text-2xl font-swiggy-bold">
              {pro.p_name}
            </div>
           <div className="absolute bottom-4 right-4 z-10 text-white text-2xl font-swiggy-bold w-8 h-8 flex items-center justify-center gap-2">

              {pro.p_rating}
              <img src={rating} alt="rating" />
            </div>
          </div>
        ))}
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
                  {product
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
      </div>
    </div>
  );
}

export default Practice;
