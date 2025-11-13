import React from 'react';
import { Link } from "react-router-dom";
import "../styles/About.css"

const About = () => {
    return (
        <div className="about-page">
            <header className="section-header">
                <h1>About Us</h1>
            </header>

            <div className="about-content">
                <div className="intro">
                    <p>
                        The Art Institute of Chicago is one of the oldest and most renowned art museums in the United States.
                        Founded in 1879, it houses more than 300,000 artworks—from ancient artifacts to cutting-edge contemporary pieces.
                        Visitors from all over the world come to experience masterpieces such as Georges Seurat’s <em>A Sunday on La Grande Jatte</em>,
                        Grant Wood’s <em>American Gothic</em>, and countless works by Monet, Picasso, and van Gogh.
                    </p>
                </div>

                <div className="mission">
                    <h2>Our Mission</h2>
                    <p>
                        The Art Institute’s mission is to collect, preserve, and interpret works of art of the highest quality,
                        representing the world’s diverse artistic traditions. We aim to inspire and educate through art,
                        connecting people across cultures, time, and experience.
                    </p>
                </div>

                <div className="visit-info">
                    <h2>Plan Your Visit</h2>
                    <p>
                        We are located in the heart of downtown Chicago, at 111 South Michigan Avenue, just steps away from Millennium Park.
                    </p>
                    <a
                        href="http://maps.app.goo.gl/FgjJGQTqAUvKL9ZLA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-link"
                    >
                        View on Google Maps
                    </a>
                </div>

                <div className="learn-more">
                    <h2>Learn More</h2>
                    <p>
                        Explore our <Link to="/gallery">Gallery</Link> to discover featured artworks,
                        or visit the <Link to="/contact">Contact</Link> page for visitor information and inquiries.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
