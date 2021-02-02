import React from "react";
import { fetchStream } from "../actions";
import { connect } from "react-redux";

const TestUseEffect = props => {
  console.log(props)
  React.useEffect(() => {
    console.log("this is effect mount 1");
    props.fetchStream(1);
    return () => {
      console.log("this is effect unmount 1");
    };
  }, []);

  React.useEffect(() => {
    console.log("this is effect mount 2");
    return () => {
      console.log("this is effect unmount 2");
    };
  });

  console.log('Here')
  return <>{props.stream.title}</>;
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(TestUseEffect);

/*
import React, { useEffect, useRef } from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

const StreamShow = props => {
  const videoRef = React.useRef();
  const { id } = props.match.params;
  let player = null;

  useEffect(() => {
    props.fetchStream(id);
  }, []);

  useEffect(() => {
    buildPlayer();
    console.log("here");
    return () => {
      console.log("I was unmounted");
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

 */
