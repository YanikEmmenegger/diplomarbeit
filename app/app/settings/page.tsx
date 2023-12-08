import React, {FC} from "react";
import SignOutButton from "@/components/SignOutButton";

interface PageProps {

}

const Page: FC<PageProps> = ({}) => {
    return (
        <div className="cc-page">
            <SignOutButton/>

        </div>
    );
}

export default Page;