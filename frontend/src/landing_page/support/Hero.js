import React from "react";

function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      <div className="p-5" id="supportWrapper">
        <h4>Support Portal</h4>
        <a href="">Track Tickets</a>
      </div>
      <div className="row p-5 m-3">
        <div className="col-6 p-5">
          <h1 className="fs-3 ">
            Search for answer or browse help topics to create a ticket
          </h1>
          <input placeholder="Eg. How do I activate F&O" /> <br />
          <a href="" className="me-3">Track account opening</a>
          <a href="" className="me-3">Track segment activation</a>
          <a href="" className="me-3">Intraday Margins</a>
          <a href="" className="me-3">Kite user manual</a>
        </div>
        <div className="col-6 p-5">
          <h1 className="fs-3 ">Featured</h1>
          <ol>
            <li className="mb-2">
              <a href="">Current takeovers and Delisting - January 2025</a>
            </li>
            <li>
              <a href="">Latest Intrady leverages - MIS & CO</a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;