import {FC} from "react";

interface PageProps {

}

const Page: FC<PageProps> = ({}) => {
    return (
        <>
            <div className="mt-[20%] text-center text-CalorieCompass-Secondary font-bold text-5xl">Welcome to CalorieCompass - API
            </div>
            <div className="mt-[1%] text-center text-CalorieCompass-Primary font-bold text-2xl">/food?q=SEARCH_TERM or /food?b=BARCODE | ?extended=1 extends search to openfoodfacts</div>
        </>
    );
}

export default Page;