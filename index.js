console.clear();
if (!CSS.supports("anchor-name: --anchor")) {
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
    const article = document
      .elementFromPoint(x, y)
      .closest("li")
      .querySelector("article");

    if (article !== current) {
      current = article;
      // Set the bounds
      sync();
    }
  };
  articleList.addEventListener("pointermove", update);
  window.addEventListener("resize", sync);
}
