import React from 'react';

function Hero() {
    return ( 
        <div className='container p-5 mb-5'>
            <div className='row text-center'>
                <img src='media/images/homeHero.png' alt='Hero Image' className='mb-5' />
                <h2 className='mt-5 text-muted'>Invest in everything</h2>
                <h5 className='text-muted mb-5 mt-2'>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</h5>
                <button className='p-1 btn btn-primary fs-5 mb-5' style={{width:"17%", margin: "0 auto"}}>Signup Now</button>
            </div>
            
        </div>
     );
}

export default Hero;