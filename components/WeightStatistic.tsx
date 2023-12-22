'use client'
import {FC, useEffect, useState} from "react";
import {Weight} from "@/types/types.db";
import {XAxis, YAxis, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip} from "recharts";
import axios from "axios";


interface WeightStatisticProps {

}

const WeightStatistic: FC<WeightStatisticProps> = ({}) => {


    const [loadingWeight, setLoadingWeight] = useState<boolean>(true);
    const [weights, setWeights] = useState<Weight[]>([]);

    const fetchWeights = async () => {
        try {
            const response = await axios.get("/api/user/weight")
            setWeights(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }
    useEffect(() => {
        fetchWeights().finally(() => setLoadingWeight(false));
    }, []);


    const LoadingOrChart = () => {
        if (loadingWeight) {
            return <div className="text-center">Loading...</div>
        } else {

            if (weights.length === 1) {
                weights.push({weight: weights[0].weight, created_at: new Date().toDateString()})
            }
            return (
                <div className={" w-[100%] relative -left-2"}>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart width={600} height={300} data={weights}
                                   margin={{top: 5, right: 20, bottom: 5, left: 0}}>
                            <Line type="monotone" dataKey="weight" stroke="#3ecb00" activeDot={{r: 8}}/>
                            <CartesianGrid stroke=""/>
                            <XAxis dataKey="a"/>
                            <YAxis/>
                            <Tooltip contentStyle={{background: "black", border: 0}} label={"name"}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )
        }
    }
    return (
        <div className=''>
            <LoadingOrChart/>
        </div>
    );
}
export default WeightStatistic;

