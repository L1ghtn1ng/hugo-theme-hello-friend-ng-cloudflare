/**
 * Posts Feed - Fetches and displays blog posts from JSON feed
 */
document.addEventListener('DOMContentLoaded', function() {
  const postsContainer = document.getElementById('posts-feed');

  // Only proceed if we're on a page with the posts container
  if (!postsContainer) return;

  // Fetch the JSON feed
  // Get the URL from the link tag in the head
  const jsonFeedLink = document.querySelector('link[type="application/json"]');

  // Try multiple possible URLs for the JSON feed
  const possibleUrls = [
    jsonFeedLink ? jsonFeedLink.href : null,
    window.location.origin + '/index.json',
    window.location.origin + '/feed.json',
    window.location.href.replace(/\/$/, '') + '/index.json',
    window.location.href.replace(/\/$/, '') + '/feed.json'
  ].filter(Boolean); // Remove null values

  // Function to try fetching from each URL until one succeeds
  function tryFetch(urls, index = 0) {
    if (index >= urls.length) {
      throw new Error('Could not fetch JSON feed from any of the possible URLs');
    }

    return fetch(urls[index])
      .then(response => {
        if (!response.ok) {
          console.log(`Failed to fetch from ${urls[index]}, trying next URL...`);
          return tryFetch(urls, index + 1);
        }
        console.log(`Successfully fetched JSON feed from ${urls[index]}`);
        return response.json();
      })
      .catch(error => {
        console.log(`Error fetching from ${urls[index]}: ${error.message}`);
        return tryFetch(urls, index + 1);
      });
  }

  // Try fetching from each possible URL
  tryFetch(possibleUrls)
    .then(posts => {
      if (!Array.isArray(posts) || posts.length === 0) {
        postsContainer.innerHTML = '<p>No posts found.</p>';
        return;
      }

      // Sort posts by date (newest first)
      posts.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Display the posts
      const postsHTML = posts.map(post => `
        <article class="post-card">
          <div class="post-card-content">
            <h2 class="post-card-title">
              <a href="${post.permalink}">${post.title}</a>
            </h2>
          </div>
        </article>
      `).join('');

      postsContainer.innerHTML = postsHTML;
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
      postsContainer.innerHTML = '<p>Failed to load posts. Please try again later.</p>';
    });
});
