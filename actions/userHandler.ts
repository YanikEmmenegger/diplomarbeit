import {User} from "@/types/types.db";
import axios from "axios";

const changeUserDetails = async (user: User) => {
    try {
        const axiosResponse = await axios.patch('/api/user/details', user);
        console.log(axiosResponse);
        return axiosResponse.data[0];
    } catch (e) {
        return e;
    }
}
const changeUserPlan = async (user:User) => {
    try {
        const axiosResponse = await axios.patch('/api/user/plan', user);
        console.log(axiosResponse);
    }catch (e)
    {
        return e;
    }
}

const addUserWeight = async (weight:number) => {
    try {
        const axiosResponse = await axios.post('/api/user/weight', weight);
        console.log(axiosResponse);
    }catch (e)
    {
        return e;
    }
}
const addUserHeight = async (height:number) => {
    try {
        const axiosResponse = await axios.post('/api/user/weight', height);
        console.log(axiosResponse);
    }catch (e)
    {
        return e;
    }

}
export {changeUserDetails, changeUserPlan, addUserWeight, addUserHeight}