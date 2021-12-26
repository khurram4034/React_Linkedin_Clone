import { useState, useEffect } from "react";
import styled from "styled-components";
import { FcStackOfPhotos, FcVideoCall } from "react-icons/fc";
import { BsCalendarEvent, BsHandThumbsUp } from "react-icons/bs";
import { MdOutlineArticle, MdWavingHand } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import { BiLike, BiComment } from "react-icons/bi";
import { RiSendPlaneFill, RiShareForwardLine } from "react-icons/ri";
import ReactPlayer from "react-player";
import PostModal from "./PostModal";
import { connect } from "react-redux";
import { getArticlesAPI } from "../actions";

const Main = (props) => {
  const [showModel, setShowModel] = useState("close");

  useEffect(() => {
    props.getArticles();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModel) {
      case "open":
        setShowModel("close");
        break;

      case "close":
        setShowModel("open");
        break;
      default:
        setShowModel("close");
        break;
    }
  };

  return (
    <>
      {props.articles.length === 0 ? (
        <p>There is no articles</p>
      ) : (
        <Container>
          <ShareBox>
            <div>
              {props.user && props.user.photoURL ? (
                <img src={props.user.photoURL} alt="" />
              ) : (
                <img src="./images/user.svg" alt="" />
              )}
              <button
                onClick={handleClick}
                disabled={props.loading ? true : false}
              >
                Create a new post
              </button>
            </div>
            <div>
              <button>
                <FcStackOfPhotos className="img" />
                <span>Photo</span>
              </button>

              <button>
                <FcVideoCall className="img" />
                <span>Video</span>
              </button>

              <button>
                <BsCalendarEvent className="img1" />
                <span>Event</span>
              </button>

              <button>
                <MdOutlineArticle className="img2" />
                <span>Write article</span>
              </button>
            </div>
          </ShareBox>

          <Content>
            {props.loading && <img src="./images/spiner.gif" alt="" />}
            {props.articles.length > 0 &&
              props.articles.map((article, key) => (
                <Article key={key}>
                  <SharedActor>
                    <a>
                      <img src={article.actor.image} alt="" />
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>
                          {article.actor.date.toDate().toLocaleDateString()}
                        </span>
                      </div>
                    </a>
                    <button>
                      <FiMoreHorizontal />
                    </button>
                  </SharedActor>
                  <Description>{article.description}</Description>
                  <SharedImg>
                    <a>
                      {!article.SharedImg && article.video ? (
                        <ReactPlayer width={"100%"} url={article.video} />
                      ) : (

                        article.sharedImg && <img src={article.sharedImg} />
                        
                      )}
                    </a>
                  </SharedImg>
                  <SocialCounts>
                    <li>
                      <button>
                        <BsHandThumbsUp />
                        <MdWavingHand />
                        <span>75</span>
                      </button>
                    </li>
                    <li>
                      <a>{article.comments}</a>
                    </li>
                  </SocialCounts>

                  <SocialActions>
                    <button>
                      <BiLike />
                      <span>Like</span>
                    </button>
                    <button>
                      <BiComment />
                      <span>Comments</span>
                    </button>
                    <button>
                      <RiShareForwardLine />
                      <span>Share</span>
                    </button>
                    <button>
                      <RiSendPlaneFill />
                      <span>Send</span>
                    </button>
                  </SocialActions>
                </Article>
              ))}
          </Content>

          <PostModal showModel={showModel} handleClick={handleClick} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgba(0 0 0 / 15%), 0 0 0 rgba(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0 0 0 0, 0.6);
      font-size: 18px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }

    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        .img {
          margin: 0 6px 0 -2px;
          font-size: 28px;
        }
        .img1 {
          margin: 0 6px 0 -2px;
          font-size: 20px;
          color: orange;
        }

        .img2 {
          margin: 0 6px 0 -2px;
          font-size: 28px;
          color: rgb(236, 117, 47);
        }
      }
      span {
        color: #70b5f9;
        font-size: 15px;
        font-weight: 500;
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }

        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
    font-size: 22px;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;

  li {
    margin-right: 5px;
    font-size: 12px;
    display: flex;
    text-align: center;
    margin-top: auto;
    margin-bottom: auto;
    button {
      display: flex;
      border: none;
      background-color: white;
    }
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #0a66c2;
    margin-left: 5px;
    font-size: 14px;

    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 50px;
  }
`;

const mapStateToProps = (state) => {
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    articles: state.articleState.articles,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
