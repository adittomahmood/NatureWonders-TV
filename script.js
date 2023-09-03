const allBtn = document.getElementById("all-btn");
const musicBtn = document.getElementById("music-btn");
const comedyBtn = document.getElementById("comedy-btn");
const drawingBtn = document.getElementById("drawing-btn");
let displayedVideoData = [];

allBtn.classList.add("btn-active");

allBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const categoryId = event.target.getAttribute("data-category-id");
  toggleButtons(allBtn, musicBtn, comedyBtn, drawingBtn);
  fetchVideosByCategory(categoryId);
});

musicBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const categoryId = event.target.getAttribute("data-category-id");
  toggleButtons(musicBtn, allBtn, comedyBtn, drawingBtn);
  fetchVideosByCategory(categoryId);
});

comedyBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const categoryId = event.target.getAttribute("data-category-id");
  toggleButtons(comedyBtn, allBtn, musicBtn, drawingBtn);
  fetchVideosByCategory(categoryId);
});

drawingBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const categoryId = event.target.getAttribute("data-category-id");
  toggleButtons(drawingBtn, allBtn, musicBtn, comedyBtn);
  hideVideos();
  displayError();
  fetchVideosByCategory(categoryId);
});

function toggleButtons(activeBtn, ...buttonsToDisable) {
  activeBtn.classList.add("btn-active");
  buttonsToDisable.forEach((btn) => {
    btn.classList.remove("btn-active");
    btn.disabled = false;
  });
  activeBtn.disabled = true;

  if (activeBtn !== drawingBtn) {
    hideErrorMessage();
  }
}

allBtn.disabled = true;

function hideVideos() {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";
}

function displayError() {
  const errorImage = document.getElementById("error-image");
  const errorMessage = document.getElementById("error-message");
  errorImage.classList.remove("hidden");
  errorMessage.classList.remove("hidden");
}

function hideErrorMessage() {
  const errorImage = document.getElementById("error-image");
  const errorMessage = document.getElementById("error-message");
  errorImage.classList.add("hidden");
  errorMessage.classList.add("hidden");
}

function createVideoCard(videoData) {
  const card = document.createElement("div");
  card.classList.add(
    "card",
    "w-70",
    "h-96",
    "bg-white",
    "rounded-lg",
    "shadow-lg",
    "overflow-hidden",
    "transition-transform",
    "transform",
    "scale-100",
    "hover:scale-105"
  );

  const figure = document.createElement("figure");
  figure.classList.add("relative", "group", "h-96");

  const thumbnail = document.createElement("img");
  thumbnail.src = videoData.thumbnail;
  thumbnail.alt = videoData.title;
  thumbnail.classList.add("w-full", "h-full", "object-cover");

  const gradientOverlay = document.createElement("div");
  gradientOverlay.classList.add(
    "absolute",
    "inset-0",
    "bg-gradient-to-b",
    "from-transparent",
    "to-black",
    "opacity-50",
    "group-hover:opacity-70",
    "transition-opacity",
    "duration-300"
  );

  const playIcon = document.createElement("svg");
  playIcon.classList.add(
    "w-16",
    "h-16",
    "text-white",
    "absolute",
    "top-1/2",
    "left-1/2",
    "transform",
    "-translate-x-1/2",
    "-translate-y-1/2",
    "opacity-0",
    "group-hover:opacity-100",
    "transition-opacity",
    "duration-300"
  );
  playIcon.innerHTML = `<use xlink:href="#play" />`;

  const watchNowButton = document.createElement("button");
  watchNowButton.classList.add(
    "bg-blue-500",
    "text-white",
    "font-semibold",
    "px-4",
    "py-2",
    "rounded-full",
    "absolute",
    "bottom-6",
    "right-6",
    "opacity-0",
    "group-hover:opacity-100",
    "transition-opacity",
    "duration-300",
    "cursor-pointer"
  );
  watchNowButton.textContent = "Watch Now";

  gradientOverlay.appendChild(playIcon);
  figure.appendChild(thumbnail);
  figure.appendChild(gradientOverlay);
  figure.appendChild(watchNowButton);

  const cardBody = document.createElement("div");
  cardBody.classList.add(
    "card-body",
    "p-4",
    "bg-gray-100",
    "text-gray-800",
    "rounded-b-lg"
  );

  const authorContainer = document.createElement("div");
  authorContainer.classList.add("flex", "items-center", "mb-4");

  const authorImage = document.createElement("img");
  authorImage.src = videoData.authors[0].profile_picture;
  authorImage.alt = videoData.authors[0].profile_name;
  authorImage.classList.add(
    "w-12",
    "h-12",
    "rounded-full",
    "mr-4",
    "border-2",
    "border-blue-400"
  );

  const authorName = document.createElement("p");
  authorName.textContent = videoData.authors[0].profile_name;
  authorName.classList.add(
    "author-name",
    "text-lg",
    "font-semibold",
    "text-blue-500"
  );

  const title = document.createElement("h2");
  title.classList.add("card-title", "text-xl", "font-semibold", "mb-2");
  title.textContent = videoData.title;

  const views = document.createElement("p");
  views.textContent = `Views: ${videoData.others.views}`;

  authorContainer.appendChild(authorImage);
  authorContainer.appendChild(authorName);

  cardBody.appendChild(authorContainer);
  cardBody.appendChild(title);
  cardBody.appendChild(views);

  card.appendChild(figure);
  card.appendChild(cardBody);

  const postedDateInSeconds = videoData.others.posted_date;
  const postedDate = new Date(postedDateInSeconds * 1000);

  const hours = postedDate.getUTCHours();
  const minutes = postedDate.getUTCMinutes();
  const seconds = postedDate.getUTCSeconds();

  const formattedPostedDate = `${hours}h ${minutes}m ${seconds}s`;

  const timestamp = document.createElement("span");
  timestamp.textContent = formattedPostedDate;
  timestamp.classList.add(
    "absolute",
    "bottom-4",
    "left-4",
    "bg-black",
    "text-white",
    "p-1",
    "text-sm",
    "rounded"
  );

  figure.appendChild(timestamp);

  authorContainer.classList.add("flex", "items-center", "mb-4");

  authorImage.src = videoData.authors[0].profile_picture;
  authorImage.alt = videoData.authors[0].profile_name;
  authorImage.classList.add(
    "w-12",
    "h-12",
    "rounded-full",
    "mr-4",
    "border-2",
    "border-blue-400"
  );

  authorName.textContent = videoData.authors[0].profile_name;
  authorName.classList.add(
    "author-name",
    "text-lg",
    "font-semibold",
    "text-blue-500"
  );
  if (videoData.authors[0].verified) {
    const verificationIcon = document.createElement("span");
    verificationIcon.innerHTML = "✔️";
    verificationIcon.classList.add("ml-2", "text-green-500");
    authorName.appendChild(verificationIcon);
  }

  title.classList.add("card-title", "text-xl", "font-semibold", "mb-2");

  views.textContent = `Views: ${videoData.others.views}`;

  authorContainer.appendChild(authorImage);
  authorContainer.appendChild(authorName);

  cardBody.appendChild(authorContainer);
  cardBody.appendChild(title);
  cardBody.appendChild(views);

  card.appendChild(figure);
  card.appendChild(cardBody);

  return card;
}

function displayVideos(videoDataArray) {
  const main = document.querySelector("main");
  main.innerHTML = "";
  hideErrorMessage();

  for (const videoData of videoDataArray) {
    const card = createVideoCard(videoData);
    main.appendChild(card);
  }
}

function sortByViews(videoDataArray) {
  return videoDataArray.sort((a, b) => {
    const viewsA = parseInt(a.others.views.replace("K", ""));
    const viewsB = parseInt(b.others.views.replace("K", ""));
    return viewsB - viewsA;
  });
}

async function fetchVideosByCategory(categoryId) {
  try {
    let resource = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    );
    let resourceJson = await resource.json();

    if (
      resourceJson.status &&
      resourceJson.data &&
      resourceJson.data.length > 0
    ) {
      displayedVideoData = resourceJson.data;
      displayVideos(displayedVideoData);
    } else {
      console.error("No video data found.");
    }
  } catch (error) {
    console.error("Error fetching video data:", error);
  }
}

const categoryTabs = document.querySelectorAll(".category-tab");
categoryTabs.forEach((tab) => {
  tab.addEventListener("click", (event) => {
    event.preventDefault();
    const categoryId = event.target.getAttribute("data-category-id");
    fetchVideosByCategory(categoryId);
  });
});

async function loadInitialVideos() {
  try {
    const categoryId = 1000;
    let resource = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    );
    let resourceJson = await resource.json();

    if (
      resourceJson.status &&
      resourceJson.data &&
      resourceJson.data.length > 0
    ) {
      displayedVideoData = resourceJson.data;
      const sortByViewButton = document.querySelector(".btn-sort-by-view");
      sortByViewButton.addEventListener("click", () => {
        displayedVideoData = sortByViews(displayedVideoData);
        displayVideos(displayedVideoData);
      });
      displayVideos(displayedVideoData);
    } else {
      console.error("No video data found.");
    }
  } catch (error) {
    console.error("Error fetching video data:", error);
  }
}

window.addEventListener("load", loadInitialVideos);
