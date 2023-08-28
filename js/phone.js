const loadPhone = async (seacrhText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${seacrhText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.textContent = " ";

  const showAllContainer = document.getElementById("show-all-btn-container");

  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phonesContainer.classList = `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 ml-4`;
  phones.forEach((phone) => {
    // 1. Create A div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card   bg-gray-100 shadow-xl p-5`;
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center mt-5">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Details</button>


          </div>
        </div>
        `;
    phonesContainer.appendChild(phoneCard);
  });

  //? Hide loading Spinner
  toggleLoadingSpinner(false);
};

//! Handle show details
const handleShowDetails = async (id) => {
  // console.log(id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);

};

const showPhoneDetails= (phone) => {
  console.log(phone);
  const phoneDetailsContainer  = document.getElementById("show_details_modal");
  phoneDetailsContainer.childNodes[1].childNodes[1].innerText = phone.name;
  
  const showDetailsContainer = document.getElementById("show-details-container");

  showDetailsContainer.innerHTML = `
      <img class="my-5" src="${phone.image}" alt="" />
      <p><span>Storage: </span>${phone?.mainFeatures?.storage}</p>
  `
  //Show Modal 
   show_details_modal.showModal();
}

//! handle search button
const handleSearch = (isShowAll) => {
  const searchField = document.getElementById("search-input-field");
  const searchFieldValue = searchField.value;
  toggleLoadingSpinner(true);
  loadPhone(searchFieldValue, isShowAll);
};

//! handle search button 2
// const handleSearch2 = () => {
//     const searchField2 = document.getElementById("search-input-field2");
//     const searchField2Value = searchField2.value;
//     toggleLoadingSpinner(true);
//     loadPhone(searchField2Value);
// }

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

//! Handle Show All
const handleShowAll = () => {
  handleSearch(true);
};


