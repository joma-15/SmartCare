//direct the link depending on the selected value 
function PlanChoose(event){
    const selectedPlan = document.querySelector('input[name="planType"]:checked').value;
     event.preventDefault(); // prevent immediate navigation


    if (selectedPlan == "Individual" || selectedPlan == "Family" || selectedPlan == "Senior") {
            window.location.href = "Plans.html"
    }
}