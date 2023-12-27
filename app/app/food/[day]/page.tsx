'use client'
import {FC, useEffect, useState} from "react";
import {useRouter} from "next/navigation";


interface PageProps {

}

const Page: FC<PageProps> = ({}) => {

    const router = useRouter()

    useEffect(() => {
        const url = "/app/food/" + new Date().toISOString().slice(0, 10) + "/1";
        router.push(url);

    } , [])

    return (
      <></>
    )
}
export default Page