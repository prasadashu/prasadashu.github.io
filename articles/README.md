# Articles

This folder contains all the articles for the portfolio website.

## Adding a New Article

1. Create a new folder (e.g., `articles/my-new-post/`).
2. Add your cover image inside it (must be named `cover.jpg`).
3. Add a `content.html` file inside it with your article's text formatted in HTML.
4. Open the root `js/articles.js` file and add a new entry to the array pointing to your new folder:

```javascript
{
    id: 4,
    title: "My New Post Title",
    description: "A short snippet that shows up on the feed card.",
    image: "./articles/my-new-post/cover.jpg",
    contentUrl: "./articles/my-new-post/content.html",
    tags: ["Tag1", "Tag2"],
    date: "Date"
}
```
