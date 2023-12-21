import {User} from "@/types/types.db";
import axios from "axios";

const changeUserDetails = async (user: User) => {
    //'name, firstname, gender, email'
    try {
        const axiosResponse = await axios.patch('/api/user/details', user);
        console.log(axiosResponse);
        return axiosResponse.data;
    } catch (e) {
        return e;
    }
}
const getUserDetails = async () => {
    //'name, firstname, gender, email'
    try {
        const axiosResponse = await axios.get('/api/user/details');
        console.log(axiosResponse);
        return axiosResponse.data;
    } catch (e) {
        return e;
    }
}
const changeUserPlan = async (user: User) => {
    try {
        const axiosResponse = await axios.patch('/api/user/plan', user);
        console.log(axiosResponse);
        return axiosResponse.data;
    } catch (e) {
        return e;
    }
}
const getUserPlan = async () => {
    try {
        const axiosResponse = await axios.get('/api/user/plan');
        console.log(axiosResponse);
        return axiosResponse.data;
    } catch (e) {
        return e;
    }
}

const addUserWeight = async (weight: number) => {
    try {
        const axiosResponse = await axios.post('/api/user/weight', weight);
        console.log(axiosResponse);
        return axiosResponse.data;
    } catch (e) {
        return e;
    }
}

const getUserWeight = async () => {
    try {
        const axiosResponse = await axios.get('/api/user/weight');
        console.log(axiosResponse);
    } catch (e) {
        return e;
    }
}

const addUserHeight = async (height: number) => {
    try {
        const axiosResponse = await axios.post('/api/user/weight', height);
        console.log(axiosResponse);
        return axiosResponse.data;
    } catch (e) {
        return e;
    }

}
const getUserHeight = async () => {
    try {
        const axiosResponse = await axios.get('/api/user/weight');
        console.log(axiosResponse);
        return axiosResponse.data;
    } catch (e) {
        return e;
    }
}

const getDiary = async (day: Date) => {
    try {
        const axiosResponse = await axios.get('/api/user/diary/' + day);
        console.log(axiosResponse);
        return axiosResponse.data;
    } catch (e) {
        return e;
    }
}


export {changeUserDetails, changeUserPlan, addUserWeight, addUserHeight, getUserDetails, getUserHeight, getUserPlan, getUserWeight, getDiary};