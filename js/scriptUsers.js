'use strict';

// Page users

const user = document.querySelector('.user');
const userContainer = document.querySelector('.users-list');
const userSearch = document.querySelector('.search-box');

function displayUsers(users) {
  userContainer.innerHTML = '';
  users.forEach((u) => {
    const html = `
              <div class="user">
              <img src="assets/img/user-1.jpg" alt="" class="user-photo">
              <div class="user-content">
              <h3 class="user-name">${u.name} <span class="user-badge">active</span></h3>
              <div class="user-data">
                <p class="user-text-content"><i class="fa-solid fa-user"></i>@${u.username}</p>
                <p class="user-text-content"><i class="fa-solid fa-envelope"></i></i>${u.email}</p>
                <p class="user-text-content"><i class="fa-solid fa-phone"></i></i>${u.phone}</p>
                <p class="user-text-content"><i class="fa-solid fa-globe"></i><a href="${u.website}" target="_blank">${u.website}</a></p>
                <p class="user-text-content"><i class="fa-solid fa-location-dot"></i>${u.address.suite}, ${u.address.street}, ${u.address.city}</p>
                <p class="user-text-content"><i class="fa-solid fa-city"></i>${u.company.name}</p>
              </div> 
              <p class="user-note">
                "${u.company.catchPhrase}"
              </p>
              </div>
              <div class="user-buttons">
                <button class="user-button">View profile</button>
                <button class="user-button">Edit</button>
                <button class="user-button-dots"><img src="/assets/icon/dots.png"></button>
              </div>
              </div>
      `;
    userContainer.insertAdjacentHTML('beforeend', html);
  });
}

let allUsers = [];
async function loadUsers() {
  try {
    const resUser = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!resUser.ok) throw new Error('Problem getting user data');
    allUsers = await resUser.json();
    displayUsers(allUsers);
    return allUsers;
  } catch (error) {
    console.error('Problem getting user data');
  }
}

loadUsers();

userSearch.addEventListener('input', function (event) {
  const searchWord = event.target.value.toLowerCase();
  const dataUserFiltered = allUsers.filter((user) => {
    return user.name.toLowerCase().includes(searchWord);
  });
  console.log(dataUserFiltered);
  if (dataUserFiltered) {
    console.log(dataUserFiltered.length);
    displayUsers(dataUserFiltered);
  } else {
    console.log('Error');
  }
});
