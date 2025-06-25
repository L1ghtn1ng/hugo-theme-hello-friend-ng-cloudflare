/**
 * Code Copy - Adds copy buttons to code blocks
 */
document.addEventListener('DOMContentLoaded', function() {
  // Find all <pre> elements that contain <code> blocks
  const codeBlocks = document.querySelectorAll('pre > code');

  if (codeBlocks.length === 0) return;

  // Create and add copy buttons to each code block
  codeBlocks.forEach(function(codeBlock) {
    const pre = codeBlock.parentNode;

    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');
    copyButton.setAttribute('title', 'Copy to clipboard');
    copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';

    // Position the button
    pre.style.position = 'relative';

    // Add button to pre element
    pre.appendChild(copyButton);

    // Add click event listener
    copyButton.addEventListener('click', function() {
      // Get the text content
      const code = codeBlock.textContent;

      // Copy to clipboard
      navigator.clipboard.writeText(code).then(
        function() {
          // Success feedback
          copyButton.classList.add('copied');
          copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>';

          // Reset after 2 seconds
          setTimeout(function() {
            copyButton.classList.remove('copied');
            copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
          }, 2000);
        },
        function() {
          // Error feedback
          copyButton.classList.add('error');
          copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';

          // Reset after 2 seconds
          setTimeout(function() {
            copyButton.classList.remove('error');
            copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
          }, 2000);
        }
      );
    });
  });
});
