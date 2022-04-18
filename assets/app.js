const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.controls');
const sectBtn = document.querySelectorAll('.control');
const allSections = document.querySelector('.main-content');

function PageTransitions(){

    // Button click active class
    for(let i = 0; i < sectBtn.length; i++){
        sectBtn[i].addEventListener('click', function(){
            let currentBtn = document.querySelectorAll('.active-btn');
            currentBtn[0].className = currentBtn[0].className.replace('active-btn', '');
            this.className += 'active-btn';
        })
    }

    // Sctions Active 
    allSections.addEventListener('click', (e) =>{
        const id = e.target.dataset.id;
        if(id){

            // Hide other sections
            sections.forEach((section)=>{
                section.classList.remove('active');
            })

            try{
                // Make the current section active
                const element = document.getElementById(id);
                element.classList.add('active');
            }
            catch (e){
                console.log("Active element not found on the page");
            }
        }
    })

    // Toggle theme
    const themeBtn = document.querySelector('.theme-btn');
    themeBtn.addEventListener('click',() =>{
        
        // Get the current theme
        let currentTheme = document.documentElement.getAttribute('data-theme');
        
        // If the current theme is "light", set the theme to "dark"
        if (currentTheme == "light"){
            localStorage["theme"] = "dark";
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        // Else set the theme to "light"
        else {
            localStorage["theme"] = "light";
            document.documentElement.setAttribute('data-theme', 'light');
        }
    })
}

// Call the main function
PageTransitions();