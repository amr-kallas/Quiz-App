let type = (document.querySelector(".info span").innerHTML = "Islamic");
let quizNum = document.querySelector(".count span");
let quizContainer = document.querySelector(".quiz");
let bullet = document.querySelector(".spans-circle");
let button = document.querySelector("button");
let footer = document.querySelector(".footer");
let timer = document.querySelector(".timer");
let minute = document.querySelector(".min");
let second = document.querySelector(".sec");

//option

let currentIndex = 0;

let correctAnswer = 0;

let countDown;

//Get The Question From Json

let fet = fetch("question.json")
  .then((data) => {
    return data.json();
  })

  .then((data) => {
    //Random Question

    let keysObject = [...Array.from([...data]).keys()];

    random(keysObject);

    let quizCount = data.length;

    quizNum.innerHTML = quizCount;

    setdata(data[keysObject[currentIndex]], quizCount);

    countTimeDown(10, quizCount);

    button.onclick = function () {
      //Know The Correct Answer

      if (currentIndex < quizCount) {
        checkAnswer(data[keysObject[currentIndex]].rightAnswer, quizCount);
      }

      currentIndex++;

      quizContainer.innerHTML = "";

      if (currentIndex != quizCount) {
        setdata(data[keysObject[currentIndex]], quizCount);
      }

      handleBullet(currentIndex, quizCount);

      clearInterval(countDown);

      countTimeDown(10, quizCount);

      showResult(quizCount);
    };
    bullets(quizCount);
  });

//Show The Question

function setdata(data, qcount) {
  if (currentIndex <= qcount) {
    let h3 = document.createElement("h3");

    h3.innerHTML = data.title;

    quizContainer.appendChild(h3);

    let answers = document.createElement("div");

    answers.className = "answers";

    quizContainer.appendChild(answers);

    let ans = 0;

    for (let i = 0; i < 4; i++) {
      ans++;

      let answer = document.createElement("div");

      answer.className = "answer";

      answers.appendChild(answer);

      let input = document.createElement("input");

      input.type = "radio";

      input.name = "question";

      input.id = `answer_${ans}`;

      input.dataset.answer = data[`answer${ans}`];

      if (i == 0) input.checked = true;
      {
        answer.appendChild(input);
      }

      let label = document.createElement("label");

      label.htmlFor = input.id;

      label.innerHTML = data[`answer${ans}`];

      answer.appendChild(label);
    }
  }
}

//Show The Bullet Span

function bullets(count) {
  for (let i = 0; i < count; i++) {
    let bul = document.createElement("span");

    if (i == 0) {
      bul.className = "on";
    }

    bullet.appendChild(bul);
  }
}

//Coloring The Bullet When Go To The Next Question

function handleBullet(currentIndex, qcount) {
  if (currentIndex < qcount) {
    let spans = document.querySelectorAll(".spans-circle span");

    for (let i = 0; i <= currentIndex; i++) {
      spans[i].className = "on";
    }
  }
}

//Check The Right Answer

function checkAnswer(rightAnswer, qcount) {
  if (currentIndex < qcount) {
    let name = document.getElementsByName("question");

    name.forEach((name) => {
      if (name.checked && name.dataset.answer == rightAnswer) {
        correctAnswer++;
      }
    });
  }
}

function countTimeDown(duration, qcount) {
  if (currentIndex < qcount - 1) {
    let min, sec;
    countDown = setInterval(() => {
      min = parseInt(duration / 60);

      sec = parseInt(duration % 60);

      minute.innerHTML = min < 10 ? `0${min}` : min;

      second.innerHTML = sec < 10 ? `0${sec}` : sec;

      if (duration == 0) {
        clearInterval(countDown);

        button.click();
      }

      duration--;
    }, 1000);
  }
}

function showResult(qcount) {
  if (currentIndex == qcount) {
    quizContainer.remove();

    bullet.remove();

    timer.remove();

    button.remove();

    let span = document.createElement("span");

    let correct = document.createElement("span");

    correct.innerHTML = `اجاباتك الصحيحة هي: ${correctAnswer}`;

    footer.appendChild(span);

    footer.appendChild(correct);

    footer.style.direction = "rtl";

    if (correctAnswer >= qcount - 2) {
      span.innerHTML = `<span class="perfect">أحسنت </span> معلوماتك في السيرة النبوية ممتازة`;
    } else if (correctAnswer >= qcount / 2) {
      span.innerHTML = `<span class="good">أحسنت </span> معلوماتك في السيرة النبوية جيدة`;
    } else {
      span.innerHTML = `<span class="bad">سيء </span> واااسفاه`;
    }
  }
}

function random(Array) {
  let target, pre;

  let size = Array.length - 1;

  while (size > 0) {
    target = Array[size];

    pre = Math.floor(Math.random() * size);

    Array[size] = Array[pre];

    Array[pre] = target;

    size--;
  }

  return Array;
}
