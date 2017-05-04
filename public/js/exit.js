function exit() {
  //  Setting user info.  //
  const userName = document.getElementsByClassName('user-info-name')[0];
  userName.textContent = 'Unknown';
  const userRank = document.getElementsByClassName('user-info-rank')[0];
  userRank.textContent = 'Guest';
  userRank.style.color = '#525659';
  document.getElementsByClassName('user-info-photo')[0].src =
    'images/pics/guest_photo.jpg';
  //  Hiding buttons to work with news.  //
  const addButton = document.getElementsByClassName('add-new-button')[0];
  addButton.style.visibility = 'hidden';
  const editButton = document.getElementsByClassName('edit-new-button')[0];
  editButton.style.visibility = 'hidden';
  const deleteButton = document.getElementsByClassName('delete-new-button')[0];
  deleteButton.style.visibility = 'hidden';
  //  Changing menu items.  //
  document.getElementsByClassName('logout')[0].style.display = 'none';
  document.getElementsByClassName('login')[0].style.display = 'inherit';
  document.getElementsByClassName('register')[0].style.display = 'inherit';
  document.getElementsByClassName('profile')[0].style.display = 'none';

  event.stopPropagation();
}
