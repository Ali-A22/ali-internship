import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [sellers, setSellers] = useState([])
  const [loading, setLoading] = useState([])

  async function fetchTopsellers() {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
    setSellers(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchTopsellers()
    setLoading(true)
  }, [])


  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2
                data-aos="fade-in"
                data-aos-anchor-placement="top-bottom"
              >Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol
              className="author_list"
              data-aos="fade-in"
              data-aos-anchor-placement="top-bottom"
            >

              {loading ? (
                new Array(12).fill(0).map((_, id) => (
                  <li key={id}>
                    <div className="nft_skeleton">
                      <div className="author_list_pp">
                        <Link to="/author">
                          <Skeleton
                            borderRadius={50}
                            height={50}
                            width={50}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Skeleton height={20} width={100} />
                        <span>
                          <Skeleton height={20} width={40} />
                        </span>
                      </div>
                    </div>
                  </li>
                ))

              ) : (
                sellers.map((_, id) => (
                  <li key={id}
                  >
                    <div className="author_list_pp">
                      <Link to={`/author/${_.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={_.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${_.authorId}`}>{_.authorName}</Link>
                      <span>{_.price} ETH</span>
                    </div>
                  </li>
                ))
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
