import React, { Component } from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, RadialChart} from 'react-vis';
import Header from './Header'
import { getStatisticsForAll, getStatisticsForAgeGroup } from "../helpers/utils";

class Home extends Component {

    constructor() {
        super()
        this.state = {
            selectedCompare: '18-24',
            ageGroupData: null,
            countryData: null,
            ready: false,
        }
    }

    componentDidMount() {
        this.getStatsForAll()
        this.getStatsForAgeGroup()
    }

    getStatsForAll = () => {

    }

    getStatsForAgeGroup = () => {
        const that = this;

        getStatisticsForAll()
            .then(function (response) {
                // handle success
                console.log(response.data);
                const value = response.data * 10
                that.setState({
                    countryData: [{angle: value, color: '#ec732f', label: `${(value * 10).toFixed(1)}%`}, {angle: 10-value, color: '#f88c20'}],
                    ready: true,
                })
            })
            .catch(function (error) {
                that.setState = {
                    error: error,
                }
            })
            .then(function () {
                // always executed
            });

        getStatisticsForAgeGroup(this.state.selectedCompare)
            .then(function (response) {
                // handle success
                console.log(response.data);
                const value = response.data * 10
                that.setState({
                    ageGroupData: [{angle: value, color: '#ec732f', label: `${(value * 10).toFixed(1)}%`}, {angle: 10-value, color: '#f88c20'}],
                    ready: true,
                })
            })
            .catch(function (error) {
                that.setState = {
                    error: error,
                }
            })
            .then(function () {
                // always executed
            });
    }

    handleSelect = (e) => {
        this.setState({
            selectedCompare: e.target.value,
        }, this.getStatsForAgeGroup(e.target.value))
    }


    render() {
        const myData = [{angle: 2, color: '#ec732f'}, {angle: 8, color: '#f88c20'}]
        return (
            <div className="App">
                <div className="content">
                    <div className={'card'}>
                        <p>How you have eaten in last 30 days</p>
                        <RadialChart className={'chart'}
                                     data={myData}
                                     animation
                                     width={180}
                                     height={180}
                                     colorType={'literal'}
                                     showLabels={true}
                        />
                        <div className={'explanations'}>
                            <div className="explanation-container">
                                <div className='square1'></div>
                                <p className='explanation-text' >Local food</p>
                            </div>
                            <div className="explanation-container">
                                <div className='square2'></div>
                                <p className='explanation-text'>Non local food</p>
                            </div>
                        </div>


                    </div>
                    <div className={'card'}>
                        <p>Select comparable group</p>
                        <select className='dropdown' onChange={this.handleSelect}>
                            <option value="18-24">18-24</option>
                            <option value="25-34">25-34</option>
                            <option value="35-44">35-44</option>
                            <option value="45-54">45-54</option>
                            <option value="Finland">Finland</option>
                        </select>
                        {this.state.ready && this.state.ageGroupData !== null && this.state.countryData !== null && (
                            <RadialChart className={'chart'}
                                         data={this.state.selectedCompare !== 'Finland' ? this.state.ageGroupData : this.state.countryData}
                                         animation
                                         width={250}
                                         height={250}
                                         colorType={'literal'}
                                         showLabels={true}
                            />

                        )}
                        <div className={'explanations'}>
                            <div className="explanation-container">
                                <div className='square1'></div>
                                <p className='explanation-text' >Local food</p>
                            </div>
                            <div className="explanation-container">
                                <div className='square2'></div>
                                <p className='explanation-text'>Non local food</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
