function handleContactSubmit(event) {
  event.preventDefault(); // Page refresh hone se rokne ke liye
  
  const form = event.target;
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwJfexnCw_SHZMZulX2qD0ZbfPMjQIwp92UrgUPhFJuk5qWskhnYkRhHL8ijjnOkzripw/exec'; // Apna lamba wala URL yahan daalein
  const toast = document.getElementById('form-toast');
  
  if (toast) {
    toast.classList.remove('hidden');
    toast.textContent = "Sending message...";
  }

  // FormData ko URLSearchParams mein convert karna zaroori hai taaki Apps Script read kar sake
  const formData = new FormData(form);
  const encodedData = new URLSearchParams(formData);

  fetch(scriptURL, { 
    method: 'POST', 
    body: encodedData,
    mode: 'no-cors' // CORS error se bachne ke liye
  })
  .then(() => {
    if (toast) {
      toast.textContent = "Thank you! Message successfully recorded.";
    }
    form.reset(); // Form fields khali karne ke liye
    
    setTimeout(() => {
      if (toast) toast.classList.add('hidden');
    }, 4000);
  })
  .catch(error => {
    console.error('Error!', error);
    if (toast) {
      toast.textContent = "Failed to send. Please try again.";
    }
  });
}