'use client'

import {useRouter} from "next/navigation";
import {FC, useEffect, useState} from "react";
import useDebounce from "@/hooks/useDebouncer";

import qs from "query-string"
import Input from "@/components/Input";

interface SearchInputProps {
    date_meal: string;
}

const SearchInput: FC<SearchInputProps> = ({date_meal}) => {

    const router = useRouter()
    const [value, setValue] = useState<string>("")
    const deboundedValue = useDebounce<string>(value, 500);

    useEffect(() => {
        const query = {
            productName: deboundedValue,
        }

        const url = qs.stringifyUrl({
            url: '/app/food/' + date_meal,
            query: query
        })
        router.push(url)
    }, [deboundedValue, router]);

    return (
        <Input placeholder="Enter Foodname or Brand? " value={value} onChange={(e) => setValue(e.target.value)} />
    )
}

export default SearchInput