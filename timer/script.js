const UI = document.querySelectorAll('input, button, span, p');
const ui = {};
UI.forEach(elem => (ui[elem.id] = document.querySelector(`#${elem.id}`)));
const { display, minute, second, start, stop, reset, mm, ss } = ui;

let timeleft, counter, sc, mn, countdown;
let pause = false;

[start, stop, reset].forEach(btn => btn.addEventListener('click', controls));
[minute, second].forEach(inp => inp.addEventListener('input', inputs));

stop.disabled = true;
reset.disabled = true;

function init() {
  if (!pause) {
    timeleft = 60;
    mn = +minute.value;
    counter = timeleft - +second.value;
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
    if (+minute.value || +second.value) {
      init();
      [stop, reset].forEach(elem => (elem.disabled = false));
      [start, minute, second].forEach(elem => (elem.disabled = true));
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
    [start, minute, second].forEach(elem => (elem.disabled = false));
    pause = false;
    mm.innerHTML = '';
    ss.innerHTML = '';
    start.innerHTML = 'Start Timer';
  }
}

function inputs(e) {
  let val = +e.target.value;

  val < 0 || val > 60
    ? (alert('nope!'),
      (minute.value = ''),
      (second.value = ''),
      (mm.innerHTML = '00'),
      (ss.innerHTML = '00'))
    : e.target.id == 'minute'
      ? (mm.innerHTML = `${val < 10 ? '0' + val : val}`)
      : (ss.innerHTML = `${val < 10 ? '0' + val : val}`);
}

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
