import React from "react";


function Universe() {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1>The SureTrade Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
      </div>
      <div className="row">
        <div className="col-4 p-3 mt-5 text-center">
          <img src="media/images/smallcaseLogo.png" style={{width: "50%"}}/>
          <p className="text-muted mt-3" style={{fontSize: "0.85rem"}}>
            Thematic investing platform that helps you invest in diversified
            baskets of stocks on ETFs.
          </p>
        </div>
        <div className="col-4 p-3 mt-5 text-center">
          <img src="media/images/streakLogo.png" style={{width: "42%"}}/>
          <p className="text-muted mt-3" style={{fontSize: "0.85rem"}}>
            Systematic trading platform that allows you to create and backtest
            strategies without coding.
          </p>
        </div>
        <div className="col-4 p-3 mt-5 text-center">
          <img src="media/images/sensibullLogo.svg" className="mb-3" style={{width: "50%"}}/>
          <p className="text-muted mt-3" style={{fontSize: "0.85rem"}}>
            Options trading platform that lets you create strategies, analyze
            positions, and examine data points like open interest, FII/DII, and
            more.
          </p>
        </div>
        <div className="col-4 p-3 mt-5 text-center">
          <img src="media/images/zerodhaFundhouse.png" style={{width: "40%"}}/>
          <p className="text-muted mt-3" style={{fontSize: "0.85rem"}}>
            Our asset management venture that is creating simple and transparent
            index funds to help you save for your goals.
          </p>
        </div>
        <div className="col-4 p-3 mt-5 text-center">
          <img src="media/images/tijoriLogo.png" style={{width: "35%"}}/>
          <p className="text-muted mt-3" style={{fontSize: "0.85rem"}}>
            Investment research platform that offers detailed insights on
            stocks, sectors, supply chains, and more.
          </p>
        </div>
        <div className="col-4 p-3 mt-5 text-center">
          <img src="media/images/dittoLogo.png" style={{width: "30%"}}/>
          <p className="text-muted mt-3" style={{fontSize: "0.85rem"}}>
            Personalized advice on life and health insurance. No spam and no
            mis-selling.
          </p>
        </div>
      </div>
      <div className="text-center">
        <button
          className="p-1 btn btn-primary fs-5 mb-5"
          style={{ width: "17%", margin: "0 auto" }}
        >
          Signup Now
        </button>
      </div>
    </div>
  );
}

export default Universe;