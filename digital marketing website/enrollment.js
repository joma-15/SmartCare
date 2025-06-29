//direct the link depending on the selected value 
function PlanChoose(event){
    const selectedPlan = document.querySelector('input[name="planType"]:checked').value;
     event.preventDefault(); // prevent immediate navigation


    if (selectedPlan == "Individual" || selectedPlan == "Family" || selectedPlan == "Senior") {
            window.location.href = "Plans.html"
    }

    if (selectedPlan == "Group") {
        const modal = new bootstrap.Modal(document.getElementById('group-modal')); 
        modal.show();
             
    }
}


  function openClientModal() {
    const groupModal = bootstrap.Modal.getInstance(document.getElementById('group-modal'));
    groupModal.hide();

    const clientDetailsModal = new bootstrap.Modal(document.getElementById('clientDetailsModal'));
    clientDetailsModal.show();
  }


//filter send data
function filterData(){
  // const scriptUrl = "https://script.google.com/macros/s/AKfycbyWmGFKgo2e1luqhr704OIlJtwtRHpWBXKxWw4RO-5vWBD46_OkPUsEUpc926jhlh5U/exec"; 

  document.getElementById('clientDetailsModal').addEventListener('submit', (e) => {
    e.preventDefault();

    const lastName = document.getElementById('LastName').value.trim(); 
    const firstName = document.getElementById('FirstName').value.trim(); 
    const middlename = document.getElementById('MiddleName').value.trim();

    //data to be send in the excel sheet
    const name = `${lastName} ${firstName} ${middlename}`; 
    const birthDate = document.getElementById('bday').value; 
    const address = document.getElementById('address').value; 
    const email = document.getElementById('email').value;
    
    //use queryselector for the radio button 
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const civiStatus = document.getElementById('civil-status').value;

    const data = {
      name, 
      birthDate, 
      address, 
      email, 
      gender, 
      civiStatus
    }; 

    sendDataToDB(data);
    
  });
}

//send data to the database using async await
async function sendDataToDB(data){
  const scriptUrl =  "https://script.google.com/macros/s/AKfycbyWmGFKgo2e1luqhr704OIlJtwtRHpWBXKxWw4RO-5vWBD46_OkPUsEUpc926jhlh5U/exec";
  
  try {
    const response = await fetch(scriptUrl, {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }); 
    const result = await response.text();
    alert('succes' + result);

  } catch (error) {
    console.error('Submission error', error);
  }
}