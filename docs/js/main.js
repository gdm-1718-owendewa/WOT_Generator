// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBdjYilkD7i3RGgo9WIqMSkmA_FqS-9FOI",
    authDomain: "wotui-35d67.firebaseapp.com",
    databaseURL: "https://wotui-35d67.firebaseio.com",
    projectId: "wotui-35d67",
    storageBucket: "wotui-35d67.appspot.com",
    messagingSenderId: "754339981361",
    appId: "1:754339981361:web:102b77ad58931248770d10",
    measurementId: "G-7XVS8NSH3C"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  let firebaseRef = firebase.database().ref("avatars");
  let firebasePiRef = firebase.database().ref("pi");
  let firebaseSaveRef = firebase.database().ref("saved");   
  console.log(localStorage.getItem('loggedIn'))
    
let cubes = document.getElementsByClassName("cube");
const register = (e) => {
    e.preventDefault();
    console.log('register')
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(()=>{
        localStorage.setItem('loggedIn', true)
        window.location.replace('index.html');
    })
}
const login = () => {
    console.log('login')
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(error) {
        localStorage.setItem('loggedIn', true)
        window.location.replace('index.html');
      });
}

if(document.getElementById('registerButton')){
document.getElementById('registerButton').addEventListener('click', register)
}
if(document.getElementById('loginButton')){
    document.getElementById('loginButton').addEventListener('click', login)

}
const Toggle = (e) => {
    console.log(e.target);
    if(e.target.classList.contains('active')){
        e.target.classList.remove('active');
        console.log('Removed active class');
    }else{
        e.target.classList.add('active');
    }
}
for( let i=0; i < cubes.length; i++){
    cubes[i].addEventListener('click', Toggle);
}
const Submit = (e) => {
    e.preventDefault();
    let rows = document.querySelectorAll('.row');
    const binary = [];
    rows.forEach(row => {
        let blocks = row.children;
        const rowResult = [];
        for(let block of blocks){
            block.classList.contains('active') ? rowResult.push(1) : rowResult.push(0)
        }
        binary.push(rowResult);
    })
    let points = []
    let actives = document.getElementsByClassName("active");
    for(let i=0; i < actives.length; i++){
        let data = {
            x: actives.item(i).dataset.x,
            y: actives.item(i).dataset.y
        }
        
        points.push(data)
    }
    firebaseSaveRef.push(JSON.stringify(binary));
    firebaseRef.push(points);


}
document.getElementById('submitButton').addEventListener('click', Submit);
const fetch = () => {
    let avatarArray = [];
    firebaseRef.once("value")
    .then((snapshot) => {
        snapshot.forEach((childSnapshot)=>{
            let item = childSnapshot.val();
            avatarArray.push(item);
        })
    }).then(() => {
        let index = 0;
        setInterval(() => {
            const actives = document.querySelectorAll('.active');
            for(let i=0; i < actives.length; i++){
                actives[i].classList.remove('active');
            }
            const array = avatarArray[index]
            for(i = 0; i < array.length; i++){
                const box = document.querySelector("[data-coors='"+ array[i].y+array[i].x +"']")
                box.classList.add('active');
            }
            if(index < avatarArray.length-1){
                index++
            }else{
                index = 0;
            }
            
        },2000)
    })
}
document.getElementById('clientLoopButton').addEventListener('click', fetch);
const piLoop = (e) => {
    e.preventDefault();
    firebasePiRef.once('value')
    .then((snapshot) => {
        let value = snapshot.val();
        if(value){
            firebasePiRef.set(false)
        }
        else{
            firebasePiRef.set(true)
        }
    })
}
document.getElementById('piLoopButton').addEventListener('click', piLoop);
const showAll = (e) => {
e.preventDefault()
  firebaseSaveRef.once('value' , snapshot => {
    const savedBox = document.getElementById('savedAvatars');

      snapshot.forEach((childSnapshot) => {  
          const total = JSON.parse(childSnapshot.val());
       
        const savedAvatar = document.createElement('div');
        savedAvatar.classList.add('characterContainer2')
        for(i = 0; i < total.length; i++){
            const row = document.createElement('div')
            row.classList.add('savedRow2');
            for(j = 0; j < total.length; j++){
                const createdBox = document.createElement('div');
                createdBox.classList.add('cube2');
                if(total[i][j] == 1){
                    createdBox.classList.add('active');
                }
                row.appendChild(createdBox);
            }
            savedAvatar.appendChild(row);
        }
        savedBox.appendChild(savedAvatar);
      })
  })
}
document.getElementById('showButton').addEventListener('click', showAll);


