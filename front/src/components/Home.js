import React, { useState } from 'react'


const Home = (props) => {

    const [likes , setLikes] = useState(0)


        return (
            <div class="container">
                <div class="columns">
                    <div class="column">
                        <div className="container">
                            <h2 className="title">Mastis.co.uk</h2>
                        </div>
                        <div className="container py-3">
                            <h2 className="subtitle">Accounting and consulting services in a simple way!</h2>
                        </div>
                        <div className="container py-6">
                            <h2 className="title">EFFICIENCY - OPTIMISATION - GROWTH</h2>
                        </div>
                    </div>

                </div>
                
            </div>
          )
}

export default Home


//kazka daryti su db nes matosi jinai realiu laiku 