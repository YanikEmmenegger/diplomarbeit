'use client'
import {FC, useEffect, useState} from "react";
import {Food} from "@/types/types.db";
import SearchInput from "@/components/Food/SearchInput";
import BarcodeButton from "@/components/Food/BarcodeButton";
import {searchFood} from "@/actions/searchFoodHandler";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/types/supabaseDatabaseTypes";
import FoodItemSkeleton from "@/components/Food/FoodItemSkeleton";
import ErrorMessage from "@/components/ErrorMessage";
import FoodTable from "@/components/Food/FoodTable";
import Button from "@/components/Button";
import {twMerge} from "tailwind-merge";

interface PageProps {
    searchParams: {
        productName: string;
        extended?: boolean;
        mealType?: number;
    };
}

const Page: FC<PageProps> = ({searchParams}) => {
    const supabase = createClientComponentClient<Database>()

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
    const fetchFood = async () => {
        extended ? setLoadMore(true) : setLoading(true);
        setError(null)
        const foods = await searchFood({
            productName: searchParams.productName || "",
            limit: limit,
            extended_search: extended
        }, supabase)
        if (foods instanceof Array) {
            setFoods(foods);
        } else {
            setError(foods.errorMessage!);
        }
        setLoading(false);
        setLoadMore(false)
    };
    useEffect(() => {
        extended && fetchFood()
    }, [extended, limit]);

    useEffect(() => {
        setExtended(searchParams.extended || false);
        setLimit(30)
        fetchFood()

    }, [searchParams.productName]);

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
                <h1>No food found</h1>
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
