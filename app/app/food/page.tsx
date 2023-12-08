'use client'
import {FC, useCallback, useEffect, useState} from "react";
import {Food} from "@/types/types.db";
import SearchInput from "@/components/Food/SearchInput";
import BarcodeButton from "@/components/Food/BarcodeButton";

import FoodItemSkeleton from "@/components/Food/FoodItemSkeleton";
import ErrorMessage from "@/components/ErrorMessage";
import FoodTable from "@/components/Food/FoodTable";
import Button from "@/components/Button";
import {twMerge} from "tailwind-merge";
import axios from "axios";

interface PageProps {
    searchParams: {
        productName: string;
        extended?: boolean;
        mealType?: number;
    };
}

const Page: FC<PageProps> = ({searchParams}) => {
    const [loading, setLoading] = useState(false);
    const [foods, setFoods] = useState<Food[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [extended, setExtended] = useState<boolean>(false);
    const [limit, setLimit] = useState<number>(30);
    const [loadMore, setLoadMore] = useState<boolean>(false);


    const loadMoreData = () => {
        setLimit(limit + 10)
        setExtended(true)
    }
    const fetchFood = useCallback(async () => {
        extended ? setLoadMore(true) : setLoading(true);
        setError(null);

        if (searchParams.productName !== "") {
            try {
                const axiosResponse = await axios.get(
                    `/api/food?q=${searchParams.productName}&limit=${limit}&extended_search=${extended ? 1 : 0}`
                );
                if (axiosResponse.status !== 200) {
                    setError(axiosResponse.statusText);
                }
                setFoods(axiosResponse.data.results);
            } catch (e: any) {
                setError(e.message);
            }
        }

        setLoading(false);
        setLoadMore(false);
    }, [extended, limit, searchParams.productName]);

    useEffect(() => {
        extended && fetchFood()
    }, [extended, fetchFood, limit]);

    useEffect(() => {
        setExtended(searchParams.extended || false);
        setLimit(30)
        fetchFood().finally(() => {});
    }, [fetchFood, searchParams.extended, searchParams.productName]);

    return (
        <div>
            <div className="w-full flex justify-between mb-4">
                <SearchInput/>
                <BarcodeButton/>
            </div>

            {loading ? (
                <FoodItemSkeleton/>
            ) : error ? (
                <ErrorMessage errorCode={500} errorMessage={error}/>
            ) : foods.length === 0 ? (
                <h1>Keine Ergebnisse gefunden | Bitte Suchbegriff eingeben</h1>
            ) : (
                <>
                    <FoodTable foods={foods}/>
                    <Button className={twMerge("cursor-pointer text-sm mb-10", extended ? "hidden" : "block")}
                            onClick={loadMoreData}>mehr laden...</Button>
                    {loadMore && <FoodItemSkeleton/>}
                    <p className={twMerge("text-sm", loadMore ? "animate-pulse" : "hidden")}>loading....</p>
                </>
            )}

        </div>
    );
};

export default Page;
