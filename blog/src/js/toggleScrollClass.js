const removeClassOnScroll = (els, activeClass) => {
  [].forEach.call(els, el => {
    el.classList.remove(activeClass);
  });
};

const addClassOnScroll = (els, activeClass) => {
  [].forEach.call(els, el => {
    el.classList.add(activeClass);
  });
};

export default className => {
  const els = document.getElementsByClassName(className);
  const activeClass = `${className}--active`;
  let { scrollY: scrollPosition } = window;

  if (els !== null) {
    let didScroll = false;

    const checkScrollPosition = () => {
      didScroll = true;
    };

    window.addEventListener("scroll", checkScrollPosition);

    setInterval(() => {
      if (didScroll) {
        didScroll = false;
        scrollPosition = window.scrollY;
        if (scrollPosition > 60) {
          addClassOnScroll(els, activeClass);
        } else {
          removeClassOnScroll(els, activeClass);
        }
      }
    }, 300);
  }
};
