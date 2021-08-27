const btnClick = () => {
     let inputField = document.getElementById('input-field');
     let inputFieldValue = inputField.value;
     inputField.value = '';

     const errorMessageDiv = document.getElementById('errorMessage');
     if(inputFieldValue == '') {
          const h1 = document.createElement('h1');
          h1.innerText = 'Sorry! please input something';
          h1.style.color = 'red';
          errorMessageDiv.appendChild(h1);
     } else {
          const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputFieldValue}`;
          fetch(url)
          .then(res => res.json())
          .then(data => searchResult(data.meals))
     }
}

const searchResult = meals => {
     const parentDivContainer = document.getElementById('parentDiv');
     parentDivContainer.textContent = '';
     const errorMessageDiv = document.getElementById('errorMessage');
     if(meals.length == 0) {
          const h1 = document.createElement('h1');
          h1.innerText = 'Sorry! not found';
          h1.style.color = 'blue';
          errorMessageDiv.appendChild(h1);
     } else {
               meals.forEach(meal => {
               const div = document.createElement('div');
               div.classList.add('col');
               div.innerHTML = `
               <div onclick="loadMealDetails(${meal.idMeal})" class="card">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
                    </div>
               </div>
               `
               parentDivContainer.appendChild(div);
          });
     }
     
}

const loadMealDetails = mealDetails => {
     const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealDetails}`;
     fetch(url)
     .then(res => res.json())
     .then(data => displayMealDetails(data.meals[0]))
}

const displayMealDetails = meal => {
     const mealDetails = document.getElementById('meal-details');
     const div = document.createElement('div');
     div.classList.add('card');
     div.innerHTML = `
     <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
     <div class="card-body">
       <h5 class="card-title">${meal.strMeal}</h5>
       <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
       <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
     </div>
     `
     mealDetails.appendChild(div);
}