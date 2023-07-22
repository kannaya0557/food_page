
const foodItems = [
    {
        name: "Pizza",
        description: "Delicious pizza with cheese and toppings.",
        price: "$10.99",
        imageUrl: "pizza.jpg",
        isVeg: true,
    },
    {
        name: "Burger",
        description: "Juicy burger with lettuce, tomato, and cheese.",
        price: "$8.49",
        imageUrl: "burger.jpg",
        isVeg: false,
    },
    {
        name: "Salad",
        description: "Healthy salad with fresh vegetables.",
        price: "$6.99",
        imageUrl: "salad.jpg",
        isVeg: true,
    },
    {
        name: "Sushi",
        description: "Traditional Japanese sushi with fresh fish.",
        price: "$12.99",
        imageUrl: "sushi.jpg",
        isVeg: false,
    },
    {
        name: "Pasta",
        description: "Creamy pasta with tomato sauce.",
        price: "$9.99",
        imageUrl: "pasta.jpg",
        isVeg: true,
    },
    {
        name: "Steak",
        description: "Juicy steak with grilled vegetables.",
        price: "$14.99",
        imageUrl: "steak.jpg",
        isVeg: false,
    },
    {
        name: "Ice Cream",
        description: "Refreshing ice cream in different flavors.",
        price: "$5.99",
        imageUrl: "icecream.jpg",
        isVeg: true,
    },
    {
        name: "Doughnut",
        description: "Sweet doughnut with sprinkles.",
        price: "$2.99",
        imageUrl: "doughnut.jpg",
        isVeg: true,
    },
    {
        name: "Fried Chicken",
        description: "Crispy fried chicken with a side of fries.",
        price: "$9.49",
        imageUrl: "fried_chicken.jpg",
        isVeg: false,
    },
    {
        name: "Caesar Salad",
        description: "Classic Caesar salad with dressing and croutons.",
        price: "$7.99",
        imageUrl: "caesar_salad.jpg",
        isVeg: true,
    },
    {
        name: "Sushi Roll",
        description: "Assorted sushi rolls with avocado and fish.",
        price: "$11.99",
        imageUrl: "sushi_roll.jpg",
        isVeg: false,
    },
    {
        name: "Lasagna",
        description: "Layers of pasta, cheese, and meat sauce.",
        price: "$12.49",
        imageUrl: "lasagna.jpg",
        isVeg: false,
    },
   
];



const drinkItems = [
    {
        name: "Coca-Cola",
        description: "Refreshing cola drink.",
        price: "$1.99",
        imageUrl: "cocacola.jpg",
    },
    {
        name: "Lemonade",
        description: "Freshly squeezed lemonade.",
        price: "$2.49",
        imageUrl: "lemonade.jpg",
    },
    {
        name: "Iced Tea",
        description: "Sweet and chilled iced tea.",
        price: "$2.99",
        imageUrl: "icedtea.jpg",
    },
    {
        name: "Orange Juice",
        description: "Freshly squeezed orange juice.",
        price: "$3.29",
        imageUrl: "orangejuice.jpg",
    },
  
];


  
  let selectedItem = null;
  let selectedItemsList = [];
  
  function filterVegItems() {
    return foodItems.filter((item) => item.isVeg);
  }
  
  function filterNonVegItems() {
    return foodItems.filter((item) => !item.isVeg);
  }
  
  function displayMenuItems(menuType) {
    const itemsContainer = document.getElementById("menu-items");
    itemsContainer.innerHTML = "";
  
    let items;
    if (menuType === "veg") {
      items = filterVegItems();
    } else if (menuType === "non-veg") {
      items = filterNonVegItems();
    } else if (menuType === "drinks") {
      items = drinkItems;
    } else {
      items = foodItems; 
    }
  
    function createItemElement(item) {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("menu-item");
      itemDiv.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p>Price: ${item.price}</p>
      `;
  
      itemDiv.addEventListener("click", () => showDetails(item));
      return itemDiv;
    }
  
    items.forEach((item) => {
      itemsContainer.appendChild(createItemElement(item));
    });
  }
  
  function openTab(event, tabName) {
    const tabButtons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tabButtons.length; i++) {
      tabButtons[i].classList.remove("active");
    }
  
    event.currentTarget.classList.add("active");
  
    if (tabName === "veg-tab") {
      displayMenuItems("veg");
    } else if (tabName === "non-veg-tab") {
      displayMenuItems("non-veg");
    } else if (tabName === "drinks-tab") {
      displayMenuItems("drinks");
    }
  }
  
  function showDetails(item) {
    selectedItem = item;
  
    const detailsDiv = document.getElementById("item-details");
  
    detailsDiv.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.name}">
      <h2>${item.name}</h2>
      <p>${item.description}</p>
      <p>Price: ${item.price}</p>
    `;
  
    const backButton = document.getElementById("back-button");
    const deleteButton = document.getElementById("delete-button");
  
    backButton.style.display = "block";
    deleteButton.style.display = "block";
  }
  
  function hideDetails() {
    selectedItem = null;
  
    const detailsDiv = document.getElementById("item-details");
    detailsDiv.innerHTML = "";
  
    const backButton = document.getElementById("back-button");
    const deleteButton = document.getElementById("delete-button");
  
    backButton.style.display = "none";
    deleteButton.style.display = "none";
  }
  
  function deleteSelectedItem() {
    if (selectedItem) {
      const index = selectedItemsList.indexOf(selectedItem);
      if (index !== -1) {
        selectedItemsList.splice(index, 1);
        hideDetails();
        displayMenuItems(); 
      }
    }
  }
  
  function calculateTotalAmount() {
    let total = 0;
    selectedItemsList.forEach((item) => {
      total += parseFloat(item.price.replace("$", ""));
    });
    return total.toFixed(2);
  }
  
  function generateBill() {
    const billDiv = document.getElementById("bill");
    billDiv.innerHTML = "";
  
    const billHeader = document.createElement("h2");
    billHeader.textContent = "Bill";
  
    const billList = document.createElement("ul");
    selectedItemsList.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${item.name} - ${item.price}`;
      billList.appendChild(listItem);
    });
  
    const totalAmount = calculateTotalAmount();
    const totalItem = document.createElement("li");
    totalItem.textContent = `Total Amount: $${totalAmount}`;
    billList.appendChild(totalItem);
  
    billDiv.appendChild(billHeader);
    billDiv.appendChild(billList);
  }
  
  function addToBill() {
    if (selectedItem) {
      selectedItemsList.push(selectedItem);
      selectedItem = null;
      hideDetails();
      generateBill();
    }
  }
  document.addEventListener("DOMContentLoaded", () => {
    displayMenuItems();
  
    const tabButtons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tabButtons.length; i++) {
      tabButtons[i].addEventListener("click", (event) => openTab(event, event.currentTarget.id));
    }
  
    const deleteButton = document.getElementById("delete-button");
    deleteButton.addEventListener("click", deleteSelectedItem);
  
    const backButton = document.getElementById("back-button");
    backButton.addEventListener("click", hideDetails);
  
    const addToBillButton = document.getElementById("add-to-bill-button");
    addToBillButton.addEventListener("click", addToBill);
  });
  