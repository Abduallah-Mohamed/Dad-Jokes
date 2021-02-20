import React, { Component } from "react";
import "./Jokes.css";

export default class Jokes extends Component {
  getColor() {
    if (this.props.votes >= 15) {
      return "#4caf50";
    } else if (this.props.votes >= 12) {
      return "#9ac34a";
    } else if (this.props.votes >= 9) {
      return "#cddc39";
    } else if (this.props.votes >= 6) {
      return "#ffeb3b";
    } else if (this.props.votes >= 3) {
      return "#ffc107";
    } else if (this.props.votes >= 0) {
      return "#ff9800";
    } else {
      return "#f44336";
    }
  }

  getEmoji() {
    if (this.props.votes >= 15) {
      return "em em-rolling_on_the_floor_laughing";
    } else if (this.props.votes >= 12) {
      return "em em-laughing";
    } else if (this.props.votes >= 9) {
      return "em em-smiley";
    } else if (this.props.votes >= 6) {
      return "em em-slightly_smiling_face";
    } else if (this.props.votes >= 3) {
      return "em em-neutral_face";
    } else if (this.props.votes >= 0) {
      return "em em-confused";
    } else {
      return "em em-angry";
    }
  }
  render() {
    return (
      <div className="Jokes">
        <div className="Jokes-btn">
          <i className="fas fa-arrow-up" onClick={this.props.upVote}></i>
          <span className="Jokes-vote" style={{ borderColor: this.getColor() }}>
            {this.props.votes}
          </span>
          <i className="fas fa-arrow-down" onClick={this.props.downVotes}></i>
        </div>
        <div className="Jokes-text">
          <h3>{this.props.jokes}</h3>
        </div>
        <div className="Jokes-smily">
          <i
            className={this.getEmoji()}
            aria-label="ROLLING ON THE FLOOR LAUGHING"
          ></i>
        </div>
      </div>
    );
  }
}
