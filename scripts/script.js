document.getElementById("search-btn").addEventListener("click", function() {
    const mealName = document.getElementById("meal-input").value.trim();

    if (mealName === "") {
        alert("Please enter a meal name.");
        return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then(response => response.json())
        .then(data => {
            const mealResult = document.getElementById("meal-result");
            mealResult.innerHTML = ""; // Clear previous results

            if (data.meals) {
                const meal = data.meals[0];
                mealResult.innerHTML = `
                    <div class="meal">
                        <h2>${meal.strMeal}</h2>
                        <p><strong>Category:</strong> ${meal.strCategory}</p>
                        <p><strong>Cuisine:</strong> ${meal.strArea}</p>
                        <p><strong>Instructions:</strong> ${meal.strInstructions.substring(0, 100)}...</p>
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    </div>
                `;
            } else {
                mealResult.innerHTML = `<p>No meal found. Try another search.</p>`;
            }
        })
        .catch(error => console.error("Error fetching data:", error));
});
