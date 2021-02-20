import React, { Component } from "react";
import Jokes from "./Jokes";
import "./JokeList.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const BASE_URL = "https://icanhazdadjoke.com/";

export default class GetJokes extends Component {
  static defaultProps = {
    numToGetJokes: 10,
  };
  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
      isLoading: false,
    };

    // seenJokes for prevent the duplicate jokes
    this.seenJokes = new Set(this.state.jokes.text);

    this.handleClick = this.handleClick.bind(this);
  }

  //  after first render ... display 10 different jokes
  componentDidMount() {
    // window.localStorage.clear();
    if (this.state.jokes.length === 0) this.getJokes();
  }

  async getJokes() {
    try {
      let jokes = [];
      while (jokes.length < this.props.numToGetJokes) {
        let response = await axios.get(BASE_URL, {
          headers: {
            Accept: "application/json",
          },
        });
        const textJokes = response.data.joke;
        if (!this.seenJokes.has(textJokes)) {
          jokes.push({ joke: textJokes, votes: 0, id: uuidv4() });
        } else {
          console.log("DUPLICATED JOKES FOUND !!!");
          console.log(textJokes);
        }
      }
      this.setState(
        (st) => ({
          isLoading: false,
          jokes: [...st.jokes, ...jokes],
        }),
        () => {
          window.localStorage.setItem(
            "jokes",
            JSON.stringify(this.state.jokes)
          );
        }
      );
    } catch (error) {
      alert(error);
      this.setState({ isLoading: false });
    }
  }

  // handle vote method
  handleVotes(id, delta) {
    this.setState(
      (st) => ({
        jokes: st.jokes.map((j) => {
          return j.id === id ? { ...j, votes: j.votes + delta } : j;
        }),
      }),
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  }

  handleClick() {
    this.setState({ isLoading: true }, this.getJokes);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="JokeList-spinner">
          <i className="fas fa-9x fa-laugh fa-spin" />
          <h1 className="JokeList-title">Loading ... </h1>
        </div>
      );
    }

    const sortedJokes = this.state.jokes.sort((a, b) => b.votes - a.votes);
    const jokes = sortedJokes.map((joke) => {
      return (
        <Jokes
          upVote={() => this.handleVotes(joke.id, 1)}
          downVotes={() => this.handleVotes(joke.id, -1)}
          jokes={joke.joke}
          key={joke.id}
          votes={joke.votes}
        />
      );
    });
    return (
      <div className="JokeList">
        <div className="JokeList-Sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes
          </h1>
          <img
            src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
            alt="laugh"
          />
          <button className="JokeList-getmore" onClick={this.handleClick}>
            Fetch Jokes
          </button>
        </div>
        <div className="JokeList-Jokes">{jokes}</div>
      </div>
    );
  }
}
