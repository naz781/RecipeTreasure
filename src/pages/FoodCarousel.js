import React, { useState, useEffect } from "react";

const dishes = [
    {
        name: "Lucknowi Biryani",
        description: "Experience the royal taste of Awadh — fragrant basmati rice, slow‑cooked meat, saffron, and aromatic spices.",
        subtext: "Heritage dish from Lucknow’s Nawabi kitchens. Perfect blend of aroma, flavor and cultural roots.",
        image: "https://images.unsplash.com/photo-1697155406055-2db32d47ca07?fm=jpg&w=1200"
    },
    {
        name: "Nihari",
        description: "A slow-cooked meat stew, enjoyed in Lucknow, rich in flavor and tradition.",
        subtext: "Soulful home-style dish with Nawabi heritage. Best enjoyed with naan or kulcha.",
        image: "https://www.sugarspicenmore.com/wp-content/uploads/2024/10/Nihari-3-1.jpg"
    }
];

const FoodBanner = () => {
    const [current, setCurrent] = useState(0);

    // Change slide every 6 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % dishes.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="banner-container">
            {/* Image switches instantly */}
            <div className="banner-image">
                <img src={dishes[current].image} alt={dishes[current].name} />
            </div>

            {/* Text slides in from left */}
            <div key={current} className="banner-text slide-in">
                <h1>{dishes[current].name}</h1>
                <p>{dishes[current].description}</p>
                <p className="subtext">{dishes[current].subtext}</p>
            </div>
        </div>
    );
};

export default FoodBanner;
