```https://egg-heads.herokuapp.com/```

# Summary
Ever wonder what you can make with what you have in your kitchen and wish a chef could tell you? Here you go!
Egg-heads is a three person backend project made over the course of 3 days which allows users to add ingredients to their 'fridge' and have recipes returned which match their ingredients. Complete user authentication for regular users and 'chefs'. 

* Note: Creating a front end for this project is an upcoming project.

## Technical Stack
* Javascript 
* Node
* Express
* MongoDB/Mongoose
* mLab
* Heroku 

## Team
* Nicky Evers
* Yuval Allweil
* Morgan Fogarty

## To Run
- Download Postman or open through browser
https://www.getpostman.com/apps

### Chef workflow:

- signup chef

    - POST to ```/auth/signup```

    ```js
    { 
      "email": <email>,
      "password": <password>,
      "chef": true 
    }
    ```

- copy the token that is returned. Set token as the value for an ```Authorization``` header

- to add a meal, GET ```/ingredients``` 

    - copy the IDs of the ingredients for the meal(s) you want to add

    - if the ingredients for your meal don't exist, add them by POSTing to ```/ingredients``` (you can post this as an array!)

        ```js

        {
            "name": "<ingredient>"
        }
        ```

    - now POST to ```/meals```
    
    ```js
    { 
    "name": "<ingredientName>",
    "ingredients": [
        "<ingredientID>", "<ingredientID>", "<ingredientID>", "<ingredientID>"
    ]
    }
    ```

    - to delete a meal, copy the ID of the meal you want to delete.

    - now DELETE to ```/meals``` 

    ```js
    {
        "id": "<mealID>"
    }
    ```

### User workflow:

- POST to ```/auth/signup```

    ```js
    { 
      "email": "<email>",
      "password": "<password>"
    }
    ```

    - copy the token that is returned. Set token as the value for an ```Authorization``` header

    - to add ingredients to your fridge, GET to ```/ingredients``` 

    - if the ingredients you have don't show up, add them by POSTing to ```/ingredients``` (you can post this as an array!)

        ```js
        {
            "name": "<ingredient>"
        }
        ```

    - copy the IDs of the ingredients you want to add to your fridge 

    - to add those ingredients to your fridge, POST an array of their IDs to ```/me/fridge```

        ```js
        [{
            "ingredient": "<ingredientID>"
        },
        {
            "ingredient": "<ingredientID>"
        },
        {
            "ingredient": "<ingredientID>"
        },
        {
            "ingredient": "<ingredientID>"
        }]
        ```

    - if you want to see your dashboard (and what's in your fridge), GET to ```/me```

    - to see what meals you can make from the ingredients in your frige, GET to ```/me/meals```

    - if you want to save a meal that you liked, add it to your favorites by POSTing to ```/me/favorites```

        ```js
        { "meal": "<mealID>" }
        ```
