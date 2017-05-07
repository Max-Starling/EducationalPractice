/* global document, event, window, classie, newModel, newRenderer, modalFunctions */
function exit() {
  //  Setting user info.  //
  const userName = document.querySelector('.user-info-name');
  userName.textContent = 'Unknown';
  const userRank = document.querySelector('.user-info-rank');
  userRank.textContent = 'Guest';
  userRank.style.color = '#525659';
  document.querySelector('.user-info-photo').src =
    'images/pics/guest_photo.jpg';
  //  Hiding buttons to work with news.  //
  const addButton = document.querySelector('.add-new-button');
  addButton.style.visibility = 'hidden';
  const editButton = document.querySelector('.edit-new-button');
  editButton.style.visibility = 'hidden';
  const deleteButton = document.querySelector('.delete-new-button');
  deleteButton.style.visibility = 'hidden';
  //  Changing menu items.  //
  document.querySelector('.logout').style.display = 'none';
  document.querySelector('.login').style.display = 'inherit';
  document.querySelector('.register').style.display = 'inherit';
  document.querySelector('.profile').style.display = 'none';

  event.stopPropagation();
}
