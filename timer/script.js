const UI = document.querySelectorAll('button, span, p, #ssbar, #mmbar');
const ui = {};
UI.forEach(elem => (ui[elem.id] = document.querySelector(`#${elem.id}`)));
const { display, start, stop, reset, mm, ss, ssbar, mmbar } = ui;

// #region timer
let timeleft, counter, sc, mn, countdown, bar_ratio;
let pause = false;
ssbar.style.width = '420px';

[start, stop, reset].forEach(btn => btn.addEventListener('click', controls));
[mm, ss].forEach(ms => {
  ms.addEventListener('input', inputs);
  ms.addEventListener('keydown', inputs);
});

[start, stop, reset].forEach(ctrl => (ctrl.disabled = true));

function init() {
  if (!pause) {
    timeleft = 60;
    mn = +mm.textContent;
    counter = timeleft - +ss.textContent;
    sc = timeleft - counter;
    bar_ratio = Math.floor(420 / sc);
    countdown = setInterval(timer, 1000);
  } else {
    mn = mn;
    counter = counter;
    sc = sc;
    countdown = setInterval(timer, 1000);
  }
}

function controls(e) {
  if (e.target.id == 'start') {
    if (+mm.textContent || +ss.textContent) {
      init();
      [stop, reset].forEach(elem => (elem.disabled = false));
      start.disabled = true;
    } else {
      alert('nope!! -_-');
    }
  } else if (e.target.id == 'stop') {
    pause = true;
    stop.disabled = true;
    start.innerHTML = 'Resume';
    start.disabled = false;
    clearInterval(countdown);
  } else {
    clearInterval(countdown);
    [start, reset, stop].forEach(ctrl => (ctrl.disabled = true));
    pause = false;
    mm.innerHTML = '00';
    ss.innerHTML = '00';
    start.innerHTML = 'Start';
  }
}

function inputs(e) {
  if (e.type === 'input') {
    start.disabled = !(+mm.textContent || +ss.textContent);
  } else {
    if (e.keyCode === 38) {
      e.target.innerHTML =
        +e.target.innerHTML >= 0
          ? +e.target.innerHTML + 1 < 10
            ? `0${+e.target.innerHTML + 1}`
            : +e.target.innerHTML + 1
          : '00';
    } else if (e.keyCode === 40) {
      e.target.innerHTML = +e.target.innerHTML
        ? +e.target.innerHTML - 1 < 10
          ? `0${+e.target.innerHTML - 1}`
          : +e.target.innerHTML - 1
        : '00';
    }
    start.disabled = !(+mm.textContent || +ss.textContent);
  }
}

function timer() {
  !counter ? mn-- : false;
  counter++;
  sc = !sc
    ? ((counter = 1),
      mn == 0
        ? (clearInterval(countdown),
          (counter = 60),
          (stop.disabled = true),
          (reset.disabled = true))
        : mn--,
      timeleft - counter)
    : timeleft - counter;
  mm.innerHTML = `${mn < 10 ? '0' + mn : mn}`;
  ss.innerHTML = `${sc < 10 ? '0' + sc : sc}`;
  
  let s = ssbar.style.width.replace(/\D/g, '');
  let m = mmbar.style.width.replace(/\D/g, '');
  ssbar.style.width = `${+s - bar_ratio}px`;
  mmbar.style.width = `${+m - bar_ratio}px`;
}
// #endregion timer
