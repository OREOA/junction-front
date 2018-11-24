import axios from 'axios';

const URL = 'http://ec2-18-184-116-86.eu-central-1.compute.amazonaws.com:3001'

const userId = 9001

export function getStatisticsForOne() {
    return (axios.get(`${URL}/api/purchases/getDomesticRatio/9001`))
}

export function getStatisticsForAll() {
    return (axios.get(`${URL}/api/purchases/getDomesticRatioForAll`))
}
export function getStatisticsForAgeGroup(age) {
    return (axios.get(`${URL}/api/purchases/getDomesticRatioForAgeGroup/${age}`))
}

export function getProducts() {
    return axios.get(`${URL}/api/purchases/getDomesticRatio/${userId}`)
}

export function getChallenges() {
    return axios.get(`${URL}/api/challenges`)
}

export function getChallengeResults() {
    return axios.get(`${URL}/api/results/${'5bf976954dfb0d2170144be9'}`)
}
