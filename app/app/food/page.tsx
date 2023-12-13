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


interface PageProps {
    searchParams: {
        productName: string;
    };
}

const Page: FC<PageProps> = ({searchParams}) => {

    const [loading, setLoading] = useState<Boolean>(false);
    const [loadingMore, setLoadingMore] = useState<Boolean>(false);

    const [foods, setFoods] = useState<Food[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [extended, setExtended] = useState<boolean>(false);
    const [limit, setLimit] = useState<number>(30);

    const [search, setSearch] = useState<string>("");


    useEffect(() => {
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
        if (search !== '') {
            fetchData();
        }
    }, [search, extended]);


    useEffect(() => {
        setExtended(false)
        if (searchParams.productName !== "") {
            setSearch(searchParams.productName);
        }
    }, [searchParams.productName]);

    return (
        <div>
            <div className="w-full flex justify-between mb-4">
                <SearchInput/>
                <BarcodeButton/>
            </div>
            <div>

                {
                    loading ? (<FoodItemSkeleton/>) :
                        (error ?
                                (<ErrorMessage errorCode={500} errorMessage={error}/>) :
                                (<div>
                                    <FoodTable foods={foods}/>
                                    {foods.length !== 0 &&
                                        (
                                            <>
                                                {loadingMore && <FoodItemSkeleton/>}
                                                <Button
                                                    className={twMerge("mb-10 text-xs md:text-base cursor-pointer", extended ? "hidden" : "block")}
                                                    onClick={() => {
                                                        setLimit(40)
                                                        setExtended(true)
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


