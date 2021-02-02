import React from 'react'
import MetaCreator from '../components/MetaCreator'

const Home = ({Link, title}) => {


        return (
            <div class="container">
                <MetaCreator title={title} description="We are accountancy firm based in South London, Mitcham"/>
                <div class="columns">
                    <div class="column">
                        <div className="container py-3">
                            <h2 className="title">Welcome to Mastis Accounting</h2>
                        </div>
                        <div className="container py-1">
                            <h2 className="subtitle">We are accountancy firm based in South London, Mitcham. We offer wide range of specialist financial services for businesses and individuals. </h2>
                        </div>
                        <div className="container py-1">
                            <h2 className="subtitle">We will deliver essential advice for your business in order to improve your growth.</h2>
                        </div>
                        <div className="container py-1">
                            <h2 className="subtitle">For assistance with any of your accountancy, taxation and business support requirements please <strong><Link role="button" dissabled to="/contact">contact us</Link></strong></h2>
                        </div>
                    </div>

                </div>
                
            </div>
          )
}

export default Home


//kazka daryti su db nes matosi jinai realiu laiku 