import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import Countdown from "../UI/Countdown";

const ExploreItems = () => {

  const [exploreItems, setExploreItems] = useState([])
  const [loading, setLoading] = useState([])


  async function fetchExploreItems() {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
    setExploreItems(data)
    setLoading(false)
  }

  async function filterNFT(value) {
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${value}`)
    setExploreItems(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchExploreItems()
    filterNFT()
    setLoading(true)
  }, [])

  const imagePerRow = 4;
  const [next, setNext] = useState(8);

  const handleMoreImage = () => {
    setNext(next + imagePerRow);
  };


  return (
    <>
      <div>
        <div>
          <select
            id="filter-items"
            defaultValue="Default"
            onChange={(event) => filterNFT(event.target.value)}>
            <option value="">Default</option>
            <option value="price_low_to_high">Price, Low to High</option>
            <option value="price_high_to_low">Price, High to Low</option>
            <option value="likes_high_to_low">Most liked</option>
          </select>
        </div>
      </div>

      {loading ?
        new Array(8).fill(0).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <Skeleton width={306} height={400} />
          </div>
        )

        ) :
        exploreItems?.slice(0, next)?.map((_, id) => (
          <div
            key={id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${_.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
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
                  <img src={_.nftImage} className="lazy nft__item_preview" alt="" />
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


      <div className="col-md-12 text-center">
        {next < exploreItems?.length && (
          <Link to="" id="loadmore" className="btn-main lead" onClick={handleMoreImage}>
            Load more
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
