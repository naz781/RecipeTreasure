import React from 'react';
import './BannerCard.css';

const Banner = () => {
    const spiceImage = '/images/spices.jpg';

    return (
        <div className="banner-card-container">
            <div className="banner-card-image">
                <img src={spiceImage} alt="Spices" />
            </div>
            <div className="banner-card-text">
                <h1>About US</h1>
                <p>
                    We are a family who loves cooking and keeping our grandma’s and mom’s cherished recipes alive.
                    From Lucknow to Karachi, our kitchen blends tradition with creativity.
                    Explore our traditional dishes, fun fusion recipes, and delicious desserts — all crafted with care and a dash of spice!
                </p>
            </div>
        </div>
    );
};

export default Banner;
