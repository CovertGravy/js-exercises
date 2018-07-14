const UI = document.querySelectorAll('button, span, p');
const ui = {};
UI.forEach(elem => (ui[elem.id] = document.querySelector(`#${elem.id}`)));
const { display, start, stop, reset, mm, ss } = ui;

let timeleft, counter, sc, mn, countdown;
let pause = false;

[start, stop, reset].forEach(btn => btn.addEventListener('click', controls));

stop.disabled = true;
reset.disabled = true;

function init() {
  if (!pause) {
    timeleft = 60;
    mn = +mm.textContent;
    counter = timeleft - +ss.textContent;
    sc = timeleft - counter;
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
    start.innerHTML = 'Resume Timer';
    start.disabled = false;
    clearInterval(countdown);
    console.table({ timeleft, counter, sc, mn, countdown, pause });
  } else {
    clearInterval(countdown);
    start.disabled = false;
    pause = false;
    mm.innerHTML = '00';
    ss.innerHTML = '00';
    start.innerHTML = 'Start Timer';
  }
}

// function inputs(e) {
//   let val = +e.target.value;

//   val < 0 || val > 60
//     ? (alert('nope!'),
//       (minute.value = ''),
//       (second.value = ''),
//       (mm.innerHTML = '00'),
//       (ss.innerHTML = '00'))
//     : e.target.id == 'minute'
//       ? (mm.innerHTML = `${val < 10 ? '0' + val : val}`)
//       : (ss.innerHTML = `${val < 10 ? '0' + val : val}`);
// }

function timer() {
  !counter ? mn-- : false;
  counter++;
  sc = !sc
    ? ((counter = 1),
      mn == 0 ? (clearInterval(countdown), (counter = 60)) : mn--,
      timeleft - counter)
    : timeleft - counter;
  mm.innerHTML = `${mn < 10 ? '0' + mn : mn}`;
  ss.innerHTML = `${sc < 10 ? '0' + sc : sc}`;
}
