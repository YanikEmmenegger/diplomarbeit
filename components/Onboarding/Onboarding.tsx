'use client';
import React, {useEffect, useState} from 'react';
import OnboardingNavigation from "@/components/Onboarding/OnboardingNavigation";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {User} from "@/types/types.db";
import axios from "axios";
import StepOne from "@/components/Onboarding/StepOne";
import StepTwo from "@/components/Onboarding/StepTwo";
import StepThree from "@/components/Onboarding/StepThree";
import StepFour from "@/components/Onboarding/StepFour";
import StepFive from "@/components/Onboarding/StepFive";
import {SiProgress} from "react-icons/si";
import Progress from "@/components/Onboarding/Progress";

const Onboarding = () => {

        const router = useRouter();

        const [currentStep, setCurrentStep] = useState<number>(1);

        const [user, setUser] = useState<User | null>(null)
        const [weight, setWeight] = useState<number | null>(null)
        const [height, setHeight] = useState<number | null>(null)
        const [activityLevel, setActivityLevel] = useState<number>(2)
        const [goal, setGoal] = useState<number>(2)


        const [stepCompleted, setStepCompleted] = useState<boolean>(false)

        const [loadingUser, setLoadingUser] = useState<boolean>(true)

        useEffect(() => {
            // Function to fetch user data from the API
            const fetchUserData = async () => {
                try {
                    const response = await axios.get("/api/user")
                    // Update the user state with the fetched data
                    setUser({...response.data, gender: response.data.gender === null ? 1 : response.data.gender});
                } catch (error) {
                    console.error('Error fetching user data:', error);
                } finally {
                    setLoadingUser(false)
                }
            };
            const fetchUserWeight = async () => {
                try {
                    const response = await axios.get("/api/user/weight")
                    // Update the weight state with the fetched data
                    if (response.data.length > 0) {
                        setWeight(response.data[0].weight);
                    }
                    //setWeight(response.data.weight);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
            const fetchUserHeight = async () => {
                try {
                    const response = await axios.get("/api/user/height")
                    // Update the weight state with the fetched data
                    if (response.data.length > 0) {
                        setHeight(response.data[0].height);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
            // Call the function to fetch user data when the component mounts
            fetchUserData().then();
            fetchUserWeight().then();
            fetchUserHeight().then();
        }, []); // The empty dependency array ensures that this effect runs only once on mount


        const handleBack = () => {
            // Implement logic to handle back button click
            setCurrentStep(currentStep - 1)
        };
        const handleNext = async () => {
            if (!stepCompleted) {
                toast.error('Bitte fülle alle Felder aus')
            } else {
                switch (currentStep) {
                    case 1:
                        toast.promise(axios.patch("/api/user", user), {
                            loading: 'Speichere Daten...',
                            success: 'Daten gespeichert',
                            error: 'Fehler beim Speichern'
                        })
                        break;
                    case 2:
                        await toast.promise(axios.post("/api/user/weight", weight), {
                            loading: 'speichere Gewicht...',
                            success: 'Gewicht gespeichert',
                            error: 'Fehler beim Speichern'
                        })
                        await toast.promise(axios.post("/api/user/height", height), {
                            loading: 'speichere Grösse...',
                            success: 'Grösse gespeichert',
                            error: 'Fehler beim Speichern'
                        })
                        break;
                    case 5:
                        try {
                            await toast.promise(axios.patch("/api/user", user), {
                                loading: 'Speichere Daten...',
                                success: 'Onboarding abgeschlossen',
                                error: 'Fehler beim Speichern'
                            })
                            router.push('/app')
                            //toast.success('Onboarding abgeschlossen')
                        } catch (e) {
                            console.error(e)
                        }
                        break;
                }
                if (currentStep !== 5) {
                    setCurrentStep(currentStep + 1)
                }
            }
        };

        const getStep = () => {
            switch (currentStep) {
                case 1:
                    return <StepOne user={user!} setUser={setUser}
                                    setStepCompleted={setStepCompleted}/>
                case 2:
                    return <StepTwo weight={weight} setWeight={setWeight} setStepCompleted={setStepCompleted}
                                    height={height} setHeight={setHeight}/>
                case 3:
                    return <StepThree setStepCompleted={setStepCompleted} activityLevel={activityLevel}
                                      setActivityLevel={setActivityLevel}/>
                case 4:
                    return <StepFour goal={goal} setGoal={setGoal} setStepCompleted={setStepCompleted}/>
                case 5:
                    return <StepFive weight={weight!} height={height!} activityLevel={activityLevel} user={user!}
                                     setUser={setUser} setStepCompleted={setStepCompleted} goal={goal}/>
            }
        }

        return (
            <div className={"onboarding"}>
                {loadingUser ? "Loading..." : (
                    <>
                        <Progress step={currentStep}/>
                        <OnboardingNavigation
                            currentStep={currentStep}
                            onNext={handleNext}
                            onBack={handleBack}
                        />
                        {getStep()}
                    </>
                )}
            </div>
        );
    }
;

export default Onboarding;
