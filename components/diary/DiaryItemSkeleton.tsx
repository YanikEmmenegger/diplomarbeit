import {FC} from "react";
import Image from "next/image";
import {twMerge} from "tailwind-merge";

interface DiaryItemSkeletonProps {
    animate?: boolean;
}

const DiaryItemSkeleton: FC<DiaryItemSkeletonProps> = ({animate}) => {
    return (
        <li className={twMerge("flex my-4", animate? "animate-pulse": "")}>
            <div className="flex items-center gap-x-4 w-full mx-3">
                <div

                    className={twMerge("h-12 w-12 p-2 transition-opacity flex-none rounded-full bg-gray-50 opacity-50")}

                />
                <div className="w-full flex-row">
                    <p className="text-sm font-semibold leading-1 rounded-lg text-gray-100 bg-gray-50 opacity-50 text-ellipsis">.............</p>
                </div>
            </div>
        </li>
    );
}

export default DiaryItemSkeleton;