import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import BubbleChart from './components/bubbleChart';
import MatchesChart from './components/matchesChart';

class App extends Component {

    state ={
        match_data_array : [],
        team_data_array : [],
        formatted_data : {}
    }

    componentDidMount() {
        this.getAllData();
    }

    //Fetching data
    getAllData = async () => {
        let match_data = await axios.get('https://raw.githubusercontent.com/ajbitus/interview-tasks/master/epl-2011-12/matches.json');
        let teams_data = await axios.get('https://raw.githubusercontent.com/ajbitus/interview-tasks/master/epl-2011-12/teams.json');

        this.setState({ match_data_array: match_data['data']['rounds'], team_data_array: teams_data['data']['clubs'] }, () => {
            this.dataManipulation();
        });
    }

    //Manipulating data as per requirement
    dataManipulation = () => {

        const { match_data_array, team_data_array } = this.state;
        let team_data = {}

        team_data_array.forEach(t => {
            let teamName = t.key
            
            team_data[teamName] = {}
            team_data[teamName].name = t.name
            team_data[teamName].code = t.code
            team_data[teamName].own_score = 0
            team_data[teamName].against_score = 0
            team_data[teamName].total_win = 0
            team_data[teamName].total_loss = 0
            team_data[teamName].total_tie = 0
            team_data[teamName].total_matches = 0
            
            match_data_array.forEach(r => {
                r.matches.forEach(m => {
                    let is_team1 = m.team1.key === t.key
                    let is_team2 = m.team2.key === t.key
                    
                    if(is_team1 || is_team2) {
                        
                        team_data[teamName].total_matches += 1;
                        
                        let own_score = is_team1 ? m.score1 : m.score2;
                        let against_score = is_team1 ? m.score2 : m.score1;
                        
                        team_data[teamName].own_score += own_score;
                        team_data[teamName].against_score += against_score;
                        
                        if(own_score === against_score) {
                            team_data[teamName].total_tie += 1;
                        } else if (own_score>against_score) {
                            team_data[teamName].total_win += 1;
                        } else {
                            team_data[teamName].total_loss += 1;
                        }
                    }
                });
            });
        });

        this.setState({ formatted_data : team_data });
    }

    render() {
        const { formatted_data } = this.state;
        return (
            <div className="App">
                <div className="row">
                    <div className="col-md-12">
                        <h1>EPL Season 2011-12</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h2>1. Bubble Chart</h2>
                        <BubbleChart
                            formatted_data = {formatted_data}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h2>2. Matches Chart</h2>
                        <MatchesChart 
                            formatted_data = {formatted_data}
                        />
                    </div>
                </div>
            </div>
        );
    }

}

export default App;
