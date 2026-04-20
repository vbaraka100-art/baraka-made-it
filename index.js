window.onload = function () {

    // LOAD DATA SAFELY
    let foodData = JSON.parse(localStorage.getItem("foods")) || [
        { id: 1, Image: "download (4).jpeg", Name: "Chicken", price: 650 },
        { id: 2, Image: "download (5).jpeg", Name: "Beef", price: 350 },
        { id: 3, Image: "images.jpeg", Name: "Pork", price: 350 },
        { id: 4, Image: "images (1).jpeg", Name: "Mutton", price: 400 }
    ];

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const foodContainer = document.getElementById("foodContainer");
    const cartContainer = document.getElementById("cart");

    // SAVE FUNCTIONS
    function saveFoods() {
        localStorage.setItem("foods", JSON.stringify(foodData));
    }

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // DISPLAY FOODS
    function displayFoods() {
        foodContainer.innerHTML = "";

        foodData.forEach(food => {
            foodContainer.innerHTML += `
                <div class="foodContainer">
                    <img src="${food.Image}">
                    <h3>${food.Name}</h3>
                    <p>${food.price} KSH</p>

                    <button class="add-btn" onclick="addToCart(${food.id})">Add to Cart</button>
                    <button class="remove-btn" onclick="removeFood(${food.id})">Delete</button>
                </div>
            `;
        });
    }

    // ADD FOOD
    window.addFood = function () {
        const name = document.getElementById("foodName").value;
        const price = document.getElementById("foodPrice").value;
        const image = document.getElementById("foodImage").value;

        if (!name || !price || !image) {
            alert("Fill all fields");
            return;
        }

        foodData.push({
            id: Date.now(),
            Name: name,
            price: Number(price),
            Image: image
        });

        saveFoods();
        displayFoods();
    };

    // REMOVE FOOD
    window.removeFood = function (id) {
        foodData = foodData.filter(food => food.id !== id);
        saveFoods();
        displayFoods();
    };

    // ADD TO CART
    window.addToCart = function (id) {
        const item = cart.find(i => i.id === id);

        if (item) {
            item.quantity++;
        } else {
            const food = foodData.find(f => f.id === id);
            cart.push({ ...food, quantity: 1 });
        }

        saveCart();
        displayCart();
    };

    // REMOVE ONE
    window.removeOne = function (id) {
        const item = cart.find(i => i.id === id);

        if (!item) return;

        item.quantity--;

        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }

        saveCart();
        displayCart();
    };

    // REMOVE ALL
    window.removeItem = function (id) {
        cart = cart.filter(i => i.id !== id);
        saveCart();
        displayCart();
    };

    // DISPLAY CART
    function displayCart() {
        cartContainer.innerHTML = "";

        cart.forEach(item => {
            cartContainer.innerHTML += `
                <div class="cart-item">
                    <h4>${item.Name}</h4>
                    <img src="${item.Image}" width="70">
                    <p>${item.price} KSH x ${item.quantity}</p>

                    <button onclick="addToCart(${item.id})">+</button>
                    <button onclick="removeOne(${item.id})">-</button>
                    <button onclick="removeItem(${item.id})">Remove</button>
                </div>
            `;
        });
    }

    // MENU
    window.toggleMenu = function () {
        document.querySelector(".navy").classList.toggle("active");
    };

    // INIT
    displayFoods();
    displayCart();
};

