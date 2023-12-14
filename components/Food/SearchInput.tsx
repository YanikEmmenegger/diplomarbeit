'use client'

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import useDebounce from "@/hooks/useDebouncer";

import qs from "query-string"
import Input from "@/components/Input";

const SearchInput = () =>{

    const router = useRouter()
    const [value, setValue] = useState<string>("")
    const deboundedValue = useDebounce<string>(value, 500);

    useEffect(() => {
        const query = {
            productName: deboundedValue,
        }

        const url = qs.stringifyUrl({
            url: '/app/food',
            query: query
        })
        router.push(url)
    }, [deboundedValue, router]);

    return (
        <Input placeholder="Enter Foodname or Brand? " value={value} onChange={(e) => setValue(e.target.value)} />
    )
}

export default SearchInput