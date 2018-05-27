import React, { Component } from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';

import site from './siteScaffold.js';

import Layout from './components/page/layout.jsx';
import Content from './components/page/content.jsx';
import Header from './components/header/index.jsx';
import Footer from './components/page/footer.jsx';
import Opener from './components/page/opener.jsx';
import Home from './components/home/index.jsx';
import CompanyProfile from './components/company/index.jsx';
import About from './components/about/index.jsx';
import Styles from './app.css';
import './css/normalize.css';
import './css/base.css';
import Routes from './routes.js';



class App extends Component {
   constructor(props){
      super(props)
      this.state = {
         ...props,
         width: '100%',
         routes: Routes,
         route: props.history.location.pathname
      };
   }
   componentWillReceiveProps(nextProps){
      if (this.props.history !== nextProps.history){
         this.changeRoute() 
      }
   }
   render () {
      return (
            <Layout>  
               <div style={{zIndex: 2}}>
                  <Header />
                     <Content>
                        <Switch>
                           <Route exact path={"/"}>
                              <Home>
                                 <Opener opener={["Cartels; market domination is good for business."]} />
	      			<CompanyProfile />
                              </Home>
                           </Route>
                           <Route path="/about">
                              <About content={site.about}/>
                           </Route>
                        </Switch>
                     </Content>
                  <Footer owner={site.owner} />
               </div>
            </Layout>
      )
   }
};
export default withRouter(App);
