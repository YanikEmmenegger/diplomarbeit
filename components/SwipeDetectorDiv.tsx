'use client'
import {FC, useState} from "react";
import {useRouter} from "next/navigation";

interface SwipeDivProps {
    children: React.ReactNode;
    rightSwipe: () => void;
    leftSwipe: () => void;
}

const SwipeDiv: FC<SwipeDivProps> = ({children, rightSwipe, leftSwipe}) => {
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)
    const minSwipeDistance = 100
    const onTouchStart = (e: any) => {
        setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX)
    }
    const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX)
    const router = useRouter();
    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        if (isLeftSwipe || isRightSwipe) {
            isLeftSwipe ? leftSwipe() : rightSwipe();
        }
    }
    return (
        <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            {children}
        </div>

    );
}

export default SwipeDiv;