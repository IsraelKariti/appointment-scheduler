const prepareSound = ()=>{
    const audio = document.createElement('audio');
    audio.setAttribute('src', 'https://cdn.freesound.org/previews/15/15080_2518-lq.mp3');
    document.body.appendChild(audio);
}

const saveHTMLToFile = ()=>{
    const content = document.body.outerHTML;

    //Create a Blob from the file content 
    const blob = new Blob([content], { type: 'text/plain' });
    const blobURL = URL.createObjectURL(blob);

    // Create a link element
    const a = document.createElement('a');
    a.href = blobURL;
    a.download = 'htmlRecord';

    // Append the link to the body 
    document.body.appendChild(a);
    a.click();
}

const getButtons = ()=>{
    const buttonsQuery = document.querySelectorAll('table tbody tr td button');
    const buttonsArray = Array.from(buttonsQuery).slice(21,37);
    buttonsArray.splice(5,2);
    buttonsArray.splice(10,2);
    return buttonsArray;
}

prepareSound();
const nextMonth = document.querySelector('button[name=next-month]');
const prevMonth = document.querySelector('button[name=previous-month]');
let december = true;

const searchPage = ()=>{
    const buttons = getButtons();
    for(const button of buttons){
        console.log(button.attributes);
        
        const disabled = button.attributes['disabled'];
        if(disabled === undefined)
        {
            button.click();
            return true;
        }
    }
    return false;
}

const mainLoop = setInterval(()=>{
    if(december){
        const result = searchPage();
        if(result){
            saveHTMLToFile();
            clearInterval(mainLoop);
        }

        nextMonth.click();
    }
    else
        prevMonth.click();
    
    december = !december;
}, 3000);