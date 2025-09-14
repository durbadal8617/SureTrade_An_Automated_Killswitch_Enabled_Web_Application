import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mb-3 mt-5 border-top">
        <h1 className="text-center">People</h1>
      </div>

      <div
        className="row p-3 text-muted mb-5"
        style={{ lineHeight: "1.8", fontSize: "1.1em" }}
      >
        <div className="col-6 p-3 d-flex flex-column align-items-center justify-content-center text-center">
          <img
            src="media/images/founder.jpg"
            style={{ borderRadius: "100%", width: "35%" }}
          />
          <h5 className="mt-5">Durbadal Bhowmik</h5>
          <h6>Founder, CEO</h6>
        </div>
        <div className="col-6 p-3">
          <p>
            Durbadal bootstrapped and founded SureTrade in 2022 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            SureTrade has changed the landscape of the Indian broking industry.
          </p>
          <p>
            He is a member of the SEBI Secondary Market Advisory Committee (SMAC)
            and the Market Data Advisory Committee (MDAC).
          </p>
          <p>
            Connect on{" "}
            <a style={{ textDecoration: "none" }} href="">
              Homepage
            </a>{" "}
            /{" "}
            <a style={{ textDecoration: "none" }} href="">
              TradingQnA
            </a>{" "}
            /{" "}
            <a style={{ textDecoration: "none" }} href="">
              Twitter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
