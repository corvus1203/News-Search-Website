import React, { Component } from "react";
import ResultCard from "./resultCard";
import Loading from "./loading";

class Favorite extends Component {
  componentDidMount() {
    this.props.toggleSwitch();
    const favorites = JSON.parse(localStorage.getItem("favorite")) || [];
    this.setState({ list: favorites });
  }

  onRemove = (id) => {
    let favorites = JSON.parse(localStorage.getItem("favorite"));
    for (let i = 0; i < favorites.length; i++) {
      const fav = favorites[i];
      if (fav.id === id) {
        favorites.splice(i, 1);
        break;
      }
    }
    if (favorites.length === 0) {
      favorites = [];
      localStorage.clear();
    } else {
      localStorage.setItem("favorite", JSON.stringify(favorites));
    }
    this.setState({ list: favorites });
  };

  renderContent = (list) => {
    if (list.length === 0) {
      return <p className="center-p">You have no saved articles</p>;
    }
    return list.map((fav) => (
      <ResultCard
        key={fav.id}
        onGetDetails={this.props.handleGetDetails}
        onShare={this.props.onShare}
        onRemove={this.onRemove}
        sectionClass={this.props.sectionClass}
        news={fav.data}
        favorite={true}
      />
    ));
  };

  state = { list: null };
  render() {
    const { list } = this.state;
    return (
      <React.Fragment>
        {list ? (
          list.length !== 0 ? (
            <h3 className="resultTitle">Favorites</h3>
          ) : (
            <React.Fragment />
          )
        ) : (
          <React.Fragment />
        )}
        <div className="cards-container">
          {list ? this.renderContent(list) : <Loading />}
        </div>
      </React.Fragment>
    );
  }
}

export default Favorite;
