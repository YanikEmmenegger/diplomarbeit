// OnboardNavigation.tsx

interface OnboardNavigationProps {
    currentStep: number;
    onNext: () => void;
    onBack: () => void;
}

const OnboardNavigation: React.FC<OnboardNavigationProps> = ({currentStep,onNext,onBack}) => {
    return (
        <div>
            {currentStep > 1 && (
                <button onClick={onBack}>Zurück</button>
            )}
            <button onClick={onNext}>Weiter</button>
        </div>
    );
};

export default OnboardNavigation;
