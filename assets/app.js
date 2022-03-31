const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.controls');
const sectBtn = document.querySelectorAll('.control');
const allSections = document.querySelector('.main-content');


function PageTransitions(){
    // Set the class name of the main section
    if ('undefined' != localStorage["theme"]){
        allSections.className = localStorage["theme"];
    }

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
                console.log(e);
            }
        }
    })

    // Toggle theme
    const themeBtn = document.querySelector('.theme-btn');
    themeBtn.addEventListener('click',() =>{
        // Toggle the class name
        let element = document.body;
        element.classList.toggle('light-mode');

        // Update the local storage variable
        localStorage["theme"] = document.body.classList;
    })
}

// Call the main function
PageTransitions();