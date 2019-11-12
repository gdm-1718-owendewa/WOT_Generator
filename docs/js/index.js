if(localStorage.getItem('loggedIn') ){
}
else{
        location.replace('login.html')
    }

    const logout = (e) =>{
        e.preventDefault()
        firebase.auth().signOut().then(function() {
            localStorage.removeItem('loggedIn')
            window.location.replace('login.html')
          });
    }

    document.getElementById('logout').addEventListener('click', logout)
