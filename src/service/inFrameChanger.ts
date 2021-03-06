export function inFrameChanger() {

  // Hide Some Elements if app is in iFrame
  if (window != window.top) {

    let header = document.getElementById('header');
    if (header != null) {
      header.parentNode.removeChild(header);
    }

    let quizLabel = document.getElementById('menu');
    if (quizLabel != null) {
      quizLabel.parentNode.removeChild(quizLabel);
    }

    let hudElement = document.getElementById('hud');
    if (hudElement != null) {
      hudElement.style.width = '100%';
      hudElement.style.marginTop = '0';
    }

    let containerElement = document.getElementById('container__content');
    if (containerElement != null) {
      containerElement.style.padding = '0';
      containerElement.style.marginBottom = '0';
    }

    let restartBtn = document.getElementById('btn__container');
    if (restartBtn != null) {
      restartBtn.parentNode.removeChild(restartBtn);
      containerElement.appendChild(restartBtn);
      restartBtn.style.marginTop = '20px';
    }

    let congratContainerEl = document.getElementById('congratContainer');
    if (congratContainerEl != null) {
      congratContainerEl.style.height = '360px';
    }

    let containerHeader = document.getElementById('container__header');
    if (containerHeader != null) {
      containerHeader.style.marginTop = '0rem';
      containerHeader.style.padding = '0 1.5rem 0';
    }

  }
}
