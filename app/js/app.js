const body = document.querySelector("body");
const header = document.querySelector(".header");
const fadeItems = document.querySelectorAll(".has-fade");
const navToggler = document.querySelector(".header__toggle");

navToggler.addEventListener("click", function () {
    if (header.classList.contains("open")) { // Close Hamburger Menu 
        body.classList.remove("noscroll");
        header.classList.remove("open");
        fadeItems.forEach(function (element) {
            element.classList.remove("fade-in");
            element.classList.add("fade-out");
        });
    }
    else { // Open Hamburger Menu
        body.classList.add("noscroll");
        header.classList.add("open");
        fadeItems.forEach(function (element) {
            element.classList.remove("fade-out");
            element.classList.add("fade-in");
        });
    }
});

// Links
const links = document.querySelectorAll("a[href='#']");
links.forEach(link => link.addEventListener("click", (e) => {
    e.preventDefault();
}));

// Shorten Form Submit
const form = document.querySelector(".shorten__form");
const urlInput = document.querySelector("#url");
const emptyText = document.querySelector(".empty-text");
const shortenLinks = document.querySelector(".shorten__links");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const value = urlInput.value;

    if (value === "") {
        urlInput.classList.add("empty");
        emptyText.classList.add("show");
    } else {
        const response = await fetch("https://api-ssl.bitly.com/v4/shorten", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.API_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "long_url": value, "domain": "bit.ly" })
        });
        const data = await response.json();

        // display Data
        const shortLink = document.createElement("div");
        shortLink.classList.add("short-link", "grid", "grid-ai-c");
        shortLink.innerHTML = `<p>${value}</p>
            <div class="flex flex-ai-c">
            <p>${data.link}</p>
            <a href="#" class="button copy-btn">Copy</a>
            </div>`;

        const copyBtn = shortLink.querySelector(".copy-btn");
        copyBtn.addEventListener("click", function (e) {
            e.preventDefault();
            this.innerText = "Copied!";
            this.classList.add("copied");
            navigator.clipboard.writeText(data.link);
        });

        shortenLinks.append(shortLink);
        urlInput.classList.remove("empty");
        emptyText.classList.remove("show");
    }
});