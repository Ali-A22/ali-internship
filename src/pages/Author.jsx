import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from 'axios'
import Skeleton from "../components/UI/Skeleton";

const Author = () => {

  const [authorItems, setAuthorItems] = useState([])
  const [loading, setLoading] = useState([])
  const { authorId } = useParams();
  const [follow, setFollow] = useState(false)


  async function fetchAuthorItems() {
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
    setAuthorItems(data)
    setLoading(false)
  }

  function onFollow() {
    if (follow) {
      setFollow(false)
    } else {
      setFollow(true)
    }
  }


  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAuthorItems()
    setLoading(true)
  }, [])





  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {loading ? (
                  <div className="nft_skeleton">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <Skeleton
                            borderRadius={100}
                            height={150}
                            width={150}
                          />
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              <Skeleton height={24} width={200} />
                              <span className="profile_username">
                                <Skeleton height={16} width={100} />
                              </span>
                              <span id="wallet" className="profile_wallet">
                                <Skeleton height={16} width={250} />
                              </span>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <Skeleton height={40} width={150} />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (

                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={authorItems.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authorItems.authorName}
                            <span className="profile_username">@{authorItems.tag}</span>
                            <span id="wallet" className="profile_wallet">
                              {authorItems.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        {follow ? (
                          <>
                            <div className="profile_follower">{authorItems.followers + 1} followers
                            </div>
                            <Link to="#" className="btn-main" onClick={onFollow}>
                              Unfollow
                            </Link>
                          </>
                        ) : (
                          <>
                            <div className="profile_follower">
                              {authorItems.followers} followers
                            </div>
                            <Link
                              to="#"
                              className="btn-main"
                              onClick={onFollow}
                            >
                              Follow
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorItems={authorItems} loading={loading} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
