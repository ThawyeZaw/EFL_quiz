const Questons = [
  {
    question: "What is....?",
    options: ["Ans1", "Ans2", "Ans3", "Ans4"],
    correctAns: "Ans1"
  },
  {
    question: "What do you call a....?",
    options: ["option1", "option2", "option3", "option4"],
    correctAns: "option1"
  },
  {
    question: "Which would you like....?",
    options: ["Ans1", "Ans2", "Ans3", "Ans4"],
    correctAns: "Ans2"
  },
  {
    question: "Which would you like....?",
    options: ["option1", "option2", "option3", "option4"],
    correctAns: "option2"
  },
  {
    question: "When do you.......?",
    options: ["Ans1", "Ans2", "Ans3", "Ans4"],
    correctAns: "Ans2"
  },
  {
    question: "What is a....?",
    options: ["option1", "option2", "option3", "option4"],
    correctAns: "option1"
  }]
let num = 0, trueAnswer = ""

/* --------- display question on load --------- */
window.onload = () => {
  DisplayNext()
  EnableButton()
}

/* ----- display the question and answers ----- */
const wrapper = document.querySelector('.wrapper'),
  DisplayNext = () => {
    let input_data = Questons[num],
      option = ""
    input_data.options.forEach(q => {
      option += `
    <input type="radio" name="options" id="${q}" value="${q}" />
    <label for="${q}">${q}</label><br />`
    })
    wrapper.innerHTML = `
  <div class="question">
    <p>${input_data.question}</p>
  </div>
  <div class="options">
    ${option}
  </div>
  <div class="submit">
    <button onclick="Next()" disabled>Next</button>
  </div>`
    let width = Math.round(num / Questons.length * 100)
    wrapper.innerHTML += `
  <div class="progress">
    <span style="width:${width}%"></span>
  </div>`
    num++
    trueAnswer = input_data.correctAns
    EnableButton()
  }



/* - disable the button till answer is chosen - */
const EnableButton = () => {
  document.querySelectorAll("label").forEach(label => {
    label.addEventListener("click", () => {
      document.querySelector(".submit button").disabled = false
    })
  })
}

/* -- add chosen answer to the output object -- */
let output_data = []
const Next = () => {
  let question = document.querySelector(".question p").innerText,
    options = document.querySelectorAll('input[type="radio"]'),
    chosenValue = document.querySelector('input[type="radio"]:checked').value
  output_data.push({
    question: question,
    options: [options[0].value, options[1].value, options[2].value, options[3].value],
    correctAns: trueAnswer,
    chosenAns: chosenValue
  })
  console.log(output_data)
  DisplayNext()
  check()
}

/* ---- check if all questions are complted --- */
/* ----------- then show the results ---------- */
function check() {
  if (output_data.length == 4) {
    let button = document.querySelector(".submit button")
    button.innerHTML = "Finish"
    button.addEventListener("click", () => {
      let marks = 0
      output_data.forEach((q) => {
        if (q.chosenAns == q.correctAns) {
          marks += 1
        }
      })
      wrapper.innerHTML = `
      <div class="resultBox">
        <section class="remark">
					<p>Remark</p>
					<p>${marks} / ${output_data.length}</p>
				</section>
      </div>`
      const resultBox = document.querySelector('.resultBox')
      output_data.forEach(q => {
        let options = ""
        q.options.forEach(option => {
          let marked = ""
          if (option == q.chosenAns) { marked = "incorrect" }
          if (option == q.correctAns) { marked = "correct" }
          options += `<li class="${marked}">${option}</li>`
        })
        resultBox.innerHTML += `
					<div class="result">
						<h2>${q.question}</h2>
						<ol>
							${options}
						</ol>
					</div>`
      })
      resultBox.innerHTML += `
      <div class="buttons">
        <button onclick="retry()" class="retry">Retry</button>
        <button onclick="save()" class="save">Save your results</button>
      </div>
      `
    })
  }
}

/* -------------- retry if u want ------------- */
function retry() {
  num = 0
  DisplayNext()
  EnableButton()
  output_data = []
}

function save() {
  html2canvas(document.body).then(function (canvas) {
    let container = document.querySelector('.container')
    // console.log(canvas.toDataURL("image/png"))
    let image = canvas.toDataURL("image/png")
    container.innerHTML += `
    <div class="canvas">
      <img src="${image}" alt="SOMETHING WENT WRONG!" />
    </div>`
    // container.querySelector(".canvas").appendChild(canvas);
  });
}