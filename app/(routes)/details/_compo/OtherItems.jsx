'use client'
import React, { useEffect, useState } from "react";
import ProductCard from "./Card";


const products = [
  {
    id: 1,
    name: "Round Play Mat for Baby Gym and Room",
    price: 150.0,
    imageUrl: "https://images.zbooni.com/img-optim/api/v1/image?url=https%3A%2F%2Fdlxl63y8t41yr.cloudfront.net%2Fmedia%2Fproducts%2F11630%2F96E2D9F9-6D42-4DDB-BDC3-75DBF010F11B.jpg&w=384&q=75",
  },
  {
    id: 2,
    name: "Nordic Grey Play Mat / Floor Cushion with Poms",
    price: 299.0,
    imageUrl: "https://images.zbooni.com/img-optim/api/v1/image?url=https%3A%2F%2Fdlxl63y8t41yr.cloudfront.net%2Fmedia%2Fproducts%2F11630%2F2402550B-5ABA-4E2A-9FAC-657400FFB225.jpg&w=384&q=75",
  },
  {
    id: 3,
    name: "Nordic Floor Cushion with Pom Poms",
    price: 299.0,
    imageUrl: "https://images.zbooni.com/img-optim/api/v1/image?url=https%3A%2F%2Fdlxl63y8t41yr.cloudfront.net%2Fmedia%2Fproducts%2F11630%2FCF7A6D8C-C885-4E7A-8E88-C16B5C0451F7.jpg&w=384&q=75",
  },
  {
    id: 4,
    name: "Stuffed Animal Head Wall Mount - Rabbit",
    price: 220.0,
    imageUrl: "https://images.zbooni.com/img-optim/api/v1/image?url=https%3A%2F%2Fdlxl63y8t41yr.cloudfront.net%2Fmedia%2Fproducts%2F11630%2FE1CD571A-D0D8-4C73-AB9E-ACACDFF7E7A3.jpg&w=384&q=75",
  },
  {
    id: 4342,
    name: "Stuffed Animal Head Wall Mount - Rabbit",
    price: 220.0,
    imageUrl: "https://images.zbooni.com/img-optim/api/v1/image?url=https%3A%2F%2Fdlxl63y8t41yr.cloudfront.net%2Fmedia%2Fproducts%2F11630%2FE1CD571A-D0D8-4C73-AB9E-ACACDFF7E7A3.jpg&w=384&q=75",
  },
  {
    id: 444,
    name: "Stuffed Animal Head Wall Mount - Rabbit",
    price: 220.0,
    imageUrl: "https://images.zbooni.com/img-optim/api/v1/image?url=https%3A%2F%2Fdlxl63y8t41yr.cloudfront.net%2Fmedia%2Fproducts%2F11630%2FE1CD571A-D0D8-4C73-AB9E-ACACDFF7E7A3.jpg&w=384&q=75",
  },
  {
    id: 5,
    name: "Reform pre booking",
    price: 99.0,
    imageUrl: "https://images.zbooni.com/img-optim/api/v1/image?url=https%3A%2F%2Fdlxl63y8t41yr.cloudfront.net%2Fmedia%2Fproducts%2F11630%2FF347330B-26A1-4D1E-9CE9-3845FDFA115C.jpg&w=384&q=75",
  },
  {
    id: 6,
    name: "Plastic Bug - 39pcs",
    price: 120.0,
    imageUrl: "https://images.zbooni.com/img-optim/api/v1/image?url=https%3A%2F%2Fdlxl63y8t41yr.cloudfront.net%2Fmedia%2Fproducts%2F11630%2F3712494370.jpeg&w=384&q=75",
  },
];

const OtherItems = ({handleClick}) => {
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    setLoading(false)
  },[])
  if(loading){
    return(
      <p>Loading...</p>
    )
  }
  return (
    <div className="md:p-6 mt-4 md:max-w-5xl mx-auto">
      <h2 className="text-xl mx-4 text-black font-bold my-5">View other items</h2>

      <div className="md:grid grid-cols-6 px-1 gap-3 md:overflow-x-auto">
        {products.map((product) => (
          <ProductCard key={product.id} handleClick={handleClick} product={product} />
        ))}
      </div>
    </div>
  );
};

export default OtherItems;
