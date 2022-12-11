import React from "react";

class SecondResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.dataParentToChild
    }
  }

  render() {
    return (
      <>
        <div className="FirstTab">
          <div className="result">
            효율점수:{this.state.data}
          </div>
        </div>
      </>
    );
  }
}

export default SecondResult;
