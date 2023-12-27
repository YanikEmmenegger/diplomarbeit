'use client';
import {FC} from "react";
import Button from "@/components/Button";
import {useRouter} from "next/navigation";

interface SignOutButtonProps {

}

const SignOutButton: FC<SignOutButtonProps> = ({}) => {

    const router = useRouter();

    return (
        <Button onClick={()=>router.push("/api/auth/signout")}>
            Sign Out
        </Button>
    );
}

export default SignOutButton;