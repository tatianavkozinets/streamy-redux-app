import React, { useEffect, useRef } from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

const StreamShow = props => {
  const videoRef = React.useRef();
  const { id } = props.match.params;
  let player = null;

  useEffect(() => {
    console.log("componentDidMount");
    props.fetchStream(id);
  }, []);

  useEffect(() => {
    console.log("componentDidUpdate");
    buildPlayer();
    return () => {
      console.log("I was unmounted");
      player.destroy();
    };
  });

  const buildPlayer = () => {
    if (player || !props.stream) {
      return;
    }

    player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`
    });
    player.attachMediaElement(videoRef.current);
    player.load();
  };

  if (!props.stream) {
    return (
      <div>
        <video ref={videoRef} style={{ width: "100%" }} controls={true} />
        Loading...
      </div>
    );
  }

  return (
    <div>
      <video ref={videoRef} style={{ width: "100%" }} controls={true} />
      <h1>{props.stream.title}</h1>
      <h5>{props.stream.description}</h5>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);

/*
import React from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    console.log("componentDidMount");
    const { id } = this.props.match.params;

    this.props.fetchStream(id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
    this.buildPlayer();
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    this.player.destroy();
  }

  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }

    const { id } = this.props.match.params;
    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    const { title, description } = this.props.stream;

    return (
      <div>
        <video ref={this.videoRef} style={{ width: "100%" }} controls />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);

*/
