// Get current user & users data from localStorage
let currentUser = localStorage.getItem('currentUser');
let users = JSON.parse(localStorage.getItem('users') || '{}');

if(!currentUser || !users[currentUser]) {
  alert('Please login first!');
  window.location.href = 'index.html';
}

// Update coin balance display
const coinBalanceElem = document.getElementById('coinBalance');
function updateCoins() {
  coinBalanceElem.textContent = `Coins: ${users[currentUser].coins}`;
}

// ৫০+ কুইজের ডেটা (প্রত্যেকের জন্য প্রশ্ন + সঠিক উত্তর)
const quizData = [
  {q: "বাংলাদেশের রাজধানী কোথায়?", a: "ঢাকা"},
  {q: "সর্ববৃহৎ মহাদেশ কোনটি?", a: "আশিয়া"},
  {q: "পৃথিবীর সবচেয়ে বড় সাগর কোনটি?", a: "প্যাসিফিক"},
  {q: "মানব দেহে কতটি হাড় আছে?", a: "২০৬"},
  {q: "গ্রহাণু বান্ধব কোন বিজ্ঞান?", a: "জিওলজি"},
  {q: "বাংলাদেশের স্বাধীনতা কবে লাভ করে?", a: "১৯৭১"},
  {q: "বাংলা ভাষার প্রথম কবি কে?", a: "বিদ্যাসাগর"},
  {q: "ইন্টারনেট আবিষ্কার করেন কে?", a: "টিম বার্নার্স-লি"},
  {q: "সৌরজগতে সবচেয়ে বড় গ্রহ কোনটি?", a: "বৃহস্পতি"},
  {q: "মানব শরীরের সবচেয়ে বড় অঙ্গ কোনটি?", a: "ত্বক"},
  {q: "বাংলাদেশের জাতীয় ফুল কি?", a: "শাপলা"},
  {q: "পৃথিবীর সবচেয়ে বড় প্রাণী কোনটি?", a: "নীল তিমি"},
  {q: "বাংলাদেশের জাতীয় পশু কি?", a: "বেড়াল"},
  {q: "বাংলাদেশের জাতীয় পাখি কি?", a: "রাজহাঁস"},
  {q: "সর্বপ্রথম মোবাইল ফোন কে আবিষ্কার করেন?", a: "মার্টিন কুপার"},
  {q: "মানব শরীরের সবচেয়ে শক্ত হাড় কোনটি?", a: "জিহ্বা"},
  {q: "সাধারণত একটি বছর কত দিন হয়?", a: "৩৬৫"},
  {q: "বাংলাদেশের জাতীয় সংগীত কোনটি?", a: "আমার সোনার বাংলা"},
  {q: "কম্পিউটার প্রথম আবিষ্কার হয় কবে?", a: "১৯৪০"},
  {q: "সবচেয়ে ছোট পরমাণু কোনটি?", a: "হাইড্রোজেন"},
  {q: "বাংলাদেশের স্বাধীনতা দিবস কবে?", a: "২৬ মার্চ"},
  {q: "সাধারণত পানি কত ডিগ্রি তাপে ফ্রিজ হয়?", a: "০ ডিগ্রি"},
  {q: "পৃথিবীর সবচেয়ে বড় দ্বীপ কোনটি?", a: "গ্রিনল্যান্ড"},
  {q: "বঙ্গবন্ধু শেখ মুজিবুর রহমানের জন্মদিন কবে?", a: "১৭ মার্চ"},
  {q: "বাংলাদেশের জাতীয় খেলা কোনটি?", a: "কাবাডি"},
  {q: "আলবার্ট আইনস্টাইন কোন দেশের নাগরিক ছিলেন?", a: "জার্মানী"},
  {q: "বাংলাদেশের প্রথম প্রধানমন্ত্রী কে ছিলেন?", a: "শেখ মুজিবুর রহমান"},
  {q: "বাংলাদেশের জাতীয় ফল কোনটি?", a: "আম"},
  {q: "পৃথিবীর সবচেয়ে বড় নদী কোনটি?", a: "আমাজন"},
  {q: "সবচেয়ে বড় গ্রহ কোনটি?", a: "বৃহস্পতি"},
  {q: "মানব শরীরের সবচেয়ে ছোট হাড় কোনটি?", a: "স্ট্যাপিস"},
  {q: "বাংলাদেশের সর্বোচ্চ পর্বত কোনটি?", a: "তিতুমীর"},
  {q: "মহাত্মা গান্ধী কোন দেশের স্বাধীনতা আন্দোলনের নেতা ছিলেন?", a: "ভারত"},
  {q: "বাংলাদেশের জাতীয় ফুলের বৈজ্ঞানিক নাম কি?", a: "নিমফিয়া"},
  {q: "ব্রহ্মাণ্ডের সবচেয়ে বড় গ্রহ কোনটি?", a: "ডেনব্বা"},
  {q: "মানব দেহে রক্তের গড় পরিমাণ কত?", a: "৫ লিটার"},
  {q: "কম্পিউটারের প্রথম ভাষা কি ছিল?", a: "মেশিন ল্যাঙ্গুয়েজ"},
  {q: "বাংলাদেশের প্রথম রক গায়ক কে ছিলেন?", a: "আলমগীর"},
  {q: "বিশ্বের সবচেয়ে বড় মহাসাগর কোনটি?", a: "প্যাসিফিক"},
  {q: "পৃথিবীর সবচেয়ে বড় প্রাণী কোনটি?", a: "নীল তিমি"},
  {q: "সবচেয়ে বেশি মানুষ কোন দেশে বসবাস করে?", a: "চীন"},
  {q: "বাংলাদেশের প্রথম রাষ্ট্রপতি কে ছিলেন?", a: "শেখ মুজিবুর রহমান"},
  {q: "ইন্টারনেট কোথায় প্রথম ব্যবহৃত হয়েছিল?", a: "আমেরিকা"},
  {q: "মানুষের দেহে কতটি রক্তকণিকা থাকে?", a: "৫০ কোটি"},
  {q: "বাংলাদেশের জাতীয় সংগীত কে লিখেছেন?", a: "রবীন্দ্রনাথ ঠাকুর"},
  {q: "সর্বপ্রথম টেলিফোন আবিষ্কার করেন কে?", a: "আলেক্সান্ডার গ্রাহাম বেল"},
];

// Shuffle array helper
function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// Generate 5 random quiz questions each load
const quizContainer = document.getElementById('quizContainer');
const selectedQuiz = shuffleArray(quizData).slice(0, 5);

// State
let answeredCount = 0;
let canAnswer = true;

updateCoins();

function createQuizItem(item, index) {
  const div = document.createElement('div');
  div.className = 'quiz-item';

  const qElem = document.createElement('h3');
  qElem.textContent = `${index + 1}. ${item.q}`;
  div.appendChild(qElem);

  const btn = document.createElement('button');
  btn.className = 'answer-btn';
  btn.textContent = 'Show Answer (-2 coins)';

  btn.onclick = () => {
    if(!canAnswer) return;

    if(users[currentUser].coins < 2) {
      alert('You need at least 2 coins to reveal an answer.');
      return;
    }

    users[currentUser].coins -= 2; // deduct coins on reveal answer
    localStorage.setItem('users', JSON.stringify(users));
    updateCoins();

    // Show answer
    alert(`Answer: ${item.a}`);

    answeredCount++;
    canAnswer = false; // Disable more answering until reload

    if(answeredCount >= selectedQuiz.length) {
      alert('You answered all questions! Come back later for new quizzes.');
    }
  };

  div.appendChild(btn);
  return div;
}

selectedQuiz.forEach((q, i) => {
  quizContainer.appendChild(createQuizItem(q, i));
});

// Navigation buttons
document.getElementById('withdrawPageBtn').onclick = () => {
  window.location.href = 'withdraw.html';
};
document.getElementById('logoutBtn').onclick = () => {
  localStorage.removeItem('currentUser');
  alert('Logged out.');
  window.location.href = 'index.html';
};