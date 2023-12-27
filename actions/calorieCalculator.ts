

interface Macronutrients {
    protein: number;
    fat: number;
    carbohydrates: number;
}

interface CaloricNeedsResult {
    totalCalories: number;
    macronutrients: Macronutrients;
}

export async function calculateCaloricNeeds(weightKg: number, heightCm: number, age: number, activityLevel: number, goal: number): Promise<CaloricNeedsResult> {
    // Harris-Benedict formula to calculate BMR
    const bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);

    // Total calorie needs based on activity level
    let activityFactor: number;

    switch (activityLevel) {
        case 1:
            activityFactor = 1.375; // Lightly active
            break;
        case 2:
            activityFactor = 1.55; // Moderately active
            break;
        case 3:
            activityFactor = 1.725; // Very active
            break;
            case 4:
            activityFactor = 1.9; // Extremely active
            break;
        default:
            throw new Error("Invalid activity level");
    }

    const totalCalories = Math.round(bmr * activityFactor);

    // Define calorie adjustments based on goals
    let calorieAdjustment: number;

    switch (goal) {
        case 1:
            calorieAdjustment = -500; // Caloric deficit for weight loss
            break;
        case 2:
            calorieAdjustment = 0; // Caloric maintenance for weight maintenance
            break;
        case 3:
            calorieAdjustment = 500; // Caloric surplus for weight gain
            break;
        default:
            throw new Error("Invalid goal");
    }

    // Adjust total calories based on goal
    const adjustedCalories = Math.round(totalCalories + calorieAdjustment);

    // Macronutrient distribution (as a percentage of adjusted total calories)
    const proteinPercentage = 25;
    const fatPercentage = 30;
    const carbohydratesPercentage = 45;

    // Calculate macronutrients in grams
    const macronutrients: Macronutrients = {
        protein: Math.round((adjustedCalories * (proteinPercentage / 100)) / 4), // 1g protein = 4 calories
        fat: Math.round((adjustedCalories * (fatPercentage / 100)) / 9), // 1g fat = 9 calories
        carbohydrates: Math.round((adjustedCalories * (carbohydratesPercentage / 100)) / 4), // 1g carbohydrates = 4 calories
    };

    return { totalCalories: adjustedCalories, macronutrients };
}
