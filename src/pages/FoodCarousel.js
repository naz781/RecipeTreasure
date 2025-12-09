import React, { useState, useEffect } from "react";

const dishes = [
  {
    name: "Lucknowi Biryani",
    description:
      "Experience the royal taste of Awadh — fragrant basmati rice, slow‑cooked meat, saffron, and aromatic spices.",
    subtext:
      "Heritage dish from Lucknow’s Nawabi kitchens. Perfect blend of aroma, flavor and cultural roots.",
    image:
      "/images/biryani.jpg"
  },
  {
    name: "Nihari",
    description:
      "A slow-cooked meat stew, enjoyed in Lucknow, rich in flavor and tradition.",
    subtext:
      "Soulful home-style dish with Nawabi heritage. Best enjoyed with naan or kulcha.",
    image:
      "/images/Nihari-3-1.jpg"
  }
];

const FoodBanner = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % dishes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner-container">
      {/* Left Text */}
      <div key={current} className="banner-text slide-in">
        <h1>{dishes[current].name}</h1>
        <p>{dishes[current].description}</p>
        <p className="subtext">{dishes[current].subtext}</p>
      </div>

      {/* Right Image */}
      <div className="banner-image">
        <img src={dishes[current].image} alt={dishes[current].name} />
      </div>
    </div>
  );
};

export default FoodBanner;
