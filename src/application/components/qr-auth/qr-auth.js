import React, { Component } from "react";
import QRCode from 'qrcode';
import Webcam from "react-webcam";
import QrReader from "react-qr-reader";

class QRAuth extends Component {

  constructor(props) {
    super(props)
    this.state = {

    };
  }

  handleScan(data) {
    this.setState({ data: data });
  }

  async makeQRCode() {
    let qrResult = await QRCode.toDataURL('Some Agent ID')
    console.log(qrResult)
    this.setState({ qrImg: qrResult });
  }



  render() {
    return (
      <div>
        <div onClick={() => this.makeQRCode()}>
          { this.state.data ? this.state.data : "not found"}
          <img src={`${this.state.qrImg}`} />
        </div>
        <QrReader
          delay={300}
          onError={(err) => alert(err.message)}
          onScan={(data) => this.handleScan(data)}
          style={{ width: "10%" }}
        />
      </div>
      
    );
  }
}

export default QRAuth;
