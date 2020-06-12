import React, { Component } from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import Charts from './Charts';
import CandidatesComponent from './Candidate/CandidatesComponent';
import CandidateComponent from './Candidate/CandidateComponent';
import Tabs from "./Tabs";
import glamorous from "glamorous";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class Main extends Component {
    render() {
        return (
		<div>
		<h1>Candidate Management App</h1>
			<BrowserRouter>
			<>
				<div style={styles}>
				<Tabs
				  activeTab={{
					id: "dashboard"
				  }}
				>
				  <Tabs.Tab id="dashboard" title="Dashboard">
					<glamorous.Div padding={20}>
						<Switch>
							<Route path="/" component={Charts} />
						</Switch>
					</glamorous.Div>
				  </Tabs.Tab>
				  <Tabs.Tab id="candidates" title="Candidates">
					<glamorous.Div padding={20}>
						<Switch>
						<Route path="/" exact component={CandidatesComponent} />
                        <Route path="/candidates/:id" component={CandidateComponent} />
                    </Switch>
					</glamorous.Div>
				  </Tabs.Tab>
				</Tabs>
			</div>  
			</>
		</BrowserRouter>
				
		  </div>
		);
    }
}

export default Main
