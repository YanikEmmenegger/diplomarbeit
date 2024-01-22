import {FC} from "react";
import Link from "next/link";
import {AiFillCloseCircle} from "react-icons/ai";

interface PageProps {

}

const Page: FC<PageProps> = ({}) => {
    return (
        <div
            className="flex mx-auto flex-col items-center min-h-screen py-10 w-[85%] md:w-1/2">
            <Link href={"/"} className="group hover:scale-105 transition-transform">
                <AiFillCloseCircle font-size={40}/>
            </Link>
            <h1 className="my-5 text-2xl md:text-5xl">Datenschutzerklärung</h1>
            <div className="flex flex-col items-start justify-start pb-20  w-full">
                <h2 className="text-xl pb-2 pt-3 text-gray-400">1. Verantwortliche Stelle:</h2>
                <p className="text-sm">Die App ist verantwortlich für die Verarbeitung personenbezogener Daten.</p>

                <h2 className="text-xl pb-2 pt-3 text-gray-400">2. Welche Daten werden gesammelt?</h2>
                <p className="text-sm">
                    - Benutzerangaben: Name, Vorname, E-Mail-Adresse, Geschlecht, Grösse, Gewicht.<br/>
                    - Gesundheitsdaten: Zielkalorien, Ziel Fett, Ziel Kohlenhydrate, Ziel Protein.
                </p>

                <h2 className="text-xl pb-2 pt-3 text-gray-400">3. Zweck der Datensammlung:</h2>
                <p className="text-sm">
                    - Bereitstellung des Foodtracking-Services.<br/>
                    - Personalisierung des Services basierend auf den Gesundheitszielen.<br/>
                    - Verbesserung der App basierend auf dem Nutzerverhalten.<br/>
                    - Kommunikation mit den Benutzern.
                </p>

                <h2 className="text-xl pb-2 pt-3 text-gray-400">4. Datensicherheit:</h2>
                <p className="text-sm">
                    - Einsatz von Technologiestandard-Sicherheitsmassnahmen zum Schutz der Daten.<br/>
                    - Verschlüsselung und sichere Übertragung.
                </p>

                <h2 className="text-xl pb-2 pt-3 text-gray-400">5. Speicherdauer:</h2>
                <p className="text-sm">
                    - Daten werden so lange gespeichert, wie sie für die Zwecke erforderlich sind.<br/>
                    - Benutzer können ihre Daten löschen.
                </p>

                <h2 className="text-xl pb-2 pt-3 text-gray-400">6. Rechte der Benutzer:</h2>
                <p className="text-sm">
                    - Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung.<br/>
                    - Widerspruchsrecht gegen die Verarbeitung.
                </p>

                <h2 className="text-xl pb-2 pt-3 text-gray-400">7. Kontaktdaten:</h2>
                <p className="text-sm">- yanik.emmenegger@student.ipso.ch</p>

            </div>
            <h1 className="my-5 text-2xl md:text-5xl">AGBs</h1>
            <div className="flex flex-col items-start justify-start pb-20  w-full">
                <h2 className="text-xl pb-2 pt-3 text-gray-400">1. Nutzungsbedingungen:</h2>
                <p className="text-sm">Die Nutzung der App setzt die Zustimmung zu den AGB voraus.</p>

                <h2 className="text-xl pb-2 pt-3 text-gray-400">2. Registrierung:</h2>
                <p className="text-sm">Benutzer müssen sich registrieren, um die App zu nutzen.</p>

                <h2 className="text-xl pb-2 pt-3 text-gray-400">3. Verantwortlichkeiten der Nutzer:</h2>
                <p className="text-sm">
                    - Richtigkeit der angegebenen Daten.<br/>
                    - Verantwortung für den sicheren Umgang mit Zugangsdaten.
                </p>

                <h2 className="text-xl pb-2 pt-3 text-gray-400">4. Nutzungsrechte:</h2>
                <p className="text-sm">Nutzungsrecht beschränkt sich auf persönlichen Gebrauch.</p>

                <h2 className="text-xl pb-2 pt-3 text-gray-400">5. Haftungsausschluss:</h2>
                <p className="text-sm">Keine Haftung für Richtigkeit der Nahrungsinformationen.</p>

                <h2 className="text-xl pb-2 pt-3 text-gray-400">6. Datenschutz:</h2>
                <p className="text-sm">Verweis auf die Datenschutzerklärung.</p>

                <h2 className="text-xl pb-2 pt-3 text-gray-400">7. Änderungen der AGB:</h2>
                <p className="text-sm">Recht zur Änderung der AGB mit Benachrichtigung.</p>
            </div>
        </div>

    );
}

export default Page;