import React from 'react'
import MetaCreator from '../components/MetaCreator'

const Home = ({Link, title, language}) => {


        return (
            <div class="container">
                <MetaCreator title={title} description={language === "en" ? "Accountancy firm based in South London, providing support to small limited companies and sole traders. We offer payroll services, tax assistance, tax rebate, bookkeeping and more." : language === "lt" ? "Permokėtų mokesčių grąžinimas UK, verslo optimizacija, buhalterinės apskaitos sprendimai, padėsiantys didinti Jūsų imonės verte ir įgyvendinti verslo lūkesčius." : null}/>
                <div class="columns">
                    <div class="column">
                        <div className="container py-3">
                            { language === "en" ? <h2 className="title">Welcome to Mastis Accounting</h2> :
                              language === "lt" ? <h2 className="title">Sveiki atvykę į „Mastis Accounting“</h2> :
                              null
                            }
                        </div>
                        <div className="container py-1">
                            { language === "en" ? <h2 className="subtitle">We are an accountancy firm based in South London. We offer a wide range of specialist financial services for both businesses and individuals by delivering essential advice for your business in order to vastly improve your growth.</h2> :
                              language === "lt" ? <h2 className="subtitle">Mes esame apskaitos paslaugas teikianti įmonė, įsikūrusi Pietų Londone. Siūlome platų finansinių paslaugų spektrą tiek verslui, tiek privatiems asmenims. Teikiame svarbiausius patarimus jūsų verslui, kad galėtume efektyviai pagerinti jūsų įmonės finansinį augimą ir plėtrą. Padedame susigrąžinti permokėtus mokesčius.</h2> :
                              null
                            }
                         </div>
                        <div className="container py-1">
                            { language === "en" ? <h2 className="subtitle">For assistance with any of your accountancy, taxation and business support requirements please <strong><Link role="button" to="/contact">contact us</Link></strong></h2> :
                              language === "lt" ? <h2 className="subtitle">Jeigu jums reikia pagalbos dėl bet kokių apskaitos, mokesčių ir verslo paramos reikalavimų, <strong><Link role="button" to="/contact">susisiekite su mumis.</Link></strong></h2> :
                              null
                            }
                        </div>
                    </div>
                </div>
            </div>
          )
}

export default Home

