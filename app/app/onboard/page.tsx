import {FC} from "react";
import Onboarding from "@/components/Onboarding/Onboarding";

interface PageProps {}

const Page: FC<PageProps> = async ({}) => {

    return (
        <div className=" mx-auto w-4/5 md:w-1/2">
            <Onboarding></Onboarding>
        </div>
    );
};

export default Page;
