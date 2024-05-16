console.clear();
const isAnchorSupport = CSS.supports("anchor-name: --anchor");

const support =
  '<div class="callout info"><p>This broswer supports <a href="https://developer.chrome.com/blog/anchor-positioning-api" target=_blank>anchor positioning</a></p></div>';

const notSupport =
  '<div class="callout warning"><p>This broswer doesn\'t support <a href="https://developer.chrome.com/blog/anchor-positioning-api" target=_blank>anchor positioning</a>. But don\'t worry, we have JS to demonstrate 😉</p></div>';

const broswerElm = document.getElementById("browser");

broswerElm.innerHTML = isAnchorSupport ? support : notSupport;

if (!isAnchorSupport) {
  /**
   * Run an event listener on the list.
   * Set the bounding properties based on closest element
   */
  const articleList = document.querySelector("ul");
  articleList.dataset.enhanced = true;

  let current;
  const sync = () => {
    if (current) {
      const bounds = current.getBoundingClientRect();

      articleList.style.setProperty("--top", bounds.top);
      articleList.style.setProperty("--right", bounds.right);
      articleList.style.setProperty("--bottom", bounds.bottom);
      articleList.style.setProperty("--left", bounds.left);
      articleList.style.setProperty("--height", bounds.height);
      articleList.style.setProperty("--width", bounds.width);
    }
  };

  const update = ({ x, y }) => {
    const article = document.elementFromPoint(x, y).closest("li").querySelector("article");

    if (article !== current) {
      current = article;
      // Set the bounds
      sync();
    }
  };
  articleList.addEventListener("pointermove", update);
  window.addEventListener("resize", sync);
}
