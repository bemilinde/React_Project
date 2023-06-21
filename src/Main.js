import React from 'react';
import Layout from './components/layout/main_layout.js';
import ImageCarousel from './components/Carousel.js';
import Card from './components/Card.js';
import './components/css/main.css'

function Main() {
  return (
    <>
      <Layout>
        <div>
          <ImageCarousel/>
        </div>
      </Layout>
    </>
  );
}

export default Main;
