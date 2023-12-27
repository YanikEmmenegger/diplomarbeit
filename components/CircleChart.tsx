import {FC, useState} from "react";
import {Flat} from "@alptugidin/react-circular-progress-bar";
import {twMerge} from "tailwind-merge";

interface CircleChartProps {
    percentage: number;
    max: number;
    current: number;
    heading: string;
    className: string
    strokeColor?: string;
    unit: string;
}

const CircleChart: FC<CircleChartProps> = ({percentage, strokeColor, heading, max, current, className, unit}) => {

    const [showPercentage, setShowPercentage] = useState<boolean>(max === 0);


    strokeColor = strokeColor ? strokeColor : "#3ecb00";

    const to = percentage > 100 ?percentage: 100;

    if (percentage > 100) {
        strokeColor = "#ff0000";
        //percentage = 100;
    }


    return (
        <div onClick={() => {
            setShowPercentage(!showPercentage)
        }} className={twMerge(" cursor-pointer outline-none mt-auto", className)}>
            <h1 className="text-white text-center text-xl mb-2">{heading}</h1>
            <Flat
                progress={percentage}
                range={{from: 0, to: to}}
                sign={{value: '%', position: 'end'}}
                text={!showPercentage && max !== 0 ? `${current}/${max}${unit}` : ''}
                showMiniCircle={false}
                showValue={showPercentage}
                sx={{
                    strokeColor: strokeColor,
                    barWidth: 10,
                    bgStrokeColor: '#ffffff',
                    bgColor: {value: '#1c1c1c', transparency: '20'},
                    shape: 'full',
                    strokeLinecap: 'round',
                    valueSize: 15,
                    valueWeight: 'normal',
                    valueColor: '#ffffff',
                    textSize: 13,
                    textWeight: 'normal',
                    textColor: '#ffffff',
                    loadingTime: 1000,
                    valueAnimation: true,
                    intersectionEnabled: true
                }}
            />
        </div>
    );
}

export default CircleChart;