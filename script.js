//your code here
const imageContainer = document.getElementById('image-container');
const resetBtn = document.getElementById('reset');
const verifyBtn = document.getElementById('verify');
const resultPara = document.getElementById('para');
const message = document.getElementById('h');
const imagesSrc =["https://picsum.photos/id/237/200/300","https://picsum.photos/seed/picsum/200/300",
    "https://picsum.photos/200/300?grayscale","https://picsum.photos/200/300/","https://picsum.photos/200/300.jpg"
]

let selectedImages = [];

function shuffleAndDisplayImages() {
  imageContainer.innerHTML = '';
  resultPara.textContent = '';
  message.textContent = "Please click on the identical tiles to verify that you are not a robot.";
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
  selectedImages = [];
  let set = new Set();
  while(set.size <5){
    let random = Math.floor(Math.random()*5)+1;
    set.add(random)
  }
  let arr =[...Array.from(set),(Math.floor(Math.random()*5)+1)];

  arr.forEach((el)=>{
    const img = document.createElement('img');
	img.className = `img${el}`;
    img.dataset.src = imagesSrc[el]
    img.addEventListener('click', () => handleImageClick(img));
    imageContainer.appendChild(img);
  })
	
}

function handleImageClick(img) {
  if (selectedImages.includes(img)) return;

  img.classList.add('selected');
  selectedImages.push(img);

  resetBtn.style.display = 'inline-block';

  if (selectedImages.length === 2) {
    verifyBtn.style.display = 'inline-block';
  } else if (selectedImages.length > 2) {
    // Only allow two selections
    selectedImages.forEach(i => i.classList.remove('selected'));
    selectedImages = [];
    verifyBtn.style.display = 'none';
    resetBtn.style.display = 'inline-block';
  }
}

resetBtn.addEventListener('click', shuffleAndDisplayImages);

verifyBtn.addEventListener('click', () => {
  const [first, second] = selectedImages;
  console.log(first.content,second.content);
  const areSame = first.dataset.src === second.dataset.src;

  if (areSame) {
    resultPara.textContent = "You are a human. Congratulations!";
  } else {
    resultPara.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyBtn.style.display = 'none';
});

shuffleAndDisplayImages();
