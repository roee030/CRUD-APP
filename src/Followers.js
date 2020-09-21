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
    console.log(e.target.key);
  };
  render() {
    const myFollowers = this.state.followers.map((element) => {
      return (
        <div className="followers" key={element.id}>
          <img src={element.avatar}></img>
          {element.name}
          <button onClick={this.deleteAvatar}>trash</button>
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
