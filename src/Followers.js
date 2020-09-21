import React, { Component } from "react";
import axios from "axios";

export default class Instagram extends Component {
  state = {
    followers: [],
    name: "",
    src: "",
  };

  componentDidMount = async () => {
    const followers = await axios.get(
      `https://5f636146363f0000162d8949.mockapi.io/ra/v1/followers`
    );
    this.setState({ followers: followers.data }, () => {});
  };
  handleOnClick = async () => {
    const newAvatar = await axios.post(
      `https://5f636146363f0000162d8949.mockapi.io/ra/v1/followers?`,
      { name: this.state.name, avatar: this.state.src }
    );
    this.setState(
      (prevState) => ({
        followers: [...prevState.followers, newAvatar.data],
      }),
      () => {
        console.log(this.state);
      }
    );
  };
  deleteAvatar = async (e) => {
    const id = e.target.parentElement.parentElement.getAttribute("data-key");
    const deleteNode = await axios.delete(
      `https://5f636146363f0000162d8949.mockapi.io/ra/v1/followers/${id}`
    );
    const followers = await axios.get(
      `https://5f636146363f0000162d8949.mockapi.io/ra/v1/followers`
    );
    this.setState({ followers: followers.data }, () => {});
  };
  updateAvatar = async (e) => {
    console.log(e.target.parentElement.parentElement);
    document.querySelector(".followersName").style.display = "none";
    document.querySelector(".editInput").style.display = "block";
    document.querySelector(".editunputBTN").style.display = "block";
  };
  updateAvatarFromInput = async (e) => {
    console.log(document.querySelector(".editInput").value);
    const name = document.querySelector(".editInput").value;
    const id = e.target.parentElement.parentElement.getAttribute("data-key");
    // console.log(id);
    await axios.put(
      `https://5f636146363f0000162d8949.mockapi.io/ra/v1/followers/${id}`,
      { name: name }
    );
    const followers = await axios.get(
      `https://5f636146363f0000162d8949.mockapi.io/ra/v1/followers`
    );
    this.setState({ followers: followers.data }, () => {});
    document.querySelector(".followersName").style.display = "block";
    document.querySelector(".editInput").style.display = "none";
    document.querySelector(".editunputBTN").style.display = "none";
  };
  render() {
    const myFollowers = this.state.followers.map((element) => {
      return (
        <div className="followers" data-key={element.id} key={element.id}>
          <img src={element.avatar}></img>
          <div className="followersName">{element.name}</div>
          <div className="editAvatarName">
            <input className="editInput" type="text"></input>
            <button
              className="editunputBTN"
              onClick={this.updateAvatarFromInput}
            >
              Boom
            </button>
          </div>

          <div className="tools">
            <button onClick={this.deleteAvatar}>trash</button>
            <button onClick={this.updateAvatar}>edit</button>
          </div>
        </div>
      );
    });
    return (
      <div>
        <p className="followersTitle">My followers</p>
        <form>
          <label>
            Name:
            <input
              type="text"
              onChange={(e) => this.setState({ name: e.target.value })}
            ></input>
          </label>
          <label>
            SRC:
            <input
              type="text"
              onChange={(e) => this.setState({ src: e.target.value })}
            ></input>
          </label>
        </form>
        <button onClick={this.handleOnClick}>Add follower</button>
        {myFollowers}
      </div>
    );
  }
}
