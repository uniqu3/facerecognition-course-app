import React from 'react';

class Rank extends React.Component {
  state = {
    emoji: '',
  };

  componentDidMount() {
    this.generateEmoji(this.props.entries);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.entries === this.props.entries) return null;

    this.generateEmoji(this.props.entries);
  }

  generateEmoji = (entries) => {
    const emojis = ['😄', '😃', '😀', '😊', '😉', '😍', '🔶', '🔷', '🚀'];
    const rank = this.props.entries;
    const rankEmoji = emojis[rank >= emojis.length ? emojis.length - 1 : rank];

    this.setState({ emoji: rankEmoji });
    //fetch(
    //  `https://7dhi4h5htd.execute-api.us-east-1.amazonaws.com/prod/rank/rank=${entries}`
    //)
    //  .then((response) => response.json())
    //  .then((data) => this.setState({ emoji: data.input }))
    //  .catch((error) => console.log(error));
  };

  render() {
    return (
      <div>
        <div className='white f3'>
          {`${this.props.name}, your current entry count is...`}
        </div>
        <div className='white f1'>{this.props.entries}</div>
        <div className='white f3'>Rank Badge: {this.state.emoji}</div>
      </div>
    );
  }
}

export default Rank;
