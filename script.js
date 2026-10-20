// Selecting DOM elements
const baseSelect = document.getElementById('base-select');
const fruitCheckboxes = document.querySelectorAll('input[name="fruit"]');
const proteinRadios = document.querySelectorAll('input[name="protein"]');
const ingredientsCup = document.getElementById('ingredients-cup');
const totalCaloriesElem = document.getElementById('total-calories');
const resetBtn = document.getElementById('reset-btn');

function updateSmoothieBuilder() {
    let totalSmoothieCalories = 0;
    let ingredientsListHTML = "<ul>";
    let hasIngredients = false;

    // 1. Process Base Liquid
    const selectedBaseOption = baseSelect.options[baseSelect.selectedIndex];
    if (baseSelect.value !== "") {
        const baseName = selectedBaseOption.value;
        const baseCalories = parseInt(selectedBaseOption.getAttribute('data-calories')) || 0;
        
        totalSmoothieCalories += baseCalories;
        ingredientsListHTML += `<li>Base: ${baseName} (${baseCalories} kcal)</li>`;
        hasIngredients = true;
    }

    // 2. Process Fruit Choices
    fruitCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const fruitName = checkbox.value;
            const fruitCalories = parseInt(checkbox.getAttribute('data-calories')) || 0;
            
            totalSmoothieCalories += fruitCalories;
            ingredientsListHTML += `<li>Fruit: ${fruitName} (${fruitCalories} kcal)</li>`;
            hasIngredients = true;
        }
    });

    // 3. Process Protein Add-on
    proteinRadios.forEach(radio => {
        if (radio.checked && radio.value === "Yes") {
            const proteinCalories = parseInt(radio.getAttribute('data-calories')) || 0;
            
            totalSmoothieCalories += proteinCalories;
            ingredientsListHTML += `<li>Protein Add-on: Yes (${proteinCalories} kcal)</li>`;
            hasIngredients = true;
        }
    });

    // Update DOM output
    if (!hasIngredients) {
        ingredientsCup.innerHTML = "<p>Your cup is empty.</p>";
    } else {
        ingredientsListHTML += "</ul>";
        ingredientsCup.innerHTML = ingredientsListHTML;
    }

    totalCaloriesElem.textContent = totalSmoothieCalories;
}

// Event Listeners
baseSelect.addEventListener('change', updateSmoothieBuilder);

fruitCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateSmoothieBuilder);
});

proteinRadios.forEach(radio => {
    radio.addEventListener('change', updateSmoothieBuilder);
});

// Reset functionality
resetBtn.addEventListener('click', () => {
    baseSelect.value = "";
    fruitCheckboxes.forEach(checkbox => checkbox.checked = false);
    proteinRadios.forEach(radio => {
        radio.checked = (radio.value === "No"); // Reset protein to 'No'
    });
    updateSmoothieBuilder();
});