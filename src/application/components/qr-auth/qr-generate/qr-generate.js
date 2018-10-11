import React, { Component } from "react";
import QRCode from 'qrcode';



class QRGenerate extends Component {

  async makeQRCode() {
    QRCode.toCanvas(document.getElementById('qr-canvas'), this.props.getCode(), (err) => {
      if (err) alert(err.toString()); // TODO: change
    })
  }

  render() {
    return (
      <div>
        <div>
          QR Generator
        </div>
        <div>
          <button onClick={() => this.makeQRCode()}>Generate QR Code</button>
        </div>
        <div>
          <canvas id="qr-canvas"></canvas>
        </div>
      </div>
    )
  }
}

export default QRGenerate;
