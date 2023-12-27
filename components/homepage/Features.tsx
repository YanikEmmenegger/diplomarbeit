import {AiOutlineBook} from "react-icons/ai";
import {FaMicroscope} from "react-icons/fa";
import {MdOutlineTrackChanges} from "react-icons/md";
import {IoReceiptOutline} from "react-icons/io5";

const features = [
    {
        name: 'Tagebuch',
        description:
            'Verfolge was und wie viel du isst. Wir bieten eine grosse Datenbank mit vielen verschiedenen Nahrungsmittel.',
        icon: AiOutlineBook,
    },{
        name: 'Makronährstoffe verfolgen',
        description:
            'Verfolge deine Makronährwerte und kontrolliere wie viel du noch übrig hast',
        icon: FaMicroscope,
    },
    {
        name: 'Ziele Verfolgen und Erreichen',
        description:
            'Setze dir Ziele und verfolge diese',
        icon: MdOutlineTrackChanges,
    },
    {
        name: 'Coming Soon',
        description:
            'Weitere Funktionen werden entwickelt und kontinuierlich integriert',
        icon: IoReceiptOutline,
    },

]

export default function Features() {
    return (
        <div className="pb-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-white">Features</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
                        Alles was du brauchst um gesund zu bleiben
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        Wir haben alles was du brauchst um gesund und fit zu bleiben. Wir haben einen Makro Tracker, ein Tagebuch und vieles mehr!
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-100">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-CalorieCompass-Primary">
                                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-200">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
