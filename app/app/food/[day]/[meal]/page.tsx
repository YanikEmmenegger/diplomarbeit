'use client'
import {FC, useEffect, useState} from "react";
import SearchInput from "@/components/Food/SearchInput";
import BarcodeButton from "@/components/Food/BarcodeButton";
import FoodItemSkeleton from "@/components/Food/FoodItemSkeleton";
import ErrorMessage from "@/components/ErrorMessage";
import FoodTable from "@/components/Food/FoodTable";
import {Food} from "@/types/types.db";
import Button from "@/components/Button";
import {twMerge} from "tailwind-merge";
import axios from "axios";
import {useRouter} from "next/navigation";


interface PageProps {
    searchParams: {
        productName: string;
    },
    params: {
        day: string;
        meal: string;
    }
}

const Page: FC<PageProps> = ({searchParams, params}) => {

    const date = params.day;

    //meal to number
    const meal = parseInt(params.meal);
    //create regex for date format like 2023-12-31
    const dateRegex = new RegExp('^\\d{4}-\\d{2}-\\d{2}$');

    //create regex for meal it can be 1,2,3,4
    const mealRegex = new RegExp('^[1-4]$');

    const router = useRouter();


    const [loading, setLoading] = useState<Boolean>(false);
    const [loadingMore, setLoadingMore] = useState<Boolean>(false);

    const [foods, setFoods] = useState<Food[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [extended, setExtended] = useState<boolean>(false);
    const [limit, setLimit] = useState<number>(30);

    const [search, setSearch] = useState<string>("");

    //const [initialEffect, setInitialEffect] = useState<boolean>(true);


    useEffect(() => {

        if (!dateRegex.test(date) || !mealRegex.test(String(meal))) {
            const url = "/app/food/" + new Date().toISOString().slice(0, 10) + "/1";
            router.push(url);
        }

        const fetchData = async () => {
            extended ? setLoadingMore(true) : setLoading(true);
            setError(null);

            try {
                const axiosResponse = await axios.get(
                    `/api/food?q=${search}&limit=${limit}&extended_search=${extended ? 1 : 0}`
                );
                if (axiosResponse.status !== 200) {
                    setError(axiosResponse.statusText);
                }
                setFoods(axiosResponse.data.results);
                setLoading(false);
                setLoadingMore(false)
            } catch (e: any) {
                setError(e.message);
            }

        }
        if (search !== '' && search !== undefined) {
            fetchData();
        }
    }, [search, extended, limit]);


    useEffect(() => {
        setExtended(false)
        if (searchParams.productName !== "" && searchParams.productName !== undefined) {
            console.log("searchParams.productName", searchParams.productName)
            setSearch(searchParams.productName);
        }
    }, [searchParams.productName]);

    return (
        <div>
            <div className="w-full flex justify-between mb-4">
                <SearchInput date_meal={date + "/" + meal}/>
                <BarcodeButton/>
            </div>
            <div>

                {
                    loading ? (<FoodItemSkeleton/>) :
                        (error ?
                                (<ErrorMessage errorCode={500} errorMessage={error}/>) :
                                (<div>
                                    <FoodTable date={date} meal={meal} foods={foods}/>
                                    {foods.length !== 0 &&
                                        (
                                            <>
                                                {loadingMore && <FoodItemSkeleton/>}
                                                <Button id={"food-btn-loadmore"}
                                                    className={twMerge("mb-10 text-xs md:text-base cursor-pointer", extended ? "hidden" : "block")}
                                                    onClick={() => {
                                                        setExtended(true)
                                                        setLimit(40)
                                                    }}>mehr laden...</Button>
                                            </>
                                        )
                                    }
                                </div>)
                        )
                }
            </div>
        </div>
    );
};

export default Page;


