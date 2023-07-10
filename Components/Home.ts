interface UserType {
  username: string;
  password: string;
  confirmPassword: string;
}
interface Login {
  username: string;
  password: string;
}
interface CommentType {
  commentedUser: string;
  comment: string;
}

interface FeedType {
  uploadedUsername: string;
  caption: string;
  file: string;
  date: string;
  time: string;
  likes: { likedUser: string }[];
  comments: CommentType[];
}

const allUsers: UserType[] = JSON.parse(localStorage.getItem("users") || "[]");
const loginUser: UserType[] = JSON.parse(sessionStorage.getItem("loginUser") || '[]');
const feeds: FeedType[] = JSON.parse(localStorage.getItem("feeds") || "[]");
const allLoginUsers: Login[] = JSON.parse(localStorage.getItem("loginUser") || "[]");


const userDetailDisplay = document.getElementById("userDisplay") as HTMLSelectElement;
const userImageDisplay = document.getElementById("userImage") as HTMLImageElement;
const fileInput = document.querySelector('.file-input') as HTMLInputElement;
const feedsContainer = document.getElementById("feeds-container") as HTMLDivElement;
const tweetPop = document.getElementById('upload-co') as HTMLElement;
const commentBox = document.getElementsByClassName('comment-box')[0] as HTMLDivElement;
const commentText = document.getElementsByClassName('commentText')[0] as HTMLInputElement;
const commentsDisplay = document.getElementsByClassName('comments-display')[0] as HTMLDivElement;
const postIcon =document.getElementById('postIcon') as HTMLElement;
const msgIcon = document.getElementById('msgIcon') as HTMLElement;



loginUser.forEach(user => {
  const option = document.createElement("option");
  option.textContent = user.username;
  userDetailDisplay.appendChild(option);

  if (user.image) {
    userImageDisplay.src = user.image;
    userImageDisplay.style.display = "block";
  } else {
    userImageDisplay.style.display = "none";
  }
});

function upload(): void {
const captionInput = document.getElementById('caption') as HTMLInputElement;

  const dateObj: Date = new Date();
  const file: File | null = fileInput.files ? fileInput.files[0] : null;
  let captionValue =  captionInput.value;
  console.log(captionInput.value, captionValue);
  
  if (file) {
    const reader: FileReader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target && event.target.result) {
        const fileDataUrl: string = event.target.result.toString();
        const objFeed: FeedType = {
          uploadedUsername: loginUser[0].username,
          file: fileDataUrl,
          date: `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`,
          time: `${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`,
          likes: [],
          comments: [],
          caption: captionValue,
        };
        feeds.push(objFeed);
        console.log(feeds);
        alert('Tweeted successfully');
        localStorage.setItem('feeds', JSON.stringify(feeds));
        renderFeeds();
        showTweetPop();
      }
    };
    reader.readAsDataURL(file);
  }
}

function renderFeeds() {
  feedsContainer.innerHTML = "";
  if (feeds.length > 0) {
    feeds.forEach((feed, index) => {
      const likedByCurrentUser = feed.likes.some((like) => like.likedUser == loginUser[0].username);
      const likeIconClass = likedByCurrentUser ? "fas fa-heart liked" : "fas fa-heart";
      
      feedsContainer.innerHTML += `
        <div class="feed">
          <div class="metadata-title">${feed.uploadedUsername}</div>
          <div class="metadata">${feed.date}</div>
          <img src="${feed.file}">
          <div class="caption">${feed.caption}</div>
          <div class='icons-group'>
            <span class="action"><i class="${likeIconClass}" id="likeIcon-${index}" onclick="like(${index})"></i> ${feed.likes.length > 0 ? feed.likes.length : ''}</span>
            <span class="action"><i class="fas fa-comment" onclick="commentPop(${index})"></i> ${feed.comments.length > 0 ? feed.comments.length : ''}</span>
            <span class="action"><a href="${feed.file}" download><i class="fas fa-download"></i></a></span>
          </div>
        </div>
      `;
    });
  } else {
    feedsContainer.innerHTML = `<div class="feed">Feed Is Empty</div>`;
  }
}

renderFeeds();

function like(index: number) {
  const likeUser = feeds[index];
  const likedUser = loginUser[0].username;

  const userLiked = likeUser.likes.some((like) => like.likedUser === likedUser);

  if (!userLiked) {
    const newLike = {
      likedUser: likedUser,
    };
    likeUser.likes.push(newLike);
    localStorage.setItem('feeds', JSON.stringify(feeds));
    renderFeeds();
  }
}
let commentIndex: number;

function commentPop(index: number) {
  commentIndex = index;
  commentBox.style.display = commentBox.style.display === 'none' ? 'grid' : 'none';

  const commentUser = feeds[commentIndex];
  commentsDisplay.innerHTML = '';
  if (commentUser.comments) {
    commentUser.comments.forEach(comment => {
      commentsDisplay.innerHTML += 
      `<div class='comments-card'>
       <label>${comment.commentedUser}</label>
       <label>${comment.comment}</label>
      </div>`;
    });
  }
  postIcon.style.display ='none';
  msgIcon.style.display ='none';

}

function commentsUpload(): void {
  const commentUser = feeds[commentIndex];
  const newComment: CommentType = {
    commentedUser: loginUser[0].username,
    comment: commentText.value
  };
  commentUser.comments = commentUser.comments || [];
  commentUser.comments.push(newComment);
  localStorage.setItem('feeds', JSON.stringify(feeds));
  commentBox.style.display = commentBox.style.display === 'none' ? 'block' : 'none';
  postIcon.style.display = postIcon.style.display === 'none' ? 'grid' : 'none';
  renderFeeds();
}
  
function logoutUserr() {
  console.log(allLoginUsers);
  let indexs = allLoginUsers.findIndex((user, index) => user.username == loginUser[0].username);
  allLoginUsers.splice(indexs, 1);
  localStorage.setItem("loginUser", JSON.stringify(allLoginUsers));
  sessionStorage.clear();
  window.location.href = "../index.html";
  }

function showTweetPop() {
  feedsContainer.style.display = feedsContainer.style.display === 'flex' ? 'none' : 'flex';
  tweetPop.style.display = tweetPop.style.display === 'none' ? 'flex' : 'none';

}

function navigateRecentChats(){
  window.location.href = "./recentChats.html";
}