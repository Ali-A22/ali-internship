import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Skeleton from'../UI/Skeleton'
import "react-loading-skeleton/dist/skeleton.css";

const HotCollections = () => {
  const [collection, setCollection] = useState([])
  const [loading, setLoading] = useState([])

  async function fetchData() {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
    setCollection(data)
    setLoading(false)
  }

useEffect(()=> {
  fetchData()
  setLoading(true)
}, [])



const options = {
  loop: true,
  margin: 10,
  nav: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    900: {
      items: 3,
    },
    1200: {
      items: 4,
    },
  },
};



return (
  <section id="section-collections" className="no-bottom">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>Hot Collections</h2>
            <div className="small-border bg-color-2"></div>
          </div>
        </div>
        {loading ? (
          new Array(1).fill(0).map((_, id) => (
            <OwlCarousel
              className="owl-rtl"
              {...options}
              key={id}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Skeleton height="100%" width="100%" />
                </div>
                <div className="nft_coll_pp">
                  <Skeleton height={50} width={50} borderRadius={50} />
                  <i className="fa fa-check" style={{ zIndex: 1 }}></i>
                </div>
                <div className="nft_coll_info">
                  <Skeleton height={20} width={100} />
                  </div>
                  <div>
                  <Skeleton height={20} width={60} />  
                  </div>
              </div>
              </OwlCarousel>
          ))
          
          ) : (    
            <OwlCarousel {...options}>
                {collection.map((_, id) => (
                  <div className="nft_coll" key={id}>
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={_.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={_.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                    <Link to="/explore">
                    <h4>{_.title}</h4>
                    </Link>
                    <span>ERC-{_.code}</span>
                    </div>
                    </div>
                    ))}
                    </OwlCarousel>
            )}
            </div>
            </div>
  </section>
);
};

export default HotCollections;