const Questons_data = [
  {
    question: "Pick the option which is completely a fact.",
    options: [
      "Diamond, which is world's most precious jewel, is very costly.",
      'Susan, a veteran dress designer, said, "I think diamonds are precious."',
      "Anyone who comes to to the jewellery market loves gem.",
      "Any woman who wears diamond necklaces is fabulous."],
    correctAns: 'Susan, a veteran dress designer, said, "I think diamonds are precious."'
  },
  {
    question: "Which is the best option to use after many complex sentences in a descriptive essay?",
    options: [
      "Rule of three",
      "Shock tactics",
      "Emotive language",
      "Directly addressing the reader"],
    correctAns: "Shock tactics"
  },
  {
    question: "Which option has all correct spelling?",
    options: [
      "Onomatapoea, Personal Anedote, Imaginary, Rhetorical Question",
      "Personal Anacdote, Onamatopoia, Imagary, Rhethorical Question",
      "Imagery, Rhetorical Question, Personal Anecdote, Onomatopoeia",
      "Rhetoricel Question, Personal Anedote, Onamatopoeia, Imagary"],
    correctAns: "Imagery, Rhetorical Question, Personal Anecdote, Onomatopoeia"
  },
  {
    question: "What is the benefit of using third person tone in narrative writing?",
    options: [
      "To involve writer's emotions",
      "To involve details the character does not know",
      "Both of the above",
      "None of the above"],
    correctAns: "To involve details the character does not know"
  },
  {
    question: "Which option is completely correct in punctuation?",
    options: [
      '"Simon," said Belle, "Can you help me with this?"',
      '"Simon is cooking," said Belle. "so, can you help me with this?"',
      '"Simon," said Belle, "can you help me with this?"',
      '"Simon is cooking." said Belle, "So, can you help me with this?"'],
    correctAns: '"Simon," said Belle, "can you help me with this?"'
  },
  {
    question: "What should not be done in descriptive / narrative writing as a first persona?",
    options: [
      "Describing other characters' emotions",
      "Describing main character's personality",
      "Describing what the main character cannot see",
      "Describing how the main character dies"],
    correctAns: "Describing how the main character dies"
  },
  {
    question: "What is the best option when the audience is around 6 years old?",
    options: [
      "Informal tone",
      "Formal tone",
      "Semiformal tone",
      "Semiformal but mostly informal tone"],
    correctAns: "Semiformal tone"
  },
  {
    question: "Which does 'Comma Splice' mean?",
    options: [
      "Connecting sentences with only comma",
      "Not using comma before FANBOYS",
      "Using comma after a FANBOYS, which is after another semicolon",
      "None of the above"],
    correctAns: "Connecting sentences with only comma"
  },
  {
    question: "Which option can be used with exclamation mark?",
    options: [
      "Minor sentence",
      "Reptition",
      "Onomatopoeia",
      "All of the above"],
    correctAns: "All of the above"
  },
  {
    question: `"An astonishing sight the lamp reveals, for there, within a metre of the door, stretching as far as one could see in the shadows and blocking the entrance of the chamber, stood to all appearance was a solid wall of gold."
    <br><br>The author is witnessing a...?`,
    options: [
      "The light of the lamp",
      "The door",
      "The view of light and shadows",
      "The wall"],
    correctAns: "The wall"
  },
  {
    question: `I'm in the middle of a battle: the worst you can imagine. I had failed this battle for years, not even once nor twice but multiple time. However, it is time to slay the demon: the entrance test.
    <br><br>What type of irony is the paragraph?`,
    options: [
      "Situational irony",
      "Dramatic irony",
      "Verbal irony",
      "None of the above"],
    correctAns: "Dramatic irony"
  },
  {
    question: "What does the prefix 'ped' mean?",
    options: [
      "Foot",
      "Ground",
      "Road",
      "Surface"],
    correctAns: "Foot"
  },
  {
    question: `It was a hallway with hollow silence. Bang! Bang! Bang!
    <br><br> Apart from "Assonance" how many persuasive language has been used?`,
    options: [
      "5",
      "6",
      "3",
      "4e"],
    correctAns: "5"
  }
]

let num = 0, 
trueAnswer = "", 
questionLimit = 5, 
Questons = [],
results = ""

/* --------- display question on load --------- */
window.onload = () => {
  ramdomzie()
  DisplayNext()
}
/* ---- function to ramdomzie the questions --- */
function ramdomzie() {
  let nums = []
  for (let i = 0; i < Questons_data.length; i++) {
    nums.push(i)
  }
  for (var i = nums.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  }
  nums.forEach(n => {
    Questons.push(Questons_data[n])
  })
}

/* ----- display the question and answers ----- */
const wrapper = document.querySelector('.wrapper'),
  DisplayNext = () => {
    ramdomzie()
    console.log("next")
    let input_data = Questons[num],
      /* ------ add options and it values to it ----- */
      option = ""
    input_data.options.forEach(q => {
      let p = q.replace(/\"/g, "~")
      option += `
    <input type="radio" name="options" id="${p}" value="${p}" />
    <label for="${p}">${q}</label><br />`
    })
    /* ------------- display the quiz ------------- */
    document.querySelector('.wrapper').innerHTML = `
  <div class="question">
    <p>${input_data.question}</p>
  </div>
  <div class="options">
    ${option}
  </div>
  <div class="submit">
    <button onclick="Next()" disabled>Next</button>
  </div>`
    let width = Math.round(num / questionLimit * 100)
    document.querySelector('.wrapper').innerHTML += `
  <div class="progress">
    <span style="width:${width}%"></span>
  </div>`
    num++
    trueAnswer = input_data.correctAns.replace(/\"/g, "~")
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
    questionNum: num,
    question: question,
    options: [options[0].value, options[1].value, options[2].value, options[3].value],
    correctAns: trueAnswer,
    chosenAns: chosenValue
  })
  DisplayNext()
  console.log(output_data, num)
  check()
}

/* ---- check if all questions are complted --- */
/* ----------- then show the results ---------- */
function check() {
  if (num == questionLimit) {
    let button = document.querySelector(".submit button")
    button.innerHTML = "Finish"
    button.addEventListener("click", () => {
      let marks = 0
      output_data.forEach((q) => {
        if (q.chosenAns == q.correctAns) {
          marks += 1
        }
      })
      /* -------- show the results and marks -------- */
      document.querySelector('.wrapper').innerHTML = `
      <div class="resultBox">
        <section class="remark">
					<p>Remark</p>
					<p class="mark">${marks} / ${output_data.length}</p>
				</section>
      </div>`
      const resultBox = document.querySelector('.resultBox')
      output_data.forEach(q => {
        let options = ""
        q.options.forEach(option => {
          let o = option.replace(/~/g, "\"")
          let marked = ""
          if (option == q.chosenAns) { marked = "incorrect" }
          if (option == q.correctAns) { marked = "correct" }
          options += `<li class="${marked}">${o}</li>`
        })
        console.log(resultBox)
        resultBox.innerHTML += `
					<div class="result">
						<h3>${`${q.questionNum}. ${q.question}`}</h3>
						<ol>
							${options}
						</ol>
					</div>`
      })
      /* ----- add retry and save results button ---- */
      resultBox.innerHTML += `
      <div class="buttons">
        <button onclick="retry()" class="retry">Retry</button>
        <button onclick="save()" class="save">Save your results</button>
      </div>
      `
      /* --------- Convert result to canvas --------- */
      html2canvas(document.body).then(function (canvas) {
        results = canvas
      })
      console.log("done")
    })
  }
}

/* -------------- retry if u want ------------- */
function retry() {
  num = 0 
  output_data = []
  DisplayNext()
}
/* ---- save ur results as image if u want ---- */
function save() {
  let container = document.querySelector('.container')
  let image = results.toDataURL("image/png")
  container.innerHTML += `
      <div class="canvas">
        <img src="${image}" alt="We can't convert to image" />
        <div class="saveButtons">
         <a href="${image}" download onclick="hide()">Save image</a>
         <button onclick="hide()">Back</button>
        </div>
      </div>`
}
function hide() {
  document.querySelector(".canvas").remove()
}