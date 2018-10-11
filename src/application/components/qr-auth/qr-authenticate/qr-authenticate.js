import React, { Component } from "react";
import QrReader from "react-qr-reader";

class QRAuthenticate extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: "not found"
    };
  }
  

  handleScan(data) {
    if (data) {
      this.props.onQRData(data);
      this.setState({ data: data });
    } else {
      this.setState({ data: "not found" });
    }
  }

  handleReaderError(err) {
    console.log(err.toString())
  }



  render() {
    return (
      <div>
        <QrReader
          delay={500}
          onError={this.handleReaderError}
          onScan={(data) => this.handleScan(data)}
          style={this.props.styles}
          />
      </div>
      
    );
  }
}

export default QRAuthenticate;
