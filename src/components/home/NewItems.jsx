import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from '../UI/Skeleton'
import "react-loading-skeleton/dist/skeleton.css";
import Countdown from "../UI/Countdown";

const NewItems = () => {
  const [item, setItem] = useState([])
  const [loading, setLoading] = useState([])

  async function fetchNewItems() {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
    setItem(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchNewItems()
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
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-in" data-aos-anchor-placement="top-bottom">New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading ? (
            new Array(1).fill(0).map((_, id) => (
              <OwlCarousel
                className="owl-rtl"
                {...options}
                key={id}>
                <div key={id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton borderRadius={50} height={50} width={50} />
                      <i className="fa fa-check"></i>
                    </div>

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Skeleton height="95%" width="100%" />
                    </div>
                    <div className="nft__item_info">
                      <h4>
                        <Skeleton height={20} width={100} />
                      </h4>
                      <div className="nft__item_price">
                        <Skeleton height={20} width={60} />
                      </div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>
                          <Skeleton height={20} width={50} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </OwlCarousel>
            ))

          ) : (
            <OwlCarousel {...options}>
                {item.map((_, id) => (
                  <div key={id}
                    data-aos="fade-in"
                    data-aos-anchor-placement="top-bottom"
                  >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${_.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={_.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                      </div>
                      {_.expiryDate != null && (
                        <div className="de_countdown">
                        <Countdown targetTime={_.expiryDate} />
                        </div>
                      )}

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={`/item-details/${_.nftId}`}>
                        <img
                          src={_.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${_.nftId}`}>
                        <h4>{_.title}</h4>
                      </Link>
                      <div className="nft__item_price">{_.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{_.likes}</span>
                      </div>
                    </div>
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

export default NewItems;
