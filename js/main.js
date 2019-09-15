// Scroll on button click:
$("#begin").on("click", function() {
  // Animate Smooth Scroll (using JQuery):
  const quiz = $('#quiz').offset().top;

  $('body, html').animate({
      scrollTop: quiz
  },
      2000
  );
});

let selectedAnswer = "";

// Adding button click functionality & storing answers:
document.body.querySelectorAll(".abtn").forEach((btn) => {
    btn.addEventListener("click", () => {
        selectedAnswer = btn.innerHTML;
    });
});

//Helper function to wait for user answers:
function userAnswer() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(selectedAnswer);
        }, 15000); //Allows 15sec per question
    });
}

//Helper function to display a message to the screen:
function gameMessage(msg, YorN) {
    var currentContent = document.body.querySelector("#question-content");

    //Create message div:

    if (YorN) {
        var messageDiv = document.createElement("div");
        messageDiv.setAttribute("id", "winner");
        messageDiv.innerHTML = msg;
    }
    else {
        var messageDiv = document.createElement("div");
        messageDiv.setAttribute("id", "loser");
        messageDiv.innerHTML = msg;
    }

    document.body.querySelector("#question-content").replaceWith(messageDiv);
}

// Quiz functionality:
async function startQuiz() {

    let itsHer = true; //To decide if its her or not
    var play = confirm("You will have 15 seconds to answer each question.");

    //Array storing 20 questions paired with their answers:
    var questionArray = [
        //First 10 are easy:
        ["1. Where are you from?", "Lodi, CA"],
        ["2. Where is he from?", "Kalispell, MT"],
        ["3. Where did you graduate college?", "California Baptist University"],
        ["4. What was your Bachelors degree in?", "Liberal Studies"],
        ["5. Where is he going to school?", "University of Montana (The)"],
        ["6. What is he studying?", "Computer Science"],
        ["7. What is your favorite dog breed?", "Golden Retriever"],
        ["8. What is his favorite dog breed?", "Pug"],
        ["9. What is your favorite genre of music?", "Country"],
        ["10. You struggle at:", "Drinking from cups"],

        //Last 10 are difficult:
        ["11. Where did you meet?", "The gym"],
        ["12. Where did you go on your first date?", "Sweet Peaks and Whitefish Beach"],
        ["13. Where did you work that summer?", "S.M. Bradford"],
        ["14. Who were you staying with?", "Grandparents"],
        ["15. Where was your first kiss?", "Lone Pine State Park"],
        ["16. What song reminds him most of you?", "Paris in the Rain by Lauv"],
        ["17. What was your favorite moment together?", "4th of July"],
        ["18. Which two country concerts have you been to together?", "Josh Turner, Rascal Flatts"],
        ["19. How late on average would you get home last summer?", "4 A.M."],
        ["20. Favorite brand of sunglasses?", "Ray-Ban"],
    ];

    //Putting the above into a map:
    var qsAndAs = new Map(questionArray);

    //Array that holds 4 possible answers for each question:
    answerArray = [
        //First 10 As:
        "Riverside, CA", "Lodi, CA", "Pasadena, CA", "Sacramento, CA",
        "Missoula, MT", "Bozeman, MT", "Billings, MT", "Kalispell, MT",
        "Azusa Pacific University", "UC Davis", "California Baptist University", "Stanford University",
        "Psychology", "History", "Graphic Design", "Liberal Studies",
        "Montana State University", "Carroll College", "University of Montana (The)", "Rocky Mountain College",
        "Economics", "Computer Science", "Mathematics", "Engineering",
        "Golden Retriever", "Black Lab", "Poodle", "French Bulldog",
        "Pug", "Chihuahua", "Siberian Husky", "Yorkie Terrier",
        "Hip Hop", "Rock", "Country", "EDM",
        "Sitting still", "Drinking from cups", "Drawing a good picture", "Kicking a soccer ball",

        //Last 10 As:
        "At church", "The gym", "At work", "The bar",
        "Signature Theaters and Woodland Park", "Second Street Pizza and Big Mountain", "Sweet Peaks and Whitefish Beach", "Caseys and Motel 6",
        "Whitefish Lodge", "S.M. Bradford", "Imagination Station", "Glacier Park",
        "Grandparents", "Cousin", "Brother", "Aunt & uncle",
        "Glacier National Park", "Hungry Horse Reservoir", "Whitefish Beach", "Lone Pine State Park",
        "Paris in the Rain by Lauv", "Bless the Broken Road by Rascal Flatts", "More Than Words by Extreme", "Jack & Diane by John Mellencamp",
        "4th of July", "Driving PCH", "Howe Ridge Fire", "Spotted Bear",
        "Luke Bryan, Thomas Rhett", "George Strait, Jason Aldean", "Brad Paisley, Tim McGraw", "Josh Turner, Rascal Flatts",
        "9 P.M.", "10 P.M.", "12 A.M.", "4 A.M.",
        "Oakley", "Tom Ford", "Ray-Ban", "Versace"
    ];

    const winner = "ITS YOU BABE!";
    const winningMsg = "The blessing I feel to have you faithfully by my side goes beyond anything I could put in words here. You make me a much better man of God, and I'll never for a second deserve to have you. I want this for life, and I'll work a lifetime so you'll have nothing short of what you deserve - the best.";

    let questionNum = 0;

    for (let [question, answer] of qsAndAs) {
        let answerIndexes = questionNum * 4;
        var questionDiv = document.body.querySelector("#question-content");

        //Displaying question: 
        var currentQuestion = questionDiv.querySelector("#question-text");
        currentQuestion.innerHTML = question;

        //Displaying answers:
        var answerBtns = questionDiv.querySelectorAll(".abtn");
        for (let count = 0; count < 4; count++) {
            answerBtns.item(count).innerHTML = answerArray[answerIndexes];
            questionDiv.appendChild(answerBtns.item(count));
            answerIndexes++;
        }

        document.querySelector("#question-content").replaceWith(questionDiv);

        //Waiting for answer:
        await userAnswer();


        if (selectedAnswer == answer) {
            //Next question:
            questionNum++;
            selectedAnswer = "";
        }
        else {
            gameMessage("This site isn't for you.");
            itsHer = false;
            break;
        }
    };
    

    if (itsHer) {
        gameMessage(winner, true);

        await userAnswer();

        var forHer = document.createElement("div");
        forHer.setAttribute("id", "winPanel");

        var header = document.createElement("h2");
        header.setAttribute("id", "letterhead");
        header.innerHTML = "Dear Alicia,";

        var text = document.createElement("p");
        text.innerHTML = winningMsg;

        var signature = document.createElement("h2");
        signature.setAttribute("id", "signature");
        signature.innerHTML = "Yours, Brad";

        forHer.append(header);
        forHer.append(text);
        forHer.append(signature);

        document.body.querySelector("#quiz").after(forHer);

        const win = $('#letterhead').offset().top;

        $('html, body').animate({
            scrollTop: 2000
        },
            2000
        );
    }

}