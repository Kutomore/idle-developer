const modalElement = document.getElementById('modal');
const modalOverlays = document.querySelectorAll('.modal--overlay');
const closeBtns = document.querySelectorAll('.modal-close');
const modalTitleElement = document.getElementById('modal--title');
const modalIconElement = document.getElementById('modal--body--icon');
const modalDescriptionElement = document.getElementById('modal--body--description');
const modalBuffsElement = document.getElementById('modal--body--buffs');

function openModal() {
  modalElement.classList.add('open');
}

function closeModal() {
  modalElement.classList.remove('open');
}

function customizeModal(developer) {
  modalTitleElement.innerHTML = developer.name;
  modalIconElement.innerHTML = `<img alt="${developer.name}" class="developer" src="assets/images/employees/${developer.id}.png">`;
  modalDescriptionElement.innerHTML = developer.description;

  let buffs = '<div class="row">' +
    '              <div class="cell">Buff description</div>' +
    '              <div class="cell">Required level</div>' +
    '              <div class="cell">Status</div>' +
    '            </div>';

  developer.buffs.forEach(buff => {
    buffs += `<div class="row">
               <div class="cell">${buff.description}</div>
               <div class="cell">${buff.requiredLevel}</div>
               <div class="cell">${buff.active}</div>
             </div>`
  });

  modalBuffsElement.innerHTML = buffs;
}

function setupModalTriggers() {
  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', function() {
      modalElement.classList.remove('open');
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });
}
