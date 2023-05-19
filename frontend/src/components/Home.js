import React from "react";
import { Link } from 'react-router-dom';
import Home from "../siteImages/Home.jpeg"

function HeaderNew() {
    return (
        <header>
            <div class="owl-carousel owl-theme">
                <div class="item">
                    <img src={Home} alt="" />
                    <div class="cover">
                        <div class="container">
                            <div class="header-content">
                                <div class="line"></div>
                                <h2>Get Your Health Checked with</h2>
                                <h1>Our Best Staff & Modern Facilities</h1>
                                <h4>With 24/7 premium affection and caring services for affordable prices</h4>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </header>
    )
}

export default HeaderNew;