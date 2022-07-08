const useScrollHandler = () => {
  const ele = document.getElementById('scroll-container');
  let pos = { top: 0, left: 0, x: 0, y: 0 };

  const mouseUpHandler = function (e) {
    // e.target.classList.remove('.dragging')
    e.preventDefault()
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);

    ele.style.cursor = 'grab';
    ele.style.removeProperty('user-select');
  };

  const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element
    ele.scrollTop = pos.top - dy;
    ele.scrollLeft = pos.left - dx;
  };

  const mouseDownHandler = function (e) {
      // e.target.classList.add('.dragging')
      ele.style.cursor = 'grabbing';
      ele.style.userSelect = 'none';

      pos = {
          // The current scroll
          left: ele.scrollLeft,
          top: ele.scrollTop,
          // Get the current mouse position
          x: e.clientX,
          y: e.clientY,
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', () => mouseUpHandler(e));
  };

  return mouseDownHandler;
}

export default useScrollHandler;